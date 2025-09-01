Mini CRM Application

A full-stack Customer Relationship Management (CRM) application built with React.js (frontend) and Node.js + Express + MongoDB (backend).
It helps businesses manage contacts, deals, notes, and analytics with a clean, simple, and efficient UI.

# Mini CRM Backend

This is the backend service for the **Mini CRM** application.  
It is built with **Node.js**, **Express**, and **MongoDB (Mongoose)**, and provides APIs for authentication, contact management, and file handling.

---

## 🚀 Features

- User authentication (Signup / Login) with JWT
- Contact management with search & pagination
- Secure password hashing with bcryptjs
- Logging with morgan
- Environment variable configuration with dotenv
- Ready for development with nodemon

---

## 📂 Project Structure

mini-crm/
│
├── backend/
│   ├── models/           # Mongoose models (User, Contact, Deal, Note)
│   ├── controllers/      # Business logic
│   ├── routes/           # Express routes
│   ├── middleware/       # Auth middleware
│   ├── server.js         # App entry point
│   └── .env              # MongoDB URI, JWT secret, origin
│
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable UI components (Card, Button, Table, etc.)
│   │   ├── pages/        # Main pages (Contacts, Deals, Analytics, Auth, Notes)
│   │   ├── services/     # API service functions
│   │   ├── store/        # State management (authStore)
│   │   ├── App.jsx       # Routes
│   │   └── main.jsx      # Entry
│   └── public/           # Static assets
│
└── README.md

⚙️ Setup Instructions
1️⃣ Backend Setup
cd backend
npm install


Create .env file:

PORT=4000
MONGO_URI=mongodb://localhost:27017/mini-crm
JWT_SECRET=supersecretkey
ORIGIN=http://localhost:5173


Run backend:

npm run dev


👉 Server will run on http://localhost:4000

2️⃣ Frontend Setup
cd frontend
npm install


Run frontend:

npm run dev


👉 Frontend will run on http://localhost:5173

🔌 API Integration

All frontend API calls use services/* wrappers with Axios.

Token stored in Zustand store (authStore) and sent via headers for protected routes.

Pagination params (page, pageSize) included in requests.

Analytics processed in backend (/api/analytics) and visualized with Recharts in frontend.


=🎯 Summary

This Mini CRM project demonstrates a complete full-stack application with:

Backend APIs (contacts, deals, notes, analytics, auth)

Frontend UI with React + Recharts

Data visualization for business insights

CSV Import/Export for bulk data handling

Clean modular code structure for scalability

⚡ It’s lightweight, extendable, and designed as a real-world CRM starter kit.

✨ Built with ❤️ using MERN stack for seamless CRM workflows.***
