CREATE TABLE users(
  user_id INT AUTO_INCREMENT,
  name VARCHAR(50),
  email VARCHAR(50),
  password VARCHAR(20),
  default_shipping_address VARCHAR(100),
  dept VARCHAR(100),
  user_role TINYINT(1) DEFAULT 0,
  register_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(userid)
);
CREATE TABLE products(
  product_id INT AUTO_INCREMENT,
  pname VARCHAR(50),
  pdescription VARCHAR(300),
  pprice INT,
  psold INT DEFAULT 0,
  pquantity INT DEFAULT 0,
  pcategory VARCHAR(50),
  prating DECIMAL(10, 2) DEFAULT '0.00',
  pimage VARCHAR(150),
  PRIMARY KEY(productid)
);
CREATE TABLE orders (
  order_id INT AUTO_INCREMENT,
  total_amount INT,
  created_on DATETIME DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT "Not processed",
  user_id INT,
  product_id INT,
  phone_number INT,
  PRIMARY KEY (order_id)
);
CREATE TABLE order_details (
  item_id INT AUTO_INCREMENT,
  order_id INT,
  product_id INT,
  product_name VARCHAR(100),
  quantity INT,
  unit_cost INT,
  payment_mode VARCHAR(50),
  PRIMARY KEY (item_id)
);
CREATE TABLE categories (
  category_id INT AUTO_INCREMENT,
  name VARCHAR(100),
  description VARCHAR(1000),
  category_image VARCHAR(100),
  PRIMARY KEY (category_id)
);
CREATE TABLE choices (
choices_id INT AUTO_INCREMENT,
types VARCHAR(100),
materials VARCHAR(100),
colours VARCHAR(100),
PRIMARY KEY (choices_id)
);
