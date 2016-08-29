#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Flask, request, redirect, session, render_template
import json
import os
import requests
import sys
import emoji
import time # analytics - recording timestamps of inbound messages.
from apiai_manager import apiai_query
from message import SendMessage, Button, Element
from predefined_messages import *
from random import randint
try:
    import apiai
except ImportError:
    sys.path.append(
        os.path.join(os.path.dirname(os.path.realpath(__file__)), os.pardir)
    )
    import apiai

#
from postbacks import *


messenger_access_token = os.environ.get('messenger_access_token')
messenger_verify_token = os.environ.get('messenger_verify_token')
firebase_token =  os.environ.get('firebase_token')
api_ai_access_token = os.environ.get('api_ai_access_token')

# API's
messenger_url = "https://graph.facebook.com/v2.6/me/messages?access_token="
firebase_root_url = "https://dam-test-767c3.firebaseio.com/"

# Flask app configuration
app = Flask(__name__)
app.config.from_object(__name__)
ai = apiai.ApiAI(api_ai_access_token)

# Routes
@app.route('/privacy')
def privacy():
	return render_template('privacy_policy.html')


@app.route("/webhook", methods=["GET"])
def webhook_get():
    if request.args.get("hub.verify_token") == messenger_verify_token:
        return request.args.get("hub.challenge")


@app.route('/webhook', methods=["POST"])
def webhook_post():
    try:
        # Parse Facebook messenger data
        data = json.loads(request.data)
        messaging_events = data['entry'][0]['messaging']
        sender = messaging_events[0]['sender']['id']
        print("INBOUND MESSAGE: " + str(messaging_events[0]))

        if "postback" in messaging_events[0]:
            print("User sent a postback.")
            postback_action(data)
            return ""

        # If the 'message' key exists it's an inbound message from a user.
        if "message" in messaging_events[0]:
            print("User typed a message.")
            # Parse user and message information from incoming POST
            sender = messaging_events[0]['sender']['id']
            recipient = messaging_events[0]['recipient']['id']
            message_timestamp = messaging_events[0]['timestamp']
            message_content = messaging_events[0]['message']['text'].encode("utf-8")

            print("Inbound message content: " + str(message_content))

            # Is this the user's first message? Check Firebase.
            firebase_url = "https://dam-test-767c3.firebaseio.com/users.json?auth=" + firebase_token
            r = requests.get(firebase_url)
            users = r.json()
            new_user = True
            for user in users:
                if sender == user:
                    new_user = False

            # If it's a new user, insert them into Firebase.
            if new_user:
                onboard(sender, recipient)

            # Else it's a returning user.
            else:

                # Query API.AI
                apiai_response = apiai_query(message_content, sender, messenger_url, messenger_access_token, ai)
                # Store the message to firebase.
                firebase_url = "https://dam-test-767c3.firebaseio.com/inbound.json?auth=" + firebase_token

                # sender, message, timestamp
                firebase_payload = {
                    "sender": sender,
                	"message_content": message_content,
                	"timestamp": time.time()
                }
                r = requests.post(firebase_url, data=json.dumps(firebase_payload))

    except Exception as e:
        print("There was an exception: " + str(e))
    return ""




if __name__ == "__main__":
    app.run(debug=True)
