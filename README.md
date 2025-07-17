# 🧠 Insightt Test - Frontend  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

This is a **frontend** project built with [Vite](https://vitejs.dev/) and [React](https://reactjs.org/), using [Bootstrap](https://getbootstrap.com/) for UI styling and [React Router DOM](https://reactrouter.com/) for routing.

## 🚀 Requirements
- [Node.js](https://nodejs.org/) >= 22.17.x  
- [npm](https://www.npmjs.com/) >= 10.9.x  

## 📦 Installation
Clone the repository and install dependencies:
```bash
npm install
```

## ▶️ Run the App
Start the Express server with:
```bash
npm run dev
```
The server will run by default on `http://localhost:5173`

## 🧰 Tech Stack
-  **Vite** – Fast build tool and development server
-  **React** – JavaScript library for building user interfaces
-  **Bootstrap** – CSS framework for responsive design
-  **React Router DOM** – Declarative routing for React apps

## 📡 Application Routes
### Public Routes (`/api/users`)
-   `/login` – Sign in to application.
-   `/register` – Register a new user.
-   `/recover` – Recover password (send reset email).

### Protected Routes (`/api/tasks`) _(Requires Authentication)_
-   `/home` – Task Manager.