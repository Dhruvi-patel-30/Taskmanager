MERN Stack Task Management Application
Objective
This project is a Task Management Web Application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).
The main objective is to allow users to manage their daily tasks efficiently with secure authentication and full CRUD operations.

Features
- User Authentication
User Registration
User Login
JWT based authentication
Protected routes using middleware

- Task Management
Create new tasks
View all tasks
Update tasks
Delete tasks
Mark tasks as Completed / Pending

- Frontend Features (React.js)
Responsive UI design
Functional components & Hooks
Pages:
Login Page
Register Page
Dashboard
Form validation
API integration using Axios

- Backend Features (Node.js + Express.js)
RESTful APIs
JWT Authentication system
Middleware for protected routes
Secure user data handling

- Database (MongoDB)
  
#User Schema
name: String
email: String (unique)
password: String (hashed)

#Task Schema
title: String
description: String
status: String (Pending / Completed)
userId: ObjectId (reference to User)

-Project Structure<br>
backend/<br>
│── models/<br>
│── routes/<br>
│── middleware<br>
│── server.js<br>

frontend/<br>
│── src/<br>
│   │── pages/<br>
│   │── components/<br>
│   │── App.js<br>

-Backend Setup
cd backend
npm install
npm start

-Frontend Setup
cd frontend
npm install
npm start

-Environment Variables
Create .env file inside backend folder:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

-Deliverables
GitHub Repository Link
README with setup instructions

-Bonus Features (if implemented)
Deployment 

-Evaluation Criteria
Code Quality
UI/UX Design
Functionality
Error Handling
Creativity









