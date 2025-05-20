# 📝 Real-Time Collaborative Document Editor

A **full-stack real-time collaborative document editor** built using **React.js**, **Node.js**, and **Socket.IO**. It allows multiple users to edit documents simultaneously with rich text support using Quill.js.

> **Author:** Sumit Singh Sengar

---

## 🚀 Features

- Real-time multi-user editing
- Rich text formatting with Quill.js
- WebSocket-based communication (Socket.IO)
- Modular backend with Node.js and Express
- Responsive React frontend

---

## 📦 Tech Stack

- **Frontend:** React.js, Quill.js, Socket.IO Client  
- **Backend:** Node.js, Express.js, Socket.IO  
- **Version Control:** Git + GitHub

---

## 🛠️ Setup Instructions

### 🔧 Server Setup

```bash
cd server
npm install
npm start

cd client
npx create-react-app .   # Only once, if not already created
npm install quill socket.io-client
npm start

