import json
from typing import Collection
import numpy as np
import collections

#   Find a product by given category
def findRandomProductByCategory(products, category):
    cond = lambda product: product["productCategory"] == category
    filtered = list(filter(cond, products))
    return filtered[np.random.randint(len(filtered), size=1)[0]]


#   Find a product by given name
def findProductByName(products, name):
    for i in range(len(products)):
        product = products[i]
        if (product['productName'] == name):
            return product
    return None


def getRandomProducts(numberOfPeople, products):

    order = []
    meals = []

    #   Drinks [0]
    meals.append(
        int(
            np.random.triangular(0, numberOfPeople - 1, numberOfPeople + 2,
                                 1)[0]))
    #   Start [1]
    meals.append(
        int(np.random.triangular(0, numberOfPeople / 2, numberOfPeople, 1)[0]))
    #   Second
    numberPeopleNoEat = int(
        np.random.triangular(0, numberOfPeople / 4, numberOfPeople, 1)[0])
    numberOfPeopleEatsIndividual = numberOfPeople - numberPeopleNoEat - np.random.randint(
        low=0, high=(numberOfPeople - numberPeopleNoEat) + 1)
    numberOfPeopleEatsGroup = numberOfPeople - numberPeopleNoEat - numberOfPeopleEatsIndividual
    #   Hamburguers [2]
    numberOfHamburger = np.random.randint(low=0,
                                          high=numberOfPeopleEatsIndividual +
                                          1)
    meals.append(numberOfHamburger)
    #   Wings [3]
    numberOfWings = np.random.randint(low=0,
                                      high=numberOfPeopleEatsIndividual -
                                      numberOfHamburger + 1)
    meals.append(numberOfWings)
    #   Sandwiches [4]
    numberOfSandwiches = np.random.randint(low=0,
                                           high=numberOfPeopleEatsIndividual -
                                           numberOfHamburger - numberOfWings +
                                           1)
    meals.append(numberOfSandwiches)
    #   Individual picadas "Personal"
    numberOfPicadas = np.random.randint(low=0,
                                        high=numberOfPeopleEatsIndividual -
                                        numberOfHamburger -
                                        numberOfSandwiches - numberOfWings + 1)

    #   Number of Picadas to Share
    #   "Maxi"
    numberPicadasMaxi = numberOfPeopleEatsGroup // 4
    #   "Mediana"
    numberPicadasMed = (numberOfPeopleEatsGroup % 4) // 2

    #   Non-Picadas
    for category in range(len(meals)):
        numberOfMealsIncategory = meals[category]
        for _ in range(numberOfMealsIncategory):
            meal = findRandomProductByCategory(products, category)
            order.append(meal)

    #   Picadas
    for _ in range(numberOfPicadas):
        order.append(findProductByName(products, "Personal"))
    for _ in range(numberPicadasMaxi):
        order.append(findProductByName(products, "Maxi"))
    for _ in range(numberPicadasMed):
        order.append(findProductByName(products, "Mediana"))

    orderMap = map(lambda prod: (prod["id"], 1), order)
    d = collections.defaultdict(list)
    for t in orderMap:
        d[t[0]].append(t[1])
    result = [(k,sum(v)) for k,v in d.items()]
    return list(map(lambda prod: {"id": prod[0], "quantity": prod[1]}, result))


def getNewOrder(time, products):
    N = int(np.random.triangular(1, 10 / 3, 12, 1)[0])
    order = {"entryHour": time, "products": getRandomProducts(N, products)}
    return order