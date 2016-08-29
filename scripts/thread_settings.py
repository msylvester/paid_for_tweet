import json
import os
import requests
import sys

messenger_access_token = "EAAXZCEOFOoHgBABZBiSmONE3B3rnVO27CC0wx8DLAXHgZB74SCIVP8jbErniWemLH6Ay6bZBq9dnSZALwvLkObHEWcVt9GrJKc01ib3TP7BhpR8GKnl7noZB6imkhjswZAeLjVYXSKGNFAUVYXLZA3lVORrEnnqYhu3ANYOXuDolRgZDZD"
messenger_root_url = "https://graph.facebook.com/v2.6/me/thread_settings?access_token="
# messenger_root_url = str(os.environ.get("messenger_url"))
# messenger_access_token = str(os.environ.get("messenger_access_token"))

messenger_url = messenger_root_url + messenger_access_token


# Persistent Menu
# Currently supports up to 5 buttons
payload = {

    "setting_type": "call_to_actions",
    "thread_state": "existing_thread",
    "call_to_actions":[{
        "type":"postback",
        "title":"Start Over",
        "payload":"onboard_2"
        }, {
        "type":"postback",
        "title":"Prices",
        "payload":"prices_gallery"
        }, {
        "type":"postback",
        "title":"Notifications",
        "payload":"notifications"
        }, {
        "type":"postback",
        "title":"Leave Feedback",
        "payload":"feedback"
    }]
}

r = requests.post(messenger_url, json=json.loads(json.dumps(payload)))
print("persistent menu " + str(r))
print(r.json())


# Remove Persistent Menu (uncomment code below)
# payload = {
#     "setting_type":"call_to_actions",
#     "thread_state":"existing_thread"
# }
#
# r = requests.delete(messenger_url, json=json.loads(json.dumps(payload)))
# print("persistent menu " + str(r))
# print(r.json())


# Add Greeting Text
# Text seen only once before the user messages the bot.
payload = {
    "setting_type": "greeting",
    "greeting": {
        "text":"Realtime data and alarms for hundreds of digital currencies."
    }
}
r = requests.post(messenger_url, json=json.loads(json.dumps(payload)))
print("persistent menu " + str(r))
print(r.json())
