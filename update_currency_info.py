import requests
import json

coin_market_cap_api = "https://api.coinmarketcap.com/v1/ticker/"
firebase_token = "FqiZ1P17wv4o9gh5MIAZbi4RlKDxz5RxV19EU5cK"
firebase_url = "https://dam-test-767c3.firebaseio.com/currencies.json?auth=" + firebase_token
currency_count = 0
try:
    r = requests.get(coin_market_cap_api)
    data = r.json()
    print("Data: " + str(data[0]))


    for coin in data:
        currency_count = currency_count + 1

        # Generate Firebase payload
        firebase_payload = {
            coin["id"]: {
                "name": coin["name"],
                "symbol": coin["symbol"],
                "rank": coin["rank"],
        		"price_usd": coin["price_usd"],
        		"24h_volume_usd": coin["24h_volume_usd"],
        		"market_cap_usd": coin["market_cap_usd"],
        		"available_supply": coin["available_supply"],
        		"total_supply": coin["total_supply"],
        		"percent_change_1h": coin["percent_change_1h"],
        		"percent_change_24h": coin["percent_change_24h"],
        		"percent_change_7d": coin["percent_change_7d"]
                }
            }
        if coin["name"] == "Bitcoin":
            print("The price of Bitcoin is: " + str(coin["price_usd"]))
        r = requests.patch(firebase_url, data=json.dumps(firebase_payload))
    print("Database updated for " + str(currency_count) + " currencies.")

except Exception as e:
    print("Exception : " + str(e))
