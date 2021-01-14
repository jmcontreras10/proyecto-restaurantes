CREATE TABLE IF NOT EXISTS product(
   id SERIAL PRIMARY KEY,
   product_name VARCHAR(100) UNIQUE NOT NULL,
   product_type VARCHAR(1) NOT NULL,
   product_image VARCHAR(250)
);

CREATE TABLE IF NOT EXISTS inventory(
   id SERIAL PRIMARY KEY,
   stock INTEGER NOT NULL,
   inventory_adquisition_date DATE NOT NULL,
   inventory_expiry_date DATE NOT NULL,
   FOREIGN KEY (id) REFERENCES product(id)
);

CREATE TABLE IF NOT EXISTS restaurant_order(
   id SERIAL PRIMARY KEY,
   order_state VARCHAR(1) NOT NULL,
   entry_hour TIMESTAMP NOT NULL,
   starting_hour TIMESTAMP NOT NULL,
   ending_hour TIMESTAMP NOT NULL,
   delivery_hour TIMESTAMP NOT NULL,
   in_charge INTEGER NOT NULL,
   duration INTEGER NOT NULL
);


CREATE TABLE IF NOT EXISTS product_order(
   order_id INTEGER NOT NULL,
   product_id INTEGER NOT NULL,
   quantity INTEGER NOT NULL,
   PRIMARY KEY(order_id, product_id),
   FOREIGN KEY (order_id) REFERENCES restaurant_order(id),
   FOREIGN KEY (product_id) REFERENCES product(id)
);



DROP TABLE inventory;
DROP TABLE product_order;
DROP TABLE product;
DROP TABLE restaurant_order;


INSERT INTO product(product_name, product_type)
VALUES ('Prueba','0');