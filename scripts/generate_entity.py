import requests
import json
import pickle
import csv


currency_data = pickle.load(open( "currencies.p", "rb" ))
writer = csv.writer(open("currency_entity.csv", "wb"))

# for each entity in pickle file generate a line of data

with open('digital-currency.csv', 'wb') as csvfile:
    for c in currency_data:
        # writer = csv.writer(csvfile, delimiter=' ', quotechar='|', quoting=csv.QUOTE_MINIMAL)
        writer = csv.writer(csvfile)
        writer.writerow([c["name"],c["name"].lower(),c["symbol"],c["symbol"].lower()])
