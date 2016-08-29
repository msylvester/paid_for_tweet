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
os.environ.get('HUB_VERIFY_TOKEN')

messenger_access_token = os.environ.get('messenger_access_token')
messenger_verify_token = os.environ.get('messenger_verify_token')
firebase_token =  os.environ.get('firebase_token')
api_ai_access_token = os.environ.get('api_ai_access_token')

# API's
messenger_url = "https://graph.facebook.com/v2.6/me/messages?access_token="
firebase_root_url = "https://dam-test-767c3.firebaseio.com/"

# Flask app configuration
app = Flask(__name__)

def postback_action(data):
    messaging_events = data['entry'][0]['messaging']
    sender = messaging_events[0]['sender']['id']
    payload = messaging_events[0]['postback']['payload']
    print("Payload: " + payload)

    if "onboard_2" in payload:
    	onboard_two(sender)
    	return

    elif "onboard_3" in payload:
    	onboard_three(sender)
    	return

    elif "onboard_4" in payload:
    	onboard_4(sender)
    	return

    elif "onboard_5" in payload:
    	onboard_5(sender)
    	return

    elif "main_menu" in payload:
    	main_menu_carousel(sender)
    	return

    elif "prices_gallery" in payload:
    	prices_gallery(sender)
    	return

    elif "monitor_new_currency" in payload:
        reply_message = SendMessage(sender)
        reply_message.send_message("For example, say \"follow Litecoin\".")
        return

    elif "notifications" in payload:
    	alarms_carousel(sender)
    	return

    elif "create_alarm" in payload:
        reply_message = SendMessage(sender)
        message_text = (
    		"Receive a notification if the price of a digital currency exceeds or falls below a certain threshold.\n\n"
    		"Try saying: \"alert me if the price of Bitcoin goes above 700\" and you'll receive a notification if the price of Bitcoin exceeds 700."
    	)
        reply_message.send_message(message_text)
        return

    # When user taps "More Info" on the price gallery
    elif "currency_" in payload:
        # parse currency
        currency = payload[9:]
        currency_card(sender, currency)
        return

    elif "remove_monitored" in payload:
    	# Parse postback for coin to remove
    	currency = payload[25:]
    	print("Removing from monitored: " + currency)
    	firebase_url = "https://dam-test-767c3.firebaseio.com/users/" + sender + "/favorites.json?auth=" + firebase_token
    	r = requests.get(firebase_url)
    	monitored_currencies = r.json()
    	monitored_currencies.remove(currency)
    	# Update the array
    	r = requests.put(firebase_url, data=json.dumps(monitored_currencies))
    	reply_message = SendMessage(sender)
    	reply_message.send_message("Ok, you're no longer monitoring that currency.")
    	monitored_currencies_carousel(sender)
    	return

    elif "feedback" in payload:
        reply_message = SendMessage(sender)
        reply = emoji.emojize(
            'To leave feedback, tap the conversation information button above, and leave feedback. '
            'Thanks.'
        )
    	reply_message.send_message(reply)

    elif "deactivate_alarm" in payload:
    	# Parse postback for coin to remove
    	alarm_id = payload[16:]
    	print("Removing alarm ID: " + alarm_id)
    	firebase_url = "https://dam-test-767c3.firebaseio.com/alarms.json?auth=" + firebase_token
    	r = requests.get(firebase_url)
    	alarms = r.json()
    	alarms.pop(alarm_id)
    	r = requests.put(firebase_url, data=json.dumps(alarms))
    	reply_message = SendMessage(sender)
    	reply_message.send_message("Ok, the alarm has been deactived.")
    	alarms_carousel(sender)
    	return

    #print_file_currencies
    #have all the currencies printed out in messenger themselves
    elif "print_file_currencies" in payload:
        with open("printable_list.txt", "rt") as in_file:
            text = in_file.read()
            text_array = text.splitlines()
        daily_dime = [text_array[randint(0,699)] for x in range(0,9)]
        msg = SendMessage(sender)
        [msg.send_message(daily) for daily in daily_dime]
        return


    else:
        print("No matching postback in postbacks.py")
        return
