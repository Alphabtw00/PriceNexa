# PriceNexa

A lightweight full-stack application for managing translations, authentication, and dynamic price lists.  
Built with **Node.js + Express**, **PostgreSQL**, and a **React (Vite)** frontend.

---


## 🛠 Backend Setup
1. Install dependencies:
cd backend
npm install
2. Create a `.env` file:
PORT=5000
JWT_SECRET=your_secret_here
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=pricenexa
DB_HOST=localhost
DB_PORT=5432

3. Start server:
npm start

---

## 🖥 Frontend Setup
1. Install dependencies:
cd frontend
npm install

2. Run dev server:
npm run dev

---

## 🗄 Database
You can run the schema file located under `/backend/db/schema.sql`  
(or the SQL provided during setup) directly in **pgAdmin**.

---

## 🔐 Authentication
- Login returns a JWT valid for 24 hours  
- Protected routes require an `Authorization: Bearer <token>` header

---

## 📌 Notes
- `.env` and `node_modules` are ignored through folder-level `.gitignore` files  
- Keep the backend and frontend separate but in the same project root  
- Designed to be easy to understand and extend


