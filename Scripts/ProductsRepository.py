import json
import numpy as np

##  Producto
class Producto:
    def __init__(self, ID, nombre, tipo_producto):
        self.ID = ID
        self.nombre = nombre
        self.tipo_producto = tipo_producto

##  Archivo de Información de productos disponibles        
def openFile():
    with open('products.json', 'r') as myfile:
        data = myfile.read()
    obj = json.loads(data)
    return obj


def findProduct(products, ID):
    for i in range(len(products)):
        product = products[i]
        if(product['id']==ID):
            return product
    return None

#   Get Random Products based on number of people        
def getRandomProducts(n):
    productsList = openFile()
    products = []
    
    #   Bebidas
    nbebidas = int(np.random.triangular(0, n-1, n+2, 1)[0])
    for b in range(nbebidas):
        bebidaId = np.random.randint(low = 1, high = 5)
        bebidaJson = findProduct(productsList, bebidaId)
        bebida = Producto(bebidaJson['id'],bebidaJson['nombre'],bebidaJson['tipo'])
        products.append(bebida)
        
    #   Entradas
    nEntradas = int(np.random.triangular(0, n/2, n, 1)[0])
    for b in range(nEntradas):
        entradaId = np.random.randint(low = 5, high = 10)
        entradaJson = findProduct(productsList, entradaId)
        entrada = Producto(entradaJson['id'],entradaJson['nombre'],entradaJson['tipo'])
        products.append(entrada)
        
    #   Fuerte
    noEat = np.random.randint(low = 0, high = n)
    ind = n-noEat- np.random.randint(low = 0, high = (n-noEat)+1)
    comp =  n-noEat- ind
    
    #   Pidieron plato fuerte normal
    #   Hamburguesas
    nHamb = np.random.randint(low = 0, high = ind+1)
    for b in range(nHamb):
        HambId = np.random.randint(low = 10, high = 16)
        HambJson = findProduct(productsList, HambId)
        Hamb = Producto(HambJson['id'],HambJson['nombre'],HambJson['tipo'])
        products.append(Hamb)
        
    #   Sandwiches
    nSandw = np.random.randint(low = 0, high = ind - nHamb + 1)
    for b in range(nSandw):
        sandwId = np.random.randint(low = 24, high = 28)
        sandwJson = findProduct(productsList, sandwId)
        sandw = Producto(sandwJson['id'],sandwJson['nombre'],sandwJson['tipo'])
        products.append(sandw)
        
    #   Alas
    nAlas = np.random.randint(low = 0, high = ind-nHamb-nSandw+1)
    for b in range(nAlas):
        alasId = np.random.randint(low = 16, high = 24)
        alasJson = findProduct(productsList, alasId)
        alas = Producto(alasJson['id'],alasJson['nombre'],alasJson['tipo'])
        products.append(alas)
        
    #   Picadas
    nPics = np.random.randint(low = 0, high = ind - nHamb - nSandw - nAlas+1)
    for b in range(nPics):
        picId = 28
        picJson = findProduct(productsList, picId)
        pic = Producto(picJson['id'],picJson['nombre'],picJson['tipo'])
        products.append(pic)
            
    #   Pidieron plato fuerte picada
    numPicadasMaxi = comp//4
    numPicadasMed = (comp%4)//2
    numPicadasMedx2 = (comp%4)%2
    for i in range(numPicadasMaxi):
        picJson = findProduct(productsList, 30)
        pic = Producto(picJson['id'],picJson['nombre'],picJson['tipo'])
        products.append(pic)
    for i in range(numPicadasMed):
        picJson = findProduct(productsList, 29)
        pic = Producto(picJson['id'],picJson['nombre'],picJson['tipo'])
        products.append(pic)
    for i in range(numPicadasMedx2):
        picJson = findProduct(productsList, 29)
        pic = Producto(picJson['id'],picJson['nombre'],picJson['tipo'])
        products.append(pic)
        
    return products