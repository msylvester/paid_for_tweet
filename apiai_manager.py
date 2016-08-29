import os
import json
import requests
import random
from message import SendMessage, Button, Element
from predefined_messages import *

firebase_token = os.environ.get('firebase_token')
api_ai_access_token = os.environ.get('api_ai_access_token')

def apiai_query(message, sender, messenger_url, messenger_access_token, ai_client):

    try:
        request = ai_client.text_request()
        request.query = str(message)
        response = request.getresponse()
        data = json.loads(response.read()) # This is the response from API.AI

        # If the action is incomplete, return "fulfillment"
        if "actionIncomplete" in data["result"]:
            # print("Action incomplete: " + str(data["result"]["actionIncomplete"]))
            if data["result"]["actionIncomplete"]: # If the actionIncomplete field is True
                action_incomplete = True
                reply = data["result"]["fulfillment"]["speech"]
                reply_message = SendMessage(sender)
                reply_message.send_message(reply)
                return


        firebase_url = "https://dam-test-767c3.firebaseio.com/currencies.json?auth=" + firebase_token
        r = requests.get(firebase_url)
        currency_data = r.json() # Dictionary of dictionaries

        # Is there an action?
        if "action" in data["result"]:

            action = data["result"]["action"]
            print("action: " + action)

            ### Intent -> Action Mapping
            if action == "getPrice": # get current price
                currency = data["result"]["parameters"]["digital-currency"]
                currency = currency.replace(' ', '-').lower()
                current_price = '{:.4f}'.format(currency_data[currency]["price_usd"])
                reply = (
                    "The price of " + currency_data[currency]["name"] + " is " + current_price + " USD."
                )
                reply_message = SendMessage(sender)
                reply_message.send_message(reply)
                return

            if action == "getPercentChange": # get % change
                currency = data["result"]["parameters"]["digital-currency"]
                currency = currency.replace(' ', '-').lower()
                hour_change = '{:.2f}'.format(currency_data[currency]["percent_change_1h"])
                day_change = '{:.2f}'.format(currency_data[currency]["percent_change_1h"])
                week_change = '{:.2f}'.format(currency_data[currency]["percent_change_7d"])
                reply = (
                    "Change in " + currency_data[currency]["name"] + " price:\n"
                    "1 hour: " + hour_change + "%\n"
                    "24 hours: " + day_change + "%\n"
                    "7 days: " + week_change + "%"
                )
                reply_message = SendMessage(sender)
                reply_message.send_message(reply)
                return

            if action == "getInfo":
                currency = data["result"]["parameters"]["digital-currency"]
                currency = currency.replace(' ', '-').lower()
                currency_card(sender, str(currency))
                return

            if action == "price-alarm":
                currency = data["result"]["parameters"]["digital-currency"]
                currency = currency.replace(' ', '-').lower()
                currency_name = currency_data[currency]["name"] # use the parameter from API.AI to look up the name of the coin
                inequality = data["result"]["parameters"]["inequality"]
                threshold = data["result"]["parameters"]["threshold"]

                # Generate alarm corresponding to user in Firebase
                firebase_payload = {
                    "user": sender,
                    "currency": currency,
                    "currency_name": currency_name,
                    "inequality": inequality,
                    "threshold": threshold
                }

                firebase_url = "https://dam-test-767c3.firebaseio.com/alarms.json?auth=" + firebase_token
                r = requests.post(firebase_url, data=json.dumps(firebase_payload))

                reply = (
                    "I'll send you a message if " + currency + " is " + inequality + " " + threshold + "."
                )
                reply_message = SendMessage(sender)
                reply_message.send_message(reply)
                return

            if action == "monitor_currency":
                currency = data["result"]["parameters"]["digital-currency"]
                currency = currency.replace(' ', '-').lower()
                currency_name = currency_data[currency]["name"] # use the parameter from API.AI to look up the name of the coin

                firebase_url = "https://dam-test-767c3.firebaseio.com/users/" + sender + "/favorites.json?auth=" + firebase_token
                r = requests.get(firebase_url, data=json.dumps(firebase_url))

                monitored_currencies = r.json()
                if monitored_currencies is None:
                    firebase_payload = {
                		"favorites" : [currency]
                	}
                else:
                    monitored_currencies.append(currency)
                    firebase_payload = {
                		"favorites" : monitored_currencies
                	}
                firebase_url = "https://dam-test-767c3.firebaseio.com/users/" + sender + ".json?auth=" + firebase_token
                r = requests.patch(firebase_url, data=json.dumps(firebase_payload))

                reply = (
                    "You're now monitoring " + currency_name + "."
                )
                reply_message = SendMessage(sender)
                reply_message.send_message(reply)
                return

            if action == "commands":
                onboard_two(sender)
                reply = (
                    "\"menu\"\n"
                    "\"instructions\"\n"
                    "\"prices\"\n"
                    "\"alarms\"\n"
                    "\"<currency>\" e.g. \"bitcoin\"\n"
                    "\"% change <currency>\" e.g. \"% change bitcoin\"\n"
                    "\"price <currency>\" e.g. \"price bitcoin\"\n"
                    "alert me if the price of \"<currency>\" goes above/below <threhold> e.g. \"alert me if bitcoin goes above 700\"\n"
                )
                reply_message = SendMessage(sender)
                reply_message.send_message(reply)
                return

            if action == "instructions":
                onboard_two(sender)
                return

            if action == "alarms":
                alarms_carousel(sender)
                return

            if action == "prices_gallery":
                prices_gallery(sender)
                return

            if action == "payment":
                reply_message = SendMessage(sender)
                reply = "here's the link: https://moolah-server.herokuapp.com/"
                reply_message.send_message(reply)

            # Pre-defined actions
            if action == "smalltalk.agent":
                onboard_two(sender)
                return

            if action == "manage.app_menu":
                main_menu_carousel(sender)
                return

            if action == "smalltalk.appraisal":
                # That's great, that's horrible
                reply = "I value your opinion."
                reply_message = SendMessage(sender)
                reply_message.send_message(reply)
                return

            if action == "smalltalk.confirmation":
                # Sure, cancel.
                reply = "Right."
                reply_message = SendMessage(sender)
                reply_message.send_message(reply)
                return

            if action == "smalltalk.dialog":
                # Give me a second, tell me a secret.
                reply = "Ask me questions about digital currencies."
                reply_message = SendMessage(sender)
                reply_message.send_message(reply)
                return

            if action == "smalltalk.emotions":
                # Can you become sad?
                reply = "Ask me questions about digital currencies."
                reply_message = SendMessage(sender)
                reply_message.send_message(reply)
                return

            if action == "smalltalk.greetings":
                # See you later, what's up?
                reply_1 = "Why hello there, digerati."
                reply_2 = "Hey you. Time is money!"
                reply_3 = "Sup. As my man Ben Franklin said, \"An investment in knowledge always pays the best interest.\""

                greeting_count = random.randint(1, 3)
                print (greeting_count)

                reply_message = SendMessage(sender)
                if greeting_count == 1:
                    reply_message.send_message(reply_1)
                if greeting_count == 2:
                    reply_message.send_message(reply_2)
                if greeting_count == 3:
                    reply_message.send_message(reply_3)
                return

            if action == "smalltalk.person":
                # How old are you?
                reply = "Ask me questions about digital currencies."
                reply_message = SendMessage(sender)
                reply_message.send_message(reply)
                return

            if action == "smalltalk.topics":
                # I like kayaking.
                reply = "Ask me questions about digital currencies."
                reply_message = SendMessage(sender)
                reply_message.send_message(reply)
                return

            if action == "smalltalk.unknown":
                # Are you a cat?
                reply = "Ask me questions about digital currencies."
                reply_message = SendMessage(sender)
                reply_message.send_message(reply)
                return

            if action == "smalltalk.user":
                # I really like you, I trust you, I'll be right back.
                reply = "Ask me questions about digital currencies."
                reply_message = SendMessage(sender)
                reply_message.send_message(reply)
                return

        else:
            # Return the null-state message.
            reply = "Ask me questions about digital currencies."
            reply_message = SendMessage(sender)
            reply_message.send_message(reply)
            return
    except Exception as e:
        print("Exception: " + str(e))
