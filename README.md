# 🗂️ Task Management App

A full-stack task management application built with **React (client)** and **NestJS (server)**, using **MongoDB** as the database.


## 🚀 Features
- User authentication and authorization (JWT-based)
- Create, update, and delete tasks
- Filter tasks by category and due date
- Sort tasks by creation and update date
- Responsive UI with TailwindCSS
- API error handling and validation

## 📦 Tech Stack

### Frontend:
- ⚛️ React
- 📦 Axios for API requests
- 🎨 TailwindCSS for styling
- 🟦 TypeScript

### Backend:
- 🚀 NestJS
- 🗄️ Mongoose (MongoDB ODM)
- 🔒 JWT for authentication
- 🌐 Axios for LinkedIn scraping

### Database:
- 🍃 MongoDB (Cloud or Local)

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/ahmedsamidev/task-managment-app.git
cd task-managment-app
```

### 2. Install dependencies

**Client (React)**
```bash
cd client
npm install
```

**Server (NestJS)**
```bash
cd ../server
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in both client and server directories.

**Client (.env)**
```env
REACT_APP_API_URL=http://localhost:5000
```

**Server (.env)**
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
LINKEDIN_USERNAME=your_linkedin_username
LINKEDIN_PASSWORD=your_linkedin_password
```

> ⚠️ Note: Replace the placeholder values with your actual credentials.