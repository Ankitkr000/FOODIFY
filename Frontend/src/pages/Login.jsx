import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loadingNormal, setLoadingNormal] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [err, setErr] = useState("");


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const SERVER_URL=import.meta.env.VITE_SERVER_URL


  const handleGoogleAuthLogin = async () => {
    setLoadingGoogle(true);

    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log("LOGIN GOOGLE AUTH", result);

    try {
      const response = await axios.post(
        `${SERVER_URL}/api/auth/google-auth`,
        { name: result.user.displayName, email: result.user.email },
        { withCredentials: true }
      );
      console.log(response);

      alert(response.data.message);
      if (response.data.success) {
        setErr("");
        setLoadingGoogle(false);
      }
    } catch (error) {
      console.error("ERROR IN LOGIN GOOGLE AUTH :", error);
      setErr(error.response?.data?.message);
      setLoadingGoogle(false);
    }
  };

  const handleSubmit = async (e) => {
  setLoadingNormal(true);
  e.preventDefault();

  try {
    const res = await axios.post(
      `${SERVER_URL}/api/auth/login`,
      { email, password },
      { 
        headers: { "Content-Type": "application/json" }, 
        withCredentials: true 
      }
    );

    if (res.data.success) {
      // Dispatch user data to Redux
      dispatch(setUserData(res.data));
      alert(res.data.message);
      console.log(res.data);
      setErr("");

      // Get user role and redirect accordingly
      const userRole = res.data?.userExist?.role;

      if (userRole === "user") {
        navigate("/user-dashboard");
      } else if (userRole === "owner") {
        navigate("/owner-dashboard");
      } else if (userRole === "deliveryBoy") {
        navigate("/delivery-dashboard");
      } else {
        navigate("/"); // Default redirect if role doesn't match
      }
      
      setLoadingNormal(false);
    } else {
      setErr(res.data.message);
      setLoadingNormal(false);
    }
  } catch (error) {
    alert(error.response?.data?.message || "Something went wrong");
    setErr(error.response?.data?.message);
    setLoadingNormal(false);
  }
};
  // Autofill handlers
  const autofill = (autofillEmail) => {
    setEmail(autofillEmail);
    setPassword("hello1");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white font-mono">
      <div className="bg-white px-8 py-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-black mb-8 text-center tracking-wide">
          Login
        </h1>

        {/* Autofill Divs */}
        <div className="flex gap-4 mb-4">
          <div
            className="flex-1 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-2 text-center font-semibold border border-gray-300 transition"
            onClick={() => autofill("ankit@gmail.com")}
          >
            ankit@gmail.com
          </div>
          <div
            className="flex-1 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-2 text-center font-semibold border border-gray-300 transition"
            onClick={() => autofill("zack@gmail.com")}
          >
            zack@gmail.com
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-lg font-semibold text-black mb-2">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-black rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none text-black bg-white mb-2 transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-lg font-semibold text-black mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-black rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none text-black bg-white mb-2 transition"
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right mb-2">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-gray-600 hover:text-black transition font-semibold"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded-xl font-bold text-lg shadow
                      hover:bg-gray-900 transition mb-2 cursor-pointer
                      disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={loadingNormal}
          >
            {loadingNormal ? <ClipLoader size={20} /> : "Login"}
          </button>

          <button
            type="button"
            onClick={handleGoogleAuthLogin}
            className="w-full py-3 bg-black text-white rounded-xl font-bold text-lg shadow 
            hover:bg-gray-900 transition mb-2 cursor-pointer
            disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={loadingGoogle}
          >
            {loadingGoogle ? <ClipLoader size={20} /> : "Login With Google"}
          </button>

          <p className="text-red-600 font-bold text-center mt-2">{err}</p>
        </form>
      </div>
    </div>
  );
};

export default Login;