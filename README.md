# Basic Finance Tracker (MERN Stack)

A simple finance tracking web application built with the MERN stack (MongoDB, Express, React, Node.js).  
Track your income and expenses, view summaries, and manage your transactions easily.

---

## Features

- User registration and login (JWT authentication)  
- Add, edit, and delete income and expense transactions  
- View transaction list with filters (by date and type)  
- Dashboard showing total income, expenses, and balance  
- Responsive and clean user interface

---

## Tech Stack

- **Frontend:** React  
- **Backend:** Node.js, Express  
- **Database:** MongoDB (using Mongoose)  
- **Authentication:** JSON Web Tokens (JWT)

---

## Getting Started

### Prerequisites

- Node.js and npm installed  
- MongoDB instance (local or MongoDB Atlas)  
- Yarn or npm (for frontend dependencies)

### Installation

1. Clone the repository

```bash
git clone https://github.com/roshanpaudel/FinTrack-frontend.git
cd finance-tracker
Backend setup

bash
Copy
Edit
cd backend
npm install
# Create a .env file with:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret_key
npm start
Frontend setup

bash
Copy
Edit
cd ../frontend
npm install
npm start
The frontend will run on http://localhost:3000 and backend on http://localhost:5000 by default.

Project Structure
bash
Copy
Edit
finance-tracker/
├── backend/            # Express server and API
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   ├── middleware/     # Auth and error handling middleware
│   ├── server.js       # Entry point
├── frontend/           # React app
│   ├── src/
│       ├── components/ # React components
│       ├── pages/      # App pages (Login, Dashboard, etc.)
│       ├── context/    # React context for auth and state
│       ├── App.js
│       ├── index.js
└── README.md
Usage
Register a new user account

Log in to access your dashboard

Add transactions with amount, type (income/expense), category, and description

Edit or delete existing transactions

Filter transactions by date or type

View total income, expenses, and current balance on dashboard

License
This project is licensed under the MIT License.

Contact
For any questions or suggestions, feel free to open an issue or contact me paudelroshan93@gmail.com