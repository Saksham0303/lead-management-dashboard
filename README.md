# Lead Management Dashboard (Mini CRM)

A full-stack Lead Management Dashboard built as part of a fresher hiring assignment.  
The application demonstrates frontend UI, backend APIs, MongoDB integration, analytics, and deployment readiness.

---

## 🚀 Features

### 🔐 Authentication (UI Level)
- Login page (dummy authentication)
- Dashboard protected using sessionStorage
- Logout functionality

### 📊 Dashboard
- Total Leads
- Converted Leads
- New Leads
- Conversion Rate

### 📋 Lead Management
- Server-side pagination
- Search by name/email/company
- Filter by status
- Lead detail view

---

## 🛠 Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB (Atlas – Free Tier)
- Mongoose

---

## 📦 Database
- MongoDB Atlas (Free Tier)
- Seeded with 500 dummy leads

---

## 🔗 API Endpoints


GET /api/leads
GET /api/leads/:id
GET /api/leads/analytics

yaml
Copy code

Supports:
- Search
- Filter
- Pagination
- Sorting

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
PORT=5000
MONGO_URI=your_mongodb_connection_string

shell
Copy code

### Frontend (`.env.local`)
NEXT_PUBLIC_API_URL=http://localhost:5000

yaml
Copy code

---

## ▶️ Run Locally

### Backend
```bash
cd backend
npm install
node server.js
Frontend
bash
Copy code
npm install
npm run dev
🔑 Demo Login

Email: any valid email

Password: any password (6+ characters)

🌐 Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

(Links will be updated after deployment)

👤 Author

Saksham Jain
Frontend Developer