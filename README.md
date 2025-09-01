# 📊 Mini CRM Application

A **full-stack Customer Relationship Management (CRM)** system built with **React.js (frontend)** and **Node.js + Express + MongoDB (backend)**.  
It provides a simple yet powerful interface to manage **contacts, deals, notes, and analytics**, with **CSV import/export** and a clean dashboard.

---

## 🚀 Features

- 🔐 **Authentication** (Signup/Login with JWT)
- 📇 **Contacts Management** – CRUD, search, pagination
- 💼 **Deals** – link to contacts, track stage (new, in-progress, won, lost)
- 📝 **Notes** – attach customer interaction notes
- 📊 **Analytics Dashboard** – metrics & charts (stage, month, revenue)
- 📂 **CSV Import/Export** for contacts
- 📑 **Pagination**
- 🧪 **Unit Testing** with Vitest + RTL

---

## 🛠 Tech Stack

- **Frontend:** React.js, React Router, Recharts, Axios, Zustand, Vitest, RTL, CSS  
- **Backend:** Node.js, Express.js, MongoDB, JWT, bcrypt, morgan, cors  
- **Tools:** Postman/Thunder Client, MongoDB Compass

---

## ⚙️ Setup Instructions

### Backend

```bash
cd backend
npm install

Create .env:

PORT=4000
MONGO_URI=mongodb://localhost:27017/mini-crm
JWT_SECRET=supersecretkey
ORIGIN=http://localhost:5173

Run backend:

npm run dev

Frontend
cd frontend
npm install
npm run dev



---

## 📄 docs/ARCHITECTURE.md

```markdown
# 🏗 Architecture Overview

## System Design

- **Frontend (React.js)**  
  - Pages: Contacts, Deals, Notes, Analytics, Auth  
  - Services: API wrappers (Axios)  
  - State: Zustand for auth, local states for forms/pagination  
  - UI: Recharts for visualization, reusable UI components (Card, Button, Table, etc.)

- **Backend (Node.js + Express)**  
  - Routes: `/api/auth`, `/api/contacts`, `/api/deals`, `/api/notes`, `/api/analytics`  
  - Middleware: JWT-based auth  
  - Controllers: Business logic (CRUD, analytics aggregation)  
  - Database: MongoDB with Mongoose models

---

## API Flow

1. Frontend calls `services/*` functions → Axios request  
2. Request hits Express route → JWT middleware  
3. Controller executes DB queries (Mongoose)  
4. Response sent → frontend updates UI

---

## Database Schema

- **User** → { name, email, password }  
- **Contact** → { name, email, phone, company, createdBy }  
- **Deal** → { title, amount, stage, contact, createdBy }  
- **Note** → { content, contact, createdBy }  

---

## Data Visualization

- Deals by stage → Pie chart  
- Deals by month + revenue → Bar + Line chart  
- Total metrics → count, avg, revenue
