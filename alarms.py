import requests
import json

firebase_token = "FqiZ1P17wv4o9gh5MIAZbi4RlKDxz5RxV19EU5cK"
firebase_currencies = "https://dam-test-767c3.firebaseio.com/currencies.json?auth=" + firebase_token
firebase_users = "https://dam-test-767c3.firebaseio.com/users.json?auth=" + firebase_token
firebase_alarms = "https://dam-test-767c3.firebaseio.com/alarms.json?auth=" + firebase_token

facebook_url = "https://graph.facebook.com/v2.6/me/messages?access_token="
facebook_access_token = "EAAC70o39wCcBAKZCmRwVtAHQIroZCEgBi5lHYOcpxf244v8rWVeDgjEfL23dZC3pNXECwPXecWloS2tceoxnX0fgkTrXG4DXOp2y8mZCVeamITNANqzgDAGX2ZCwUFosCHMZC8APRqDEjC0ZBMGaRzj8SgYbqnJUpQXcr4hS22g1QZDZD"

# for each user
# for each alarm
# declare currency, inequality, threshold
# if greater than

r = requests.get(firebase_alarms)
alarms = r.json()

r = requests.get(firebase_currencies)
currencies = r.json()

print("Checking alarms.")

for key, value in alarms.items():
    print(key, value)
    user = value["user"]
    currency = value["currency"]
    inequality =  value["inequality"]
    threshold = value["threshold"]

    # get the current price of that currency
    current_price = currencies[currency]["price_usd"]

    if inequality == "greater than":
        if current_price >= float(threshold):
            # send a message to that user.
            alarm_text = "The price of " + currency + " is " + inequality + " " + threshold + "."
            print(alarm_text)
            payload = {'recipient': {'id': user}, 'message': {'text': alarm_text}}

            r = requests.post(facebook_url + facebook_access_token, json=payload)
            # delete the alarm?
            firebase_url = "https://dam-test-767c3.firebaseio.com/alarms/" + key + ".json?auth=" + firebase_token
            r = requests.delete(firebase_url)



    if inequality == "less than":
        if current_price <= float(threshold):
            # send a message to that user.
            alarm_text = "The price of " + currency + " is " + inequality + " " + threshold + "."
            print(alarm_text)

            payload = {'recipient': {'id': user}, 'message': {'text': alarm_text}}
            r = requests.post(facebook_url + facebook_access_token, json=payload)

            # delete the alarm?
            firebase_url = "https://dam-test-767c3.firebaseio.com/alarms/" + key + ".json?auth=" + firebase_token
            r = requests.delete(firebase_url)
