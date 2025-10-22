import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { ClipLoader } from "react-spinners";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("user");

  const [loadingNormal, setLoadingNormal] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const [err, setErr] = useState("");

  const SERVER_URL=import.meta.env.VITE_SERVER_URL
  console.log(SERVER_URL)

  const handleGoogleAuth = async () => {
    setLoadingGoogle(true);

    if (!mobile) {
      setLoadingGoogle(false);
      return setErr("Mobile no is required");
    }
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log(result);

    try {
      const response = await axios.post(
        `${SERVER_URL}/api/auth/google-auth`,
        {
          name: result.user.displayName,
          email: result.user.email,
          mobile,
          role,
        },
        { withCredentials: true }
      );

      console.log(response);
      if (response.data.success) {
        alert("new user added ");
        setErr("");
        setLoadingGoogle(false);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
      setErr(error.response?.data?.message);
      setLoadingGoogle(false);
    }
  };

  const handleSubmit = async (e) => {
    setLoadingNormal(true);
    e.preventDefault();

    try {
      const res = await axios.post(
        `${SERVER_URL}/api/auth/signup`,
        { name, email, password, mobile, role },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(res)
      alert(res.data.message);
      if (res.data.success) {
        setErr("");
        setLoadingNormal(false);
      }
    } catch (error) {
      console.log(error.response?.data?.message);
      setErr(error.response.data.message);
      setLoadingNormal(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none"
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none"
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none"
            required
          />

          {/* Mobile */}
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none"
            required
          />

          {/* Role Selection */}
          <div className="flex justify-between">
            {["user", "deliveryBoy", "owner"].map((r) => (
              <button
                type="button"
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 mx-1 py-2 rounded-lg border text-sm font-medium transition
                  ${
                    role === r
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
              >
                {r === "user" ? "User" : r === "deliveryBoy" ? "Delivery Boy" : "Owner"}
              </button>
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 rounded-lg ${
              loadingNormal
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800 cursor-pointer"
            }`}
            disabled={loadingNormal}
          >
            {loadingNormal ? <ClipLoader size={20} /> : "SignUp"}
          </button>

          <button
            type="button"
            onClick={handleGoogleAuth}
            className="w-full bg-black text-white py-2 rounded-lg 
              hover:bg-gray-800 transition cursor-pointer
              disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={loadingGoogle}
          >
            {loadingGoogle ? <ClipLoader size={20} /> : "Sign up with Google"}
          </button>

          <p className="text-red-600 font-bold text-center mt-2">{err}</p>
        </form>

        {/* Already have account */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-black hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;