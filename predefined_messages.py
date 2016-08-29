#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import requests
import emoji
from message import SendMessage, Button, Element

messenger_access_token = "EAAC70o39wCcBAKZCmRwVtAHQIroZCEgBi5lHYOcpxf244v8rWVeDgjEfL23dZC3pNXECwPXecWloS2tceoxnX0fgkTrXG4DXOp2y8mZCVeamITNANqzgDAGX2ZCwUFosCHMZC8APRqDEjC0ZBMGaRzj8SgYbqnJUpQXcr4hS22g1QZDZD"
messenger_verify_token = "bobbyDigital"
firebase_token = "FqiZ1P17wv4o9gh5MIAZbi4RlKDxz5RxV19EU5cK"
api_ai_access_token = "ec3a4beb7794481395de9774b06b8652"

def onboard(sender, recipient):
	# Generate Firebase payload to create a new user.
	firebase_payload = {
	    sender: {
	        "recipient_id": recipient,
			"favorites" : ["bitcoin", "ethereum"]
	    }
	}
	firebase_url = "https://dam-test-767c3.firebaseio.com/users.json?auth=" + firebase_token
	r = requests.patch(firebase_url, data=json.dumps(firebase_payload))
	print("New user added to database.")

	new_user_message = (
	    "Hello!\n\n"
	    "I’m your Digital Asset Monitor, responsible for providing up-to-the-minute information about digital currency markets.\n\n"
	    "Tap \"Next\" to learn how I can assist you."
	)

	reply_message = SendMessage(sender)
	# Button(String btnType, String title, String payload, String url)
	next_button = Button("postback", "Next", "onboard_2", "")
	reply_message.send_buttons(new_user_message, [next_button])


def onboard_two(sender):
	print("Displaying onboard_two.")
	reply = emoji.emojize(
	    'Greetings, digerati! :person_raising_both_hands_in_celebration: :person_raising_both_hands_in_celebration: :person_raising_both_hands_in_celebration:'
	)
	reply_message = SendMessage(sender)
	reply_message.send_message(reply)

	# send a gif
	payload = {"recipient":{"id": sender },"message":{"attachment":{"type":"image","payload":{"url":"https://i.imgur.com/xzHBP8j.gif"}}}}
	r = requests.post('https://graph.facebook.com/v2.6/me/messages/?access_token=' + messenger_access_token, json=payload)
	print("POST response: " + str(r.json()))
	reply = (
		"I assume you're  familiar with digital currencies. "
		"If not, I invite you to learn more from this fascinating introduction: https://www.khanacademy.org/economics-finance-domain/core-finance/money-and-banking/bitcoin/v/bitcoin-what-is-it"
	)
	reply_message = SendMessage(sender)
	reply_message.send_message(reply)

	reply = (
		"But without further ado, let's proceed. Tap Let's Get Started (I promise it's short)."
	)
	next_button = Button("postback", "Let's Get Started", "onboard_3", "")
	reply_message = SendMessage(sender)
	reply_message.send_buttons(reply, [next_button])


def onboard_three(sender):
	print("Displaying onboard_three.")
	reply = emoji.emojize(
	    "Allow me to introduce my features. Please be a good sport :ok_hand_sign: and follow along with my instructions."
	)
	reply_message = SendMessage(sender)
	reply_message.send_message(reply)

	reply = emoji.emojize(
	    "I perform :victory_hand: functions: "
	    "1) provide realtime data about hundreds of digital currencies, and "
	    "2) send you a notification when the price of a digital currency you've chosen exceeeds a specified threshold."
	)
	reply_message = SendMessage(sender)
	reply_message.send_message(reply)

	message_text = emoji.emojize(
	    "By the end of the walkthrough, you'll know how to fetch a price as well as create a notification."
	)
	next_button = Button("postback", "Realtime Data?", "onboard_4", "")
	reply_message.send_buttons(message_text, [next_button])


def onboard_4(sender):
	print("Displaying onboard_4.")
	message_text = emoji.emojize(
	    "To check prices for the top 10 currenies by market cap, select "
	    "\"Prices\" from the menu, or simply say \"prices\". "
	    "To get information about a specific currency, say the name of that currency. "
	)
	reply_message = SendMessage(sender)
	reply_message.send_message(message_text)

	message_text = emoji.emojize(
	    "Spoiler alert, it look's something like this: "
	)
	reply_message = SendMessage(sender)
	reply_message.send_message(message_text)

	prices_gallery(sender)

	message_text = emoji.emojize(
	    "Now that you know how to fetch realtime data, let's proceed."
	)
	reply_message = SendMessage(sender)
	next_button = Button("postback", "Notifications?", "onboard_5", "")
	reply_message.send_buttons(message_text, [next_button])

def onboard_5(sender):
	print("Displaying onboard_5.")

	# Fetch the currency array from Firebase
	firebase_url = "https://dam-test-767c3.firebaseio.com/currencies/bitcoin.json?auth=" + firebase_token
	r = requests.get(firebase_url)
	data = r.json()
	price_usd = '{:.2f}'.format(data["price_usd"])

	message_text = emoji.emojize(
	    "Now let's create a price alarm that will trigger a notification if the price of bitcoin exceeds "
	    "a threshold we're interested in."
	)
	reply_message = SendMessage(sender)
	reply_message.send_message(message_text)

	threshold = float(price_usd) + 20
	message_text = emoji.emojize(
	    "The current price of a bitcoin is " + price_usd + " USD. Let's create a notification if the price "
	    "exceeds $" + str(threshold) + " USD. Say \"alert me if the price of btc goes above " + str(threshold) + "\"."
	)
	reply_message = SendMessage(sender)
	next_button = Button("postback", "Done", "main_menu_carousel", "")
	reply_message.send_buttons(message_text, [next_button])


def main_menu_carousel(sender):
	reply_message = SendMessage(sender)

	prices_button = Button("postback", "Price by Market Cap", "prices_gallery", "")
	# monitor_new_currency_button = Button("postback", "Follow Currency", "monitor_new_currency", "")
	prices_element = Element("Prices", "", "Realtime data on hundreds of digital currencies.", [prices_button])

	alarms_button = Button("postback", "Notifications", "notifications", "")
	create_alarms_button = Button("postback", "Create Notification", "create_alarm", "")
	alarms_element = Element("Notifications", "", "Receive a notification based on price thresholds.", [alarms_button, create_alarms_button])

	# list_currencies_file_button = Button("postback", "View Ten", "print_file_currencies", "")
	# list_currencies_print_button = Button("url", "View All", "", "http://eloquentgraffiti.com/fyi/dam_currencies_three.pdf")
	# list_currency_element = Element("More Currencies", "", "View the currencies we follow by clicking below ", [list_currencies_print_button])

	reply_message.send_carousel([prices_element, alarms_element])


def prices_gallery(sender):
	print("Display prices_gallery.")

	# Fetch the currency array from Firebase
	firebase_url = "https://dam-test-767c3.firebaseio.com/currencies.json?auth=" + firebase_token
	r = requests.get(firebase_url)
	data = r.json()
	element_array = []

	# bitcoin, ethereum, steem, ripple, litecoin, the-dao, nem, dash, madesafecoin, lisk
	top_coins = ["bitcoin", "ethereum", "steem", "ripple", "litecoin", "the-dao", "nem", "dash", "maidsafecoin", "lisk"]

	for coin in top_coins:
	    name = data[coin]["name"]
	    price_usd = '{:.4f}'.format(data[coin]["price_usd"])
	    # Note: we're limited to a 1-line subtitle!
	    subtitle = (
	        "PRICE: " + price_usd + " USD"
	        # "PRICE: " + current_price + " USD, % CHANGE 24H: " + day_change + "%"
	    )
	    # Buttons
	    more_button = Button("postback", "More Info", "currency_" + coin, "")
	    menu_button = Button("postback", "Menu", "main_menu", "")
	    element_array.append(Element(name, "", subtitle, [more_button, menu_button]))

	# Send the structured message to the user.
	reply_message = SendMessage(sender)
	reply_message.send_carousel(element_array)

def currency_card(sender, currency):
	print("Displaying currency_card, currency: " + currency + ".")

	# Fetch the currency array from Firebase
	firebase_url = "https://dam-test-767c3.firebaseio.com/currencies/" + str(currency) + ".json?auth=" + firebase_token
	r = requests.get(firebase_url)
	data = r.json()

	name = data["name"]
	price_usd = '{:.4f}'.format(data["price_usd"])
	percent_change_1h = '{:.2f}'.format(data["percent_change_1h"])
	percent_change_24h = '{:.2f}'.format(data["percent_change_24h"])
	volume_usd = '{:,}'.format(int(data["24h_volume_usd"]))
	market_cap_usd = '{:,}'.format(int(data["market_cap_usd"]))
	reply = (
	    name + "\n"
	    "Price: " + price_usd + " USD\n"
	    "Change % 1 hr: " + percent_change_1h + "%\n"
	    "Change % 24 hr: " + percent_change_24h + "%\n"
	    "Volume 24 hr: " + volume_usd + " USD\n"
	    "Market cap: " + market_cap_usd + " USD\n"
	)
	reply_message = SendMessage(sender)
	reply_message.send_message(reply)
	# Quick reply to go back or go to the menu


def alarms_carousel(sender):
	firebase_alarms = "https://dam-test-767c3.firebaseio.com/alarms.json?auth=" + firebase_token
	r = requests.get(firebase_alarms)
	alarms = r.json()

	# find all the alarms that belong to the user
	# add them to a carousel
	reply_message = SendMessage(sender)
	element_array = []
	has_alarms = False

	if alarms is None:
		print("No alarms exist.")
		reply_message.send_message("You haven't created any alarms! Try saying \"alert me if the price of Bitcoin goes above 800.\"")
		return

	for key, value in alarms.items():
		if value["user"] == sender:
			# create an element and add to the array.
			currency_name = value["currency_name"]
			inequality = value["inequality"]
			threshold = value["threshold"]
			subtitle = (
				currency_name + " " + inequality + " " + threshold
			)
			# Buttons
			deactivate_alarm_button = Button("postback", "Deactivate", "deactivate_alarm" + str(key), "")
			main_menu_button = Button("postback", "Menu", "main_menu", "")
			element_array.append(Element(currency_name, "", subtitle, [deactivate_alarm_button, main_menu_button]))
			has_alarms = True
	if has_alarms == False:
		reply_message.send_message("You haven't created any alarms! Try saying \"alert me if the price of Bitcoin goes above 800.\"")
	else:
		reply_message.send_carousel(element_array)



def send_next_ten_currencies(sender):
	message_content = ""
	messageData = {
	"recipient":{
		    "id":sender
		  },
		  "message":{
		    "text":"What would you like to do?",
		    "quick_replies":[
		      {
		        "content_type":"text",
		        "title":"Show me 10 digital currencies",
		        "payload":"next_ten_currencies"
		      },
		      {
		        "content_type":"text",
		        "title":"Back To Menu",
		        "payload":"back_to_main_menu"
		      }

		    ]
		  }
		}
	print(messageData)
	r = requests.post("https://graph.facebook.com/v2.6/me/messages?access_token=" + str(messenger_access_token), json=messageData)
	return ""
