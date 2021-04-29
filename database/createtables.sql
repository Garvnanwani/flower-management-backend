--Create user table
CREATE TABLE users(
  user_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(200) NOT NULL,
  default_shipping_address VARCHAR(100) NOT NULL,
  phone_number INT NOT NULL,
  user_role TINYINT(1) DEFAULT 0,
  register_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(user_id),
  UNIQUE KEY idx_user_email (email),
);
-- Create product table
CREATE TABLE products(
  product_id VARCHAR(10) NOT NULL,
  pname VARCHAR(50),
  pdescription VARCHAR(300),
  pprice INT,
  psold INT DEFAULT 0,
  pdiscount INT DEFAULT 0,
  pquantity INT DEFAULT 0,
  prating DECIMAL(10, 2) DEFAULT '0.00',
  pimage VARCHAR(150),
  PRIMARY KEY(product_id),
  FULLTEXT KEY idx_ft_product_pname_pdescription (pname, pdescription)
);
-- Create product_category table
CREATE TABLE product_category(
  product_id VARCHAR(10) NOT NULL,
  category_id VARCHAR(10) NOT NULL,
  PRIMARY KEY (product_id, category_id)
);
-- Create orders table
CREATE TABLE orders (
  order_id INT NOT NULL AUTO_INCREMENT,
  total_amount INT NOT NULL DEFAULT '0.00',
  created_on DATETIME DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT "Not processed",
  user_id INT,
  product_id VARCHAR(10),
  phone_number INT,
  PRIMARY KEY (order_id),
  KEY idx_orders_user_id (user_id),
);
-- Create order_details table
CREATE TABLE order_details (
  item_id INT NOT NULL AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id VARCHAR(10) NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  product_cost INT,
  quantity INT NOT NULL,
  unit_cost INT NOT NULL,
  payment_mode VARCHAR(50) NOT NULL,
  PRIMARY KEY (item_id),
  KEY idx_order_detail_order_id (order_id)
);
-- Create categories table
CREATE TABLE categories (
  category_id VARCHAR(10) NOT NULL,
  name VARCHAR(100),
  description VARCHAR(1000),
  category_image VARCHAR(100),
  PRIMARY KEY (category_id)
);
-- Create choices table (stores choices such as Types, Materials and Color)
CREATE TABLE choices (
  choices_id INT,
  name VARCHAR(100),
  PRIMARY KEY (choices_id)
);
-- Create choices_value table (stores values such as Yellow or Roses)
CREATE TABLE choices_value(
  choices_value_id INT AUTO_INCREMENT,
  choices_id INT,
  value VARCHAR(100),
  PRIMARY KEY (choices_value_id),
  KEY idx_choices_value_choices_id (choices_id)
);
-- Create product_choices table (associates choices values to products)
CREATE TABLE product_choices (
  product_id VARCHAR(10) NOT NULL,
  choices_value_id INT NOT NULL,
  PRIMARY KEY (product_id, choices_value_id)
);
-- Create has_production_cart table
CREATE TABLE has_production_cart(
  cart_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  order_id INT NOT NULL,
  product_id VARCHAR(10) NOT NULL,
  PRIMARY KEY (cart_id),
  KEY idx_has_production_cart_id (cart_id)
);
