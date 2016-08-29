import json
import os
import requests
import sys

messenger_access_token = "EAAC70o39wCcBAKZCmRwVtAHQIroZCEgBi5lHYOcpxf244v8rWVeDgjEfL23dZC3pNXECwPXecWloS2tceoxnX0fgkTrXG4DXOp2y8mZCVeamITNANqzgDAGX2ZCwUFosCHMZC8APRqDEjC0ZBMGaRzj8SgYbqnJUpQXcr4hS22g1QZDZD"
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
