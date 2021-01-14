CREATE TABLE IF NOT EXISTS productos (
   idProducto serial PRIMARY KEY,
   nombre VARCHAR(100) UNIQUE NOT NULL,
   tipo VARCHAR(1) NOT NULL,
   stock INTEGER NOT NULL
);

INSERT INTO productos(nombre, tipo, stock)
VALUES (value1, value2, value3);