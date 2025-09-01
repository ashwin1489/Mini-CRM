
---

## 📄 docs/API_DOCS.md

```markdown
# 📑 API Documentation

Base URL: `http://localhost:4000/api`

---

## 🔐 Auth

### POST `/auth/signup`
```json
{ "name": "User", "email": "u@test.com", "password": "123456" }


📇 Contacts
GET /contacts?search=&page=1&pageSize=5

Returns paginated contacts.

POST /contacts
{ "name": "John", "email": "john@mail.com", "phone": "123", "company": "ACME" }

PUT /contacts/:id
DELETE /contacts/:id

💼 Deals
GET /deals?page=1&pageSize=5

Returns deals with contact populated.

POST /deals
{ "title": "New Deal", "amount": 3000, "stage": "new", "contact": "contactId" }
PUT /deals/:id
DELETE /deals/:id

📝 Notes
GET /notes?contactId=...
POST /notes

{ "content": "Followed up", "contact": "contactId" }

📊 Analytics
GET /analytics
{
  "totalDeals": 5,
  "averageDealValue": 3500,
  "totalRevenue": 12000,
  "dealsByStage": [ { "stage": "new", "count": 2 } ],
  "dealsByMonth": [ { "month": "Jan", "count": 1, "revenue": 2000 } ]
}


POST /analytics/recalc

Triggers recalculation.

####################################################################################################













📑 Mini CRM – API Documentation

Base URL (dev):

http://localhost:4000/api


All protected routes require a JWT token in headers:

Authorization: Bearer <your_token_here>

🔐 Authentication
Signup

POST /auth/signup – Create a new user.

Request:

{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "123456"
}


Response:

{
  "_id": "userId",
  "name": "Alice",
  "email": "alice@example.com",
  "token": "jwt_token_here"
}

Login

POST /auth/login – Authenticate and receive JWT.

Request:

{
  "email": "alice@example.com",
  "password": "123456"
}


Response:

{
  "_id": "userId",
  "name": "Alice",
  "email": "alice@example.com",
  "token": "jwt_token_here"
}

📇 Contacts
Get Contacts

GET /contacts?search=&page=1&pageSize=5
Retrieve all contacts with pagination and optional search.

Response:

{
  "items": [
    {
      "_id": "c1",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "123456789",
      "company": "ACME Corp"
    }
  ],
  "total": 12,
  "page": 1,
  "pageSize": 5
}

Create Contact

POST /contacts

Request:

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "987654321",
  "company": "Example Ltd"
}


Response:

{
  "_id": "c2",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "987654321",
  "company": "Example Ltd",
  "createdBy": "userId"
}

Update Contact

PUT /contacts/:id

Request:

{
  "phone": "111222333",
  "company": "NewCo"
}


Response:

{
  "_id": "c2",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "111222333",
  "company": "NewCo"
}

Delete Contact

DELETE /contacts/:id

Response:

{ "message": "Contact deleted" }

Import Contacts (CSV)

POST /contacts/import – Upload CSV with name,email,phone,company.

Response:

{ "message": "Contacts imported", "count": 25 }

Export Contacts (CSV)

GET /contacts/export – Returns CSV file.

💼 Deals
Get Deals

GET /deals?page=1&pageSize=5&stage=new
Retrieve deals, filter by stage.

Response:

{
  "items": [
    {
      "_id": "d1",
      "title": "Website Redesign",
      "amount": 5000,
      "stage": "in-progress",
      "contact": { "_id": "c1", "name": "John Doe" }
    }
  ],
  "total": 7,
  "page": 1,
  "pageSize": 5
}

Create Deal

POST /deals

Request:

{
  "title": "App Development",
  "amount": 10000,
  "stage": "new",
  "contact": "c1"
}


Response:

{
  "_id": "d2",
  "title": "App Development",
  "amount": 10000,
  "stage": "new",
  "contact": "c1",
  "createdBy": "userId"
}

Update Deal

PUT /deals/:id

Request:

{
  "stage": "won",
  "amount": 12000
}


Response:

{
  "_id": "d2",
  "title": "App Development",
  "amount": 12000,
  "stage": "won"
}

Delete Deal

DELETE /deals/:id

Response:

{ "message": "Deal deleted" }

📝 Notes
Get Notes (by Contact)

GET /notes?contactId=c1

Response:

[
  {
    "_id": "n1",
    "content": "Followed up with client about proposal",
    "contact": "c1"
  }
]

Create Note

POST /notes

Request:

{
  "content": "Sent contract draft",
  "contact": "c1"
}


Response:

{
  "_id": "n2",
  "content": "Sent contract draft",
  "contact": "c1",
  "createdBy": "userId"
}

Delete Note

DELETE /notes/:id

Response:

{ "message": "Note deleted" }

📊 Analytics
Get Analytics

GET /analytics – Returns CRM insights.

Response:

{
  "totalDeals": 5,
  "averageDealValue": 3500,
  "totalRevenue": 12000,
  "dealsByStage": [
    { "stage": "new", "count": 2 },
    { "stage": "in-progress", "count": 1 },
    { "stage": "won", "count": 2 }
  ],
  "dealsByMonth": [
    { "month": "Jan", "count": 2, "revenue": 5000 },
    { "month": "Feb", "count": 3, "revenue": 7000 }
  ]
}

Recalculate Analytics

POST /analytics/recalc

Response:

{ "message": "Recalculation triggered" }

✅ Summary

This API set powers the Mini CRM, supporting:

Secure user authentication

Contacts CRUD + CSV import/export

Deals tracking with stages and revenue

Notes for each contact

Analytics dashboard with totals, averages, and charts

All endpoints are RESTful, paginated, and JWT-secured.

⚡ Done — this is a single file you can drop as API_DOCUMENTATION.md in your repo.

Do you also want me to add example curl commands for each API (so someone can test instantly from terminal), or keep it this clean JSON style?