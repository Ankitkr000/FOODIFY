import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { ClipLoader } from "react-spinners"

const ForgotPassword = () => {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [otp, setOTP] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [err, setErr] = useState("")

  const [loadingSendOTP, setLoadingSendOTP] = useState(false)
  const [loadingVerifyOTP, setLoadingVerifyOTP] = useState(false)
  const [loadingChangePassword, setLoadingChangePassword] = useState(false)
  const [loadingBack, setLoadingBack] = useState(false)

  const navigate = useNavigate()

  const SERVER_URL=import.meta.env.VITE_SERVER_URL


  const handleSendOTP = async () => {
    setLoadingSendOTP(true)
    try {
      const res=await axios.post(`${SERVER_URL}/api/auth/send-otp`, { email })
      console.log("FROM SEND OTP FRONTEND :",res)
      alert("OTP sent!")
      setErr("")
      setStep(2)
    } catch (error) {
      console.error("ERROR IN SEND-OTP", error)
      setErr(error.response?.data?.message)
    }
    setLoadingSendOTP(false)
  }
  const verifyOTP = async () => {
    setLoadingVerifyOTP(true)
    try {
      await axios.post(`${SERVER_URL}/api/auth/verify-otp`, { email, otp })
      alert("verifyOTP")
      setStep(3)
    } catch (error) {
      setErr(error.response?.data?.message)
    }
    setLoadingVerifyOTP(false)
  }
  const changePassword = async () => {
    setLoadingChangePassword(true)
    try {
      if (newPassword === confirmPassword) {
        await axios.post(`${SERVER_URL}/api/auth/reset-password`, { email, confirmPassword })
        alert("Password has been Changed ✅")
        setErr("")
        navigate("/login")
      } else {
        alert("Password not matched")
        setLoadingChangePassword(false)
        return null
      }
    } catch (error) {
      console.error("ERROR IN RESET-PASSWORD", error)
      setErr(error.response?.data?.message)
    }
    setLoadingChangePassword(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-mono">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-xl px-8 py-10">
        <h1 className="text-3xl font-extrabold text-black mb-8 text-center tracking-wide">Forgot Password</h1>

        {step === 1 && (
          <div>
            <label className="block text-lg font-semibold text-black mb-2">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-black rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none text-black bg-white mb-4 transition"
              required
            />
            <button
              className={`w-full py-3 rounded-xl font-bold text-lg shadow mb-2 transition
                ${loadingSendOTP ? "bg-gray-400 text-white cursor-not-allowed" : "bg-black text-white hover:bg-gray-900 cursor-pointer"}`}
              onClick={handleSendOTP}
              disabled={loadingSendOTP}
            >
              {loadingSendOTP ? <ClipLoader size={20} color='white' /> : "Send OTP"}
            </button>
            <p className="text-red-600 font-bold text-center mt-2">{err}</p>
          </div>
        )}

        {step === 2 && (
          <div>
            <label className="block text-lg font-semibold text-black mb-2">Enter OTP</label>
            <input
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              className="w-full px-4 py-3 border border-black rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none text-black bg-white mb-4 transition"
              required
            />
            <button
              className={`w-full py-3 rounded-xl font-bold text-lg shadow mb-2 transition
                ${loadingVerifyOTP ? "bg-gray-400 text-white cursor-not-allowed" : "bg-black text-white hover:bg-gray-900 cursor-pointer"}`}
              onClick={verifyOTP}
              disabled={loadingVerifyOTP}
            >
              {loadingVerifyOTP ? <ClipLoader size={20} color='white' /> : "Verify OTP"}
            </button>
            <p className="text-red-600 font-bold text-center mt-2">{err}</p>
          </div>
        )}

        {step === 3 && (
          <div>
            <label className="block text-lg font-semibold text-black mb-2">New Password</label>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 border border-black rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none text-black bg-white mb-4 transition"
              required
            />
            <label className="block text-lg font-semibold text-black mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-black rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none text-black bg-white mb-4 transition"
              required
            />
            <button
              className={`w-full py-3 rounded-xl font-bold text-lg shadow mb-2 transition
                ${loadingChangePassword ? "bg-gray-400 text-white cursor-not-allowed" : "bg-black text-white hover:bg-gray-900 cursor-pointer"}`}
              onClick={changePassword}
              disabled={loadingChangePassword}
            >
              {loadingChangePassword ? <ClipLoader size={20} color='white' /> : "Reset Password"}
            </button>
            <p className="text-red-600 font-bold text-center mt-2">{err}</p>
          </div>
        )}

        <button
          className={`w-full py-2 mt-2 rounded-xl font-bold text-lg shadow transition
            ${loadingBack ? "bg-gray-400 text-black cursor-not-allowed" : "bg-white text-black border border-black hover:bg-gray-100 cursor-pointer"}`}
          onClick={() => {
            setLoadingBack(true);
            navigate(-1);
          }}
          disabled={loadingBack}
        >
          {loadingBack ? <ClipLoader size={20} color='black' /> : "Back"}
        </button>
      </div>
    </div>
  )
}

export default ForgotPassword