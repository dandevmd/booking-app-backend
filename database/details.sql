CREATE DATABASE IF NOT EXISTS lama_booking;

-- Language: sql

-- Path: server/database/tables.sql

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  country VARCHAR(50) NOT NULL,
  city VARCHAR(50) NOT NULL,
  user_avatar VARCHAR(100),
  phone_number VARCHAR(50) NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS hotels (
  hotels_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  title VARCHAR(100) NOT NULL,
  type VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  address VARCHAR(100) NOT NULL,
  country VARCHAR(50) NOT NULL,
  distance VARCHAR(50) NOT NULL,
  photos VARCHAR(100),
  description VARCHAR(1000) NOT NULL,
  rating INT CHECK (rating >= 0 AND rating <= 5),
  cheapest_price INT NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
);

CREATE TABLE IF NOT EXISTS rooms (
  room_id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  price INT NOT NULL,
  description VARCHAR(1000) NOT NULL,
  max_people INT NOT NULL,
  unavailable_dates VARCHAR(1000),
  hotels_id INT NOT NULL,
  FOREIGN KEY (hotels_id) REFERENCES hotels (hotels_id)
);


-- CREATE TABLE IF NOT EXISTS hotel_rooms (
--   hotel_rooms SERIAL PRIMARY KEY,
--   room_id INT NOT NULL,
--   hotels_id INT NOT NULL,
--   FOREIGN KEY (room_id) REFERENCES rooms (room_id),
--   FOREIGN KEY (hotels_id) REFERENCES hotels (hotels_id)
-- );




