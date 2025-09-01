





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



## API Flow

1. Frontend calls `services/*` functions → Axios request  
2. Request hits Express route → JWT middleware  
3. Controller executes DB queries (Mongoose)  
4. Response sent → frontend updates UI


## Database Schema

- **User** → { name, email, password }  
- **Contact** → { name, email, phone, company, createdBy }  
- **Deal** → { title, amount, stage, contact, createdBy }  
- **Note** → { content, contact, createdBy }  



## Data Visualization

- Deals by stage → Pie chart  
- Deals by month + revenue → Bar + Line chart  
- Total metrics → count, avg, revenue
