# 🍔 FOODIFY - Food Delivery Platform

<div align="center">
  
![FOODIFY Banner](https://img.shields.io/badge/FOODIFY-Food%20Delivery%20Platform-orange?style=for-the-badge)

**A modern, full-stack food delivery platform for seamless ordering and real-time tracking**

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v18+-blue)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v6+-green)](https://www.mongodb.com/)

[Live Demo](#) | [Report Bug](#) | [Request Feature](#)

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 About

**FOODIFY** is a comprehensive food delivery platform that connects three key stakeholders:

- 🍽️ **Customers** - Browse restaurants, order food, and track deliveries in real-time
- 🏪 **Restaurant Owners** - Manage menu items, track orders, and grow their business
- 🚴 **Delivery Partners** - Accept orders, earn money with flexible working hours

Built with modern web technologies, FOODIFY offers a seamless experience across all user roles with features like real-time location tracking, secure payments, and an intuitive dashboard for each user type.

---

## ✨ Features

### For Customers 🍽️
- 🔍 Browse restaurants by location (auto-detected via Geolocation API)
- 🛒 Order food from your favorite restaurants
- 📍 Real-time order tracking
- 💳 Secure payment integration
- ⭐ Rate and review restaurants
- 🔔 Order notifications

### For Restaurant Owners 🏪
- 📝 Register and manage restaurant profile
- 🍕 Add, edit, and delete menu items
- 📊 View order history and analytics
- 🖼️ Upload restaurant and food images (Cloudinary)
- ✅ Accept/reject orders
- 📈 Track business performance

### For Delivery Partners 🚴
- 📦 View available delivery orders
- 🗺️ Navigate to pickup and delivery locations
- 💰 Track earnings
- ⏰ Flexible working hours
- 📱 Real-time order updates

### General Features 🌟
- 🔐 Secure authentication with JWT
- 🔥 Firebase Google OAuth integration
- 📧 OTP-based password recovery
- 🌍 Geolocation-based restaurant discovery
- 📱 Fully responsive design
- 🎨 Modern, elegant UI with Tailwind CSS
- 🚀 Fast and optimized performance

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18+ with Vite
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM v6
- **Styling:** Tailwind CSS
- **Authentication:** Firebase Auth (Google OAuth)
- **HTTP Client:** Axios
- **Location Services:** Geoapify API
- **Build Tool:** Vite

### Backend
- **Runtime:** Node.js (v18+)
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT & Cookie-based sessions
- **File Upload:** Multer + Cloudinary
- **Email Service:** Nodemailer
- **Security:** bcrypt, CORS, cookie-parser
- **Environment:** dotenv

### Tools & Services
- **Version Control:** Git & GitHub
- **Image Storage:** Cloudinary
- **Deployment:** Render (Backend), Vercel (Frontend)
- **API Testing:** Postman
- **Geolocation:** Geoapify API

---

## 📁 Project Structure

```
FOODIFY/
├── Backend/
│   ├── Controllers/        # Business logic
│   │   ├── auth.controller.js
│   │   ├── shop.controller.js
│   │   ├── item.controller.js
│   │   └── user.controller.js
│   ├── Models/            # MongoDB schemas
│   │   ├── user.model.js
│   │   ├── shop.model.js
│   │   └── item.model.js
│   ├── Routes/            # API routes
│   │   ├── auth.routes.js
│   │   ├── shop.routes.js
│   │   ├── item.routes.js
│   │   └── user.routes.js
│   ├── Middleware/        # Custom middleware
│   │   ├── auth.middleware.js
│   │   └── multer.middleware.js
│   ├── utils/             # Utility functions
│   │   ├── cloudinary.js
│   │   └── mail.js
│   ├── config/            # Configuration
│   │   └── db.js
│   ├── .env.example       # Environment variables template
│   └── index.js           # Entry point
│
└── Frontend/
    ├── src/
    │   ├── components/    # Reusable components
    │   │   ├── Nav.jsx
    │   │   ├── UserDashboard.jsx
    │   │   ├── OwnerDashboard.jsx
    │   │   ├── DeliveryBoy.jsx
    │   │   ├── OwnerItemCard.jsx
    │   │   └── EditFoodItemModal.jsx
    │   ├── pages/         # Page components
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── SignUp.jsx
    │   │   ├── RegisterShop.jsx
    │   │   ├── AddFoodItem.jsx
    │   │   └── ForgotPassword.jsx
    │   ├── redux/         # State management
    │   │   ├── store.js
    │   │   ├── userSlice.js
    │   │   └── ownerSlice.js
    │   ├── hooks/         # Custom React hooks
    │   │   ├── useGetCity.jsx
    │   │   └── useGetMyShop.jsx
    │   ├── App.jsx        # Main app component
    │   └── main.jsx       # Entry point
    ├── firebase.js        # Firebase config
    ├── vite.config.js     # Vite configuration
    ├── vercel.json        # Vercel deployment config
    └── .env.example       # Environment variables template
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB
- Cloudinary account
- Firebase project (for Google OAuth)
- Geoapify API key

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/yourusername/foodify.git
cd foodify
```

#### 2. Setup Backend

```bash
cd Backend
npm install
```

Create a `.env` file in the Backend directory:

```env
PORT=8000
NODE_ENV=development

MONGO_URL=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key

EMAIL=your_email@gmail.com
PASS=your_email_app_password

CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
```

Start the backend server:

```bash
npm start
# or for development with auto-reload
npm run dev
```

#### 3. Setup Frontend

```bash
cd ../Frontend
npm install
```

Create a `.env` file in the Frontend directory:

```env
VITE_FIREBASE_APIKEY=your_firebase_api_key
VITE_GEOAPIFY=your_geoapify_api_key
VITE_SERVER_URL=http://localhost:8000
```

Start the development server:

```bash
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000`

---

## 🔐 Environment Variables

### Backend (.env)

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 8000) |
| `NODE_ENV` | Environment (development/production) |
| `MONGO_URL` | MongoDB connection string |
| `SECRET_KEY` | JWT secret key |
| `EMAIL` | Email for sending OTPs |
| `PASS` | Email app password |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_NAME` | Cloudinary cloud name |
| `CLOUDINARY_SECRET_KEY` | Cloudinary secret key |

### Frontend (.env)

| Variable | Description |
|----------|-------------|
| `VITE_FIREBASE_APIKEY` | Firebase API key |
| `VITE_GEOAPIFY` | Geoapify API key for location services |
| `VITE_SERVER_URL` | Backend API URL |

---

## 📡 API Documentation

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/signup` | Register new user | No |
| POST | `/login` | User login | No |
| POST | `/send-otp` | Send password reset OTP | No |
| POST | `/verify-otp` | Verify OTP and reset password | No |
| GET | `/logout` | User logout | Yes |

### Shop Routes (`/api/shop`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register-shop` | Register new restaurant | Yes (Owner) |
| PUT | `/edit-shop` | Edit restaurant details | Yes (Owner) |
| GET | `/get-my-shop` | Get owner's restaurant | Yes (Owner) |
| POST | `/show-shop-to-user` | Get restaurants by city | Yes (User) |

### Item Routes (`/api/item`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/add-item` | Add new food item | Yes (Owner) |
| POST | `/edit-item/:id` | Edit food item | Yes (Owner) |
| DELETE | `/delete-item/:id` | Delete food item | Yes (Owner) |

### User Routes (`/api/user`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/profile` | Get user profile | Yes |
| PUT | `/update-profile` | Update user profile | Yes |

---

## 📸 Screenshots

### Landing Page
![Landing Page](https://via.placeholder.com/800x400?text=Landing+Page)

### User Dashboard
![User Dashboard](https://via.placeholder.com/800x400?text=User+Dashboard)

### Owner Dashboard
![Owner Dashboard](https://via.placeholder.com/800x400?text=Owner+Dashboard)

### Restaurant Management
![Restaurant Management](https://via.placeholder.com/800x400?text=Restaurant+Management)

---

## 🌐 Deployment

### Backend Deployment (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add environment variables from `.env.example`
5. Deploy

### Frontend Deployment (Vercel)

1. Connect your GitHub repository to Vercel
2. Configure:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Add environment variables from `.env.example`
4. Deploy

**Important:** Update `VITE_SERVER_URL` in frontend to your deployed backend URL.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Ankit Kumar**

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: ankitkr1001a@gmail.com

---

## 🙏 Acknowledgments

- Firebase for authentication
- Cloudinary for image hosting
- Geoapify for location services
- All open-source contributors

---

## 📞 Support

For support, email ankitkr1001a@gmail.com or create an issue in the repository.

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by Ankit Kumar

</div>