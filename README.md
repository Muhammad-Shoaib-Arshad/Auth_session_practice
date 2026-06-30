# Custom Session-Based Authentication System (Node.js & Express)

A robust backend authentication system built using the MERN stack architecture (Node.js, Express, MongoDB, and Mongoose). This project implements secure, production-grade session-based authentication using server-side sessions stored in a MongoDB cluster rather than local server memory.

---

## 🚀 Key Features

* **Server-Side Session Management:** Uses `express-session` paired with `connect-mongo` to store active sessions directly inside MongoDB, keeping the server stateless and scaling-ready.
* **Secure Database Integration:** Complete ODM structure utilizing Mongoose to handle schema definitions, validation rules, and built-in query handling.
* **Encrypted Data Safeguards:** Integrated password hashing mechanism via `bcrypt` to protect sensitive user credentials at rest.
* **Environment Isolation:** Zero hardcoded credentials; utilizes centralized `.env` configuration files to manage MongoDB URIs, server ports, and cryptographically secure session secrets.
* **Rest API Endpoint Architecture:** Organized, scalable routing system nested under structural version control (`/api/v1/...`).

---

## 🛠️ Tech Stack & Architecture

* **Runtime Environment:** Node.js (v22+)
* **Backend Framework:** Express.js
* **Database Platform:** MongoDB Atlas / Local MongoDB
* **Object Data Modeling (ODM):** Mongoose
* **Session Store:** `connect-mongo`

---

## 📁 Project Directory Layout

```text
auth_sys/
├── controllers/
│   └── authController.js    # Business logic for Register, Login, and Session checking
├── models/
│   └── User.js              # Mongoose Schema with custom pre-save hashing hooks
├── routes/
│   └── authRoutes.js        # Express router splitting authentication endpoints
├── .env.example             # Configuration reference template for developers
├── .gitignore               # Strict rule boundaries ensuring data privacy
├── server.js                # Core app entry point, middleware assembly, & db initialization
└── package.json             # Core dependency tracker and execution scripts
