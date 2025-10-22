import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setShopData } from "../redux/ownerSlice";

const RegisterShop = () => {
    const CITY=useSelector((state)=>state.user.city)
    const STATE=useSelector((state)=>state.user.state)
    const ADDRESS=useSelector((state)=>state.user.address)

  const [name, setName] = useState("");
  const [city, setCity] = useState(CITY || "");
  const [state, setState] = useState(STATE || "");
  const [address, setAddress] = useState(ADDRESS || "");
  const [shopImage, setShopImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const SERVER_URL=import.meta.env.VITE_SERVER_URL


  const handleImageChange = (e) => {
    setShopImage(e.target.files[0]);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");

    if (!name || !city || !state || !address || !shopImage) {
      setErr("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("address", address);
      formData.append("shopImage", shopImage);

      const res = await axios.post(
        `${SERVER_URL}/api/shop/register-shop`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.success) {
        alert("Shop Register successfully")
        console.log("FROM REGISTER SHOP FROM FRONTEND :",res.data)
        dispatch(setShopData(res.data.newShop));   //📌
        navigate("/");
      } else {
        setErr(res.data.message || "Failed to register shop.");
      }
    } catch (error) {
      setErr(error.response?.data?.message || "Failed to register shop.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 font-mono">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h1 className="text-3xl font-extrabold text-black mb-8 text-center tracking-wide">
          Register Your Restaurant
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-black mb-2">
              Restaurant Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-black rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none text-black bg-white transition"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-black mb-2">
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-3 border border-black rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none text-black bg-white transition"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-black mb-2">
              State
            </label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-4 py-3 border border-black rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none text-black bg-white transition"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-black mb-2">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-3 border border-black rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none text-black bg-white transition"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-black mb-2">
              Restaurant Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
              required
            />
          </div>
          {err && (
            <p className="text-red-600 font-bold text-center mt-2">{err}</p>
          )}
          <button
            type="submit"
            className={`w-full py-3 rounded-xl font-bold text-lg shadow transition ${
              loading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-900 cursor-pointer"
            }`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register Restaurant"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterShop;