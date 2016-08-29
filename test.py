#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import os
import requests
import sys
import emoji
import urllib2
import urllib
import random
from message import SendMessage, Button, Element
from predefined_messages import *


###
### TEST A MESSAGE
###

# recipient = "984595851657056" # Nick's FB ID for DAM bot
#
# # DAM bot token
# messenger_access_token = "EAAC70o39wCcBAKZCmRwVtAHQIroZCEgBi5lHYOcpxf244v8rWVeDgjEfL23dZC3pNXECwPXecWloS2tceoxnX0fgkTrXG4DXOp2y8mZCVeamITNANqzgDAGX2ZCwUFosCHMZC8APRqDEjC0ZBMGaRzj8SgYbqnJUpQXcr4hS22g1QZDZD"
# url = "https://graph.facebook.com/v2.6/me/thread_settings?access_token=" + messenger_access_token
#
# payload = {"recipient":{"id": recipient },"message":{"attachment":{"type":"image","payload":{"url":"https://i.imgur.com/xzHBP8j.gif"}}}}
# r = requests.post('https://graph.facebook.com/v2.6/me/messages/?access_token=' + messenger_access_token, json=payload)
# print(r.json())

###
### TEST SOMETHING ELSE
###

messenger_access_token = "EAAC70o39wCcBAKZCmRwVtAHQIroZCEgBi5lHYOcpxf244v8rWVeDgjEfL23dZC3pNXECwPXecWloS2tceoxnX0fgkTrXG4DXOp2y8mZCVeamITNANqzgDAGX2ZCwUFosCHMZC8APRqDEjC0ZBMGaRzj8SgYbqnJUpQXcr4hS22g1QZDZD"
sender = "984595851657056" # Nick's FB ID for DAM bot

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
