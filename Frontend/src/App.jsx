import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import { Routes, Route } from "react-router-dom"
import ForgotPassword from "./pages/ForgotPassword"
import Home from "./pages/Home"
import useGetCity from "./hooks/useGetCity"
import Nav from "./components/Nav"
import useGetMyShop from "./hooks/useGetMyShop"
import RegisterShop from "./pages/RegisterShop"
import AddFoodItem from "./pages/AddFoodItem"
import UserDashboard from "./components/UserDashboard"
import OwnerDashboard from "./components/OwnerDashboard"
import DeliveryBoy from "./components/DeliveryBoy"

function App() {
  useGetCity()
  useGetMyShop()
  
  return (
    <>
    {location.pathname !== "/" && <Nav />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes - Based on User Role */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        <Route path="/delivery-dashboard" element={<DeliveryBoy />} />

        {/* Owner Routes */}
        <Route path="/register-shop" element={<RegisterShop />} />
        <Route path="/add-food-item" element={<AddFoodItem />} />
      </Routes>
    </>
  )
}

export default App