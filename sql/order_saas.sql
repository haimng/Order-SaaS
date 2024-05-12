CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS customer (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(64),
  updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS store (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,  
  name VARCHAR(255),
  description VARCHAR(1024),
  image VARCHAR(1024),
  updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  store_id UUID NOT NULL,    
  name VARCHAR(512),
  description TEXT,
  image VARCHAR(1024),
  price FLOAT,
  stock_unit VARCHAR(32),
  stock_amount FLOAT,
  updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX store_id ON product (store_id);

CREATE TABLE IF NOT EXISTS "order" (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  customer_id UUID NOT NULL,
  updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX customer_id ON "order" (customer_id);

CREATE TABLE IF NOT EXISTS order_product (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID NOT NULL,
  amount FLOAT,
  updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX product_id ON order_product (product_id);