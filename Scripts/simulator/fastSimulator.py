import json
from flask import Flask, request
import numpy as np

app = Flask(__name__)

#   Simulates the receivement of product
def simulateRecievement():
        print('Hello')

@app.route('/cookFast', methods=['POST'])
def cookFast():
    #   Getting data
    order = json.loads(request.data)
    


    return json.dumps(order)


app.run()