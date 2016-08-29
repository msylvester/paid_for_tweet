import requests
import json

firebase_token = "FqiZ1P17wv4o9gh5MIAZbi4RlKDxz5RxV19EU5cK"

firebase_url = "https://dam-test-767c3.firebaseio.com/users/" + str(1063703850334278) + "/position.json?auth=" + firebase_token
r = requests.get(firebase_url)
print(r.json() + 10)