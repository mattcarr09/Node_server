DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  
  product_name VARCHAR(100),
 
  department_name VARCHAR(100),

  price DECIMAL(10,2),
 
  stock_quantity INTEGER(100),
  
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Nike running shoes", "Clothing, Shoes, & Jewlery", 150.00, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Laptop", "Electronics, Computers & Office", 700.00, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Sofa", "Home, Garden & Tools", 1000.00, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Steeringwheel cover", "Automotive & Industrial", 10.00, 350);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Abbey Road Album", "Movies, Music & Games", 30.00, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Lipstick", "Beauty & Health", 10.00, 2000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Golden teetching ring", "Toys, Kids & Babies", 550.00, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Harry Potter and the Sorcerer's Stone", "E-readers & books", 30.00, 700);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Heirloom tomato", "BamazonFresh", 1.50, 2500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Nike running shoes", "Echo & Balexa", 150.00, 200);

USE bamazon_db;
SELECT*FROM products;
