# Basic Finance Tracker – Backend (Node.js + Express + MongoDB)

This is the **backend API** for a simple finance tracking web application built with Node.js, Express, and MongoDB. It allows users to manage their income and expense transactions with secure authentication.

---

## Features

- User registration and login using **JWT authentication**  
- Add, edit, delete **income and expense** transactions  
- View transaction lists with filters (by **date** and **type**)  
- **Dashboard data**: total income, expenses, and balance summary  
- Secure and structured API design  
- Middleware for **authentication** and **error handling**

---

## Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (via Mongoose ODM)  
- **Authentication:** JSON Web Tokens (JWT)

---

## Getting Started

### Prerequisites

- **Node.js** and **npm** installed  
- **MongoDB** (local instance or MongoDB Atlas)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/roshanpaudel/FinTrack-backend.git
cd FinTrack-backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root of the project and add the following:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

4. Start the server:

```bash
npm start
```

The backend server will run by default at:  
**http://localhost:5000**

---

## Folder Structure

```bash
backend/
├── models/         # Mongoose schemas (User, Transaction)
├── routes/         # API route handlers
├── middleware/     # Custom middleware (auth, error handling)
├── controllers/    # Route logic for users and transactions
├── config/         # MongoDB connection config
├── server.js       # Application entry point
├── .env            # Environment variables (not committed)
```

---

## API Endpoints

### Auth Routes
- `POST /api/auth/register` – Register a new user  
- `POST /api/auth/login` – Authenticate and receive JWT  

### Transaction Routes (Protected)
- `GET /api/transactions` – Get user’s transactions  
- `POST /api/transactions` – Add a new transaction  
- `PUT /api/transactions/:id` – Update a transaction  
- `DELETE /api/transactions/:id` – Delete a transaction  

---

## License

This project is licensed under the **MIT License**.

---

## Contact

For any questions or suggestions, feel free to open an issue or contact:  
📧 **paudelroshan93@gmail.com**