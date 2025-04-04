# MERN E-Commerce Platform

A full-stack e-commerce platform built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js) that supports user authentication, seller management, product listings, real-time chat, and secure payment processing.

---

## **Features**
- **User**: Browse products, manage cart, checkout with Stripe, and track orders.
- **Seller**: Manage products, orders, and earnings via a dashboard.
- **Admin**: Oversee users, sellers, orders, and products.
- **Real-Time Chat**: Communication between users and sellers.
- **Secure Payments**: Integrated with Stripe for payment processing.

---

## **Tech Stack**
- **Frontend**: React.js, Redux, Tailwind CSS, React Router.
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, Nodemailer.
- **Real-Time**: Socket.io for chat functionality.
- **Payment**: Stripe API for secure transactions.

---

## **Installation**

### **Backend**
1. Navigate to the `backend` folder:
   ```bash
   cd backend
2. Install dependencies
   npm install
3. Create a .env file with the following
  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET_KEY=your_jwt_secret
  JWT_EXPIRES=7d
  SMTP_HOST=smtp.your-email-provider.com
  SMTP_PORT=587
  SMTP_SERVICE=your-email-service
  SMTP_MAIL=your-email@example.com
  SMTP_PASSWORD=your-email-password
  STRIPE_API_KEY=your_stripe_api_key
  STRIPE_SECRET_KEY=your_stripe_secret_key
4. Start the Server
   npm start

### **Frontend**
1. Navigate to the frontend folder:
  cd frontend
2. Install dependencies:
   npm install
3. Create a .env file with
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
4. Start the development Server:
   npm start

### **Socket**
1.Navigate to the socket folder:
   cd socket
2. Install dependencies
   npm install
3. .env file
   PORT = 4000
4. Start the Server
   npm start
