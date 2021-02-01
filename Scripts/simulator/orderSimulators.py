import numpy as np
from datetime import datetime, timedelta
from Ordergen import getNewOrder
import json
import requests

#   Get all products avalieble from request
def getProducts():
    url = "http://localhost:3500/api/products"
    payload = {}
    headers = {}
    data = requests.request("GET", url, headers=headers, data=payload).text
    obj = json.loads(data)
    return obj["products"]

#   Post a new Order
def postOrder(payload):
    url = "http://localhost:3500/api/orders"
    headers = {
    'Content-Type': 'application/json'
    }
    response = requests.request("POST", url, headers=headers, data=payload)
    print(response.text)


#   Lambdas for exponential function
#   [0]:    10am - 11am
#   [1]:    11am - 2pm
#   [2]:    2pm - 6pm
#   [3]:    6pm - 11pm
lambdas = [3/3600, 8/3600, 2/3600, 7/3600]

products = getProducts()
ordersOfTheDay = []
dateFormat = "%Y-%m-%dT%H:%M:%S"

startingDate = datetime.strptime('{}-{}-{}T00:00:00'.format('2017', '12', '31'), dateFormat)
endingDate = datetime.strptime('{}-{}-{}T00:00:00'.format('2021', '01', '01'), dateFormat)

currentDate = startingDate
deltaDay = timedelta(days=1)
while currentDate < endingDate:
    currentDate = currentDate + deltaDay

    startingTime = datetime.strptime('{}-{}-{}T10:00:00'.format(currentDate.year,currentDate.month,currentDate.day), dateFormat)
    lunchTime = datetime.strptime('{}-{}-{}T11:00:00'.format(currentDate.year,currentDate.month,currentDate.day), dateFormat)
    afterNoonTime = datetime.strptime('{}-{}-{}T14:00:00'.format(currentDate.year,currentDate.month,currentDate.day), dateFormat)
    nightTime = datetime.strptime('{}-{}-{}T18:00:00'.format(currentDate.year,currentDate.month,currentDate.day), dateFormat)
    closeTime = datetime.strptime('{}-{}-{}T23:30:00'.format(currentDate.year,currentDate.month,currentDate.day), dateFormat)

    currentTime = startingTime
    while currentTime <= closeTime:
        lambdaT = 0
        if startingTime <= currentTime and currentTime <= lunchTime:
            lambdaT = lambdas[0]
        elif lunchTime < currentTime and currentTime <= afterNoonTime:
            lambdaT = lambdas[1]
        elif afterNoonTime < currentTime and currentTime <= nightTime:
            lambdaT = lambdas[2]
        elif nightTime < currentTime and currentTime <= closeTime:
            lambdaT = lambdas[3]
        delta = timedelta(seconds = np.random.exponential(scale = 1/lambdaT, size=None))
        currentTime = currentTime + delta
        order = getNewOrder(currentTime.strftime(dateFormat), products)
        postOrder(json.dumps(order))
        ordersOfTheDay.append(order)
