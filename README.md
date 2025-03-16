# PingMe - Real-Time Messaging Application

PingMe is a modern real-time messaging application that allows users to communicate instantly. Built with a React frontend and Node.js backend, it provides a seamless messaging experience with features like real-time updates and user authentication.

## Features

- **Real-time messaging** using Socket.IO
- **User authentication** with JWT
- **Responsive design** with Tailwind CSS and DaisyUI
- **User profiles** with Cloudinary image storage
- **Message history** persistence with MongoDB

## Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Zustand** - State management
- **Socket.io-client** - Real-time communication
- **Tailwind CSS & DaisyUI** - Styling
- **Axios** - API requests
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB & Mongoose** - Database
- **Socket.IO** - Real-time communication
- **JWT & bcrypt** - Authentication
- **Cloudinary** - Image storage

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd PingMe
   ```

2. Install dependencies
   ```
   # Install root, frontend and backend dependencies
   npm install
   ```

3. Set up environment variables
   - Create a `.env` file in the backend directory with:
   ```
   PORT=8000
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   NODE_ENV=development
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-name>
   CLOUDINARY_API_KEY=<your-cloudinary-api-key>
   CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
   ```

4. Start the development servers
   ```
   # For frontend (in one terminal)
   cd frontend
   npm run dev
   
   # For backend (in another terminal)
   cd backend
   npm run dev
   ```

### Production Deployment

1. Build the application
   ```
   npm run build
   ```

2. Start the production server
   ```
   npm start
   ```

## Project Structure

```
PingMe/
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Zustand state management
│   │   ├── lib/            # Utility functions
│   │   └── constants/      # Constants and configurations
│   └── ...
├── backend/                # Express backend
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Express middleware
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── lib/            # Utility functions
│   │   └── seeds/          # Database seed data
│   └── ...
└── ...
```

## License

This project is licensed under the ISC License.

## Acknowledgments

- Socket.IO for real-time communication
- MongoDB for database storage
- Cloudinary for image management 