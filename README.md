# Blog Platform with Comments

A full-stack blogging platform built using the MERN stack where users can register, log in, create blog posts, edit or delete their own posts, and interact with others through comments.

## Live Demo

- **Frontend (Netlify):https://stately-sundae-83ac94.netlify.app/
- **Backend (Render):https://blog-platform-1-3d9k.onrender.com/api
## Features

- User Registration and Login
- JWT Authentication
- Create, Edit and Delete Blog Posts
- View All Blog Posts
- Read Individual Blog Posts
- Add and Delete Comments
- User Profile Dashboard
- Protected Routes
- Responsive User Interface
- RESTful API with MongoDB

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js




## API Endpoints

### Authentication
- POST `/api/users/register`
- POST `/api/users/login`
- GET `/api/users/profile`

### Posts
- GET `/api/posts`
- GET `/api/posts/:id`
- POST `/api/posts`
- PUT `/api/posts/:id`
- DELETE `/api/posts/:id`

### Comments
- GET `/api/comments/:postId`
- POST `/api/comments/:postId`
- DELETE `/api/comments/:commentId`

## Author

**Nidhi Khandaskar**



---

This project was developed as part of my Full Stack Web Development internship to practice building a complete MERN application with authentication, CRUD operations, REST APIs, and database integration.
