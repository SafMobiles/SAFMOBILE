-- =============================================
-- SAF Mobiles - Full Database Schema
-- Run this in phpMyAdmin (MAMP)
-- =============================================

CREATE DATABASE IF NOT EXISTS safmobiles_db;
USE safmobiles_db;

-- =============================================
-- Users Table (for session-based login)
-- =============================================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Default admin user (plain-text for demo, as per original project)
INSERT IGNORE INTO users (username, password) VALUES ('admin', 'password123');

-- =============================================
-- Products Table (main CRUD module)
-- =============================================
CREATE TABLE IF NOT EXISTS products (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(150)   NOT NULL,
    brand       VARCHAR(80)    NOT NULL,
    price       DECIMAL(10,2)  NOT NULL,
    `condition` ENUM('New','Good','Fair','Refurbished') NOT NULL DEFAULT 'New',
    stock       INT            NOT NULL DEFAULT 0,
    image_url   VARCHAR(300)   DEFAULT 'assets/images/placeholder.png',
    screen      VARCHAR(200)   DEFAULT '',
    chip        VARCHAR(200)   DEFAULT '',
    camera      VARCHAR(300)   DEFAULT '',
    battery     VARCHAR(200)   DEFAULT '',
    featured    TINYINT(1)     NOT NULL DEFAULT 0,
    created_at  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =============================================
-- Seed Data – mirrors original data.js products
-- =============================================
INSERT IGNORE INTO products (id, name, brand, price, `condition`, stock, image_url, screen, chip, camera, battery, featured) VALUES
(1, 'Apple iPhone 15 Pro Max', 'Apple',  1199.00, 'New',  42, 'assets/images/iphone.png',
    '6.7\" Super Retina XDR OLED, 120Hz', 'A17 Pro (3 nm)',
    '48MP Main | 12MP 5x Telephoto | 12MP Ultrawide', '4422 mAh, Up to 29 hrs video', 1),

(2, 'Samsung Galaxy S24 Ultra', 'Samsung', 1299.00, 'New', 15, 'assets/images/s24_ultra.png',
    '6.8\" Dynamic LTPO AMOLED 2X, 120Hz', 'Snapdragon 8 Gen 3 for Galaxy',
    '200MP Main | 50MP 5x Telephoto | 10MP 3x | 12MP Ultra', '5000 mAh, 45W wired charging', 1),

(3, 'Google Pixel 8 Pro', 'Google',  999.00, 'New',   2, 'assets/images/pixel8.png',
    '6.7\" Super Actua LTPO OLED, 120Hz', 'Google Tensor G3 (4 nm)',
    '50MP Main | 48MP 5x Telephoto | 48MP Ultrawide', '5050 mAh, 30W wired charging', 1),

(4, 'Samsung Galaxy Z Fold 5', 'Samsung', 899.00, 'Good',  8, 'assets/images/fold5.png',
    '7.6\" Foldable Dynamic AMOLED 2X', 'Snapdragon 8 Gen 2',
    '50MP Main | 10MP 3x Telephoto | 12MP Ultrawide', '4400 mAh, 25W wired', 0);
