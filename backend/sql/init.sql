CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE translations (
  id SERIAL PRIMARY KEY,
  page VARCHAR(50) NOT NULL,
  key VARCHAR(100) NOT NULL,
  language VARCHAR(10) NOT NULL,
  value TEXT NOT NULL,
  UNIQUE(page, key, language)
);

CREATE TABLE pricelist_items (
  id SERIAL PRIMARY KEY,
  product_service VARCHAR(255),
  in_price DECIMAL(10, 2),
  out_price DECIMAL(10, 2),
  quantity DECIMAL(10, 2),
  unit VARCHAR(50),
  discount DECIMAL(5, 2),
  vat DECIMAL(5, 2),
  total DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, password_hash) 
VALUES ('testuser1', '$2b$10$XqZ7J5K4N8V.yH3mW9pLHOZ7J5K4N8V.yH3mW9pLHOZ7J5K4N8V.yH');

INSERT INTO translations (page, key, language, value) VALUES
('login', 'welcome', 'en', 'Welcome'),
('login', 'welcome', 'sv', 'Välkommen'),
('login', 'username', 'en', 'Username'),
('login', 'username', 'sv', 'Användarnamn'),
('login', 'password', 'en', 'Password'),
('login', 'password', 'sv', 'Lösenord'),
('login', 'login_button', 'en', 'Login'),
('login', 'login_button', 'sv', 'Logga in'),
('login', 'forgot_password', 'en', 'Forgot password?'),
('login', 'forgot_password', 'sv', 'Glömt lösenord?'),
('terms', 'title', 'en', 'Terms & Conditions'),
('terms', 'title', 'sv', 'Villkor'),
('terms', 'content', 'en', 'These are the terms and conditions...'),
('terms', 'content', 'sv', 'Detta är villkoren...');

INSERT INTO pricelist_items (product_service, in_price, out_price, quantity, unit, discount, vat, total)
VALUES 
  ('Product 1', 100.00, 150.00, 1.00, 'pcs', 0.00, 25.00, 150.00),
  ('Product 2', 200.00, 280.00, 2.00, 'pcs', 10.00, 25.00, 504.00),
  ('Product 3', 150.00, 220.00, 1.00, 'pcs', 0.00, 25.00, 220.00),
  ('Product 4', 300.00, 450.00, 3.00, 'pcs', 5.00, 25.00, 1282.50),
  ('Product 5', 80.00, 120.00, 1.00, 'pcs', 0.00, 25.00, 120.00),
  ('Product 6', 250.00, 375.00, 2.00, 'pcs', 0.00, 25.00, 750.00),
  ('Product 7', 120.00, 180.00, 1.00, 'pcs', 15.00, 25.00, 153.00),
  ('Product 8', 400.00, 600.00, 1.00, 'pcs', 0.00, 25.00, 600.00),
  ('Product 9', 90.00, 135.00, 4.00, 'pcs', 0.00, 25.00, 540.00),
  ('Product 10', 180.00, 270.00, 1.00, 'pcs', 10.00, 25.00, 243.00),
  ('Product 11', 350.00, 525.00, 2.00, 'pcs', 0.00, 25.00, 1050.00),
  ('Product 12', 75.00, 112.50, 1.00, 'pcs', 0.00, 25.00, 112.50),
  ('Product 13', 220.00, 330.00, 3.00, 'pcs', 5.00, 25.00, 940.50),
  ('Product 14', 160.00, 240.00, 1.00, 'pcs', 0.00, 25.00, 240.00),
  ('Product 15', 280.00, 420.00, 2.00, 'pcs', 0.00, 25.00, 840.00),
  ('Product 16', 95.00, 142.50, 1.00, 'pcs', 20.00, 25.00, 114.00),
  ('Product 17', 500.00, 750.00, 1.00, 'pcs', 0.00, 25.00, 750.00),
  ('Product 18', 110.00, 165.00, 5.00, 'pcs', 0.00, 25.00, 825.00),
  ('Product 19', 200.00, 300.00, 1.00, 'pcs', 10.00, 25.00, 270.00),
  ('Product 20', 320.00, 480.00, 2.00, 'pcs', 0.00, 25.00, 960.00),
  ('Product 21', 140.00, 210.00, 1.00, 'pcs', 0.00, 25.00, 210.00),
  ('Product 22', 260.00, 390.00, 3.00, 'pcs', 5.00, 25.00, 1111.50);