import React, { useState } from "react";
import axios from "axios";

import { setShopData } from "../redux/ownerSlice"; 
import { useDispatch } from "react-redux";

const EditFoodItemModal = ({ foodItem, onClose }) => {
  const [name, setName] = useState(foodItem.name || "");
  const [foodType, setFoodType] = useState(foodItem.foodType || "veg");
  const [price, setPrice] = useState(foodItem.price || "");
  const [categories, setCategories] = useState(foodItem.categories || "");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const dispatch = useDispatch();

  const SERVER_URL=import.meta.env.VITE_SERVER_URL


  const categoryOptions = [
    "Snacks", "Desserts", "Main Course", "Pizza", "Burgers", "Sandwiches",
    "South Indians", "North Indians", "Fast Food", "Other"
  ];

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setErr("");

  try {
    const res = await axios.post(
      `${SERVER_URL}/api/item/edit-item/${foodItem._id}`,
      { name, foodType, price, categories },
      { withCredentials: true }
    );

    if (res.data.success) {
      // Fetch updated shop data and update Redux
      try {
        const shopRes = await axios.get(`${SERVER_URL}/api/shop/get-my-shop`, { withCredentials: true });
        dispatch(setShopData(shopRes.data));
      } catch (fetchErr) {
        console.error("Failed to fetch updated shop data", fetchErr);
      }
      alert("Food item updated successfully!");
      onClose();
    } else {
      setErr(res.data.message || "Failed to edit food item.");
    }
  } catch (error) {
    setErr(error.response?.data?.message || "Failed to edit food item.");
  }
  setLoading(false);
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-black text-white p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Edit Food Item</h2>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Food Image Preview */}
          {foodItem?.foodImage && (
            <div className="flex justify-center mb-6">
              <img
                src={foodItem.foodImage}
                alt={foodItem.name}
                className="w-24 h-24 rounded-2xl object-cover border-4 border-gray-200 shadow-lg"
              />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Food Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                placeholder="Enter food name"
                required
              />
            </div>

            {/* Food Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Food Type
              </label>
              <select
                value={foodType}
                onChange={e => setFoodType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                required
              >
                <option value="veg">🌱 Vegetarian</option>
                <option value="non-veg">🍖 Non-Vegetarian</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price (₹)
              </label>
              <input
                type="number"
                min="0"
                value={price}
                onChange={e => setPrice(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                placeholder="Enter price"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                value={categories}
                onChange={e => setCategories(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                required
              >
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Error Message */}
            {err && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                <p className="text-red-600 text-sm font-medium">{err}</p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                className="flex-1 py-3 px-4 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition disabled:opacity-50"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-900 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </div>
                ) : (
                  "Update Item"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditFoodItemModal;