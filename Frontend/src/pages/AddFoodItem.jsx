import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setShopData } from "../redux/ownerSlice";

const AddFoodItem = () => {
  const [name, setName] = useState("");
  const [foodType, setFoodType] = useState("veg");
  const [price, setPrice] = useState(0);
  const [categories, setCategories] = useState("Snacks");
  const [foodImage, setFoodImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const navigate = useNavigate();
  const dispatch=useDispatch()

  const SERVER_URL=import.meta.env.VITE_SERVER_URL


  const categoryOptions = [
    "Snacks", "Desserts", "Main Course", "Pizza", "Burgers", "Sandwiches",
    "South Indians", "North Indians", "Fast Food", "Other"
  ];

  const handleImageChange = (e) => {
    setFoodImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");

    if (!name || !foodType || !price || !categories || !foodImage) {
      setErr("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("foodType", foodType);
      formData.append("price", price);
      formData.append("categories", categories);
      formData.append("foodImage", foodImage);

      const res = await axios.post(
        `${SERVER_URL}/api/item/add-item`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

if (res.data.success) {
  alert("Food item added successfully");
  try {
    const shopRes = await axios.get(`${SERVER_URL}/api/shop/get-my-shop`, { withCredentials: true }); //📌📌📌
    dispatch(setShopData(shopRes.data));
  } catch (fetchErr) {

    console.error("Failed to fetch updated shop data", fetchErr);
  }
  navigate("/");
} else {
        setErr(res.data.message || "Failed to add food item.");
      }
    } catch (error) {
      setErr(error.response?.data?.message || "Failed to add food item.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 font-mono">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h1 className="text-3xl font-extrabold text-black mb-8 text-center tracking-wide">
          Add Food Item
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-black mb-2">
              Name
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
              Food Type
            </label>
            <select
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
              className="w-full px-4 py-3 border border-black rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none text-black bg-white transition"
              required
            >
              <option value="veg">Veg</option>
              <option value="non-veg">Non-Veg</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-semibold text-black mb-2">
              Price
            </label>
            <input
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-3 border border-black rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none text-black bg-white transition"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-black mb-2">
              Category
            </label>
            <select
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              className="w-full px-4 py-3 border border-black rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none text-black bg-white transition"
              required
            >
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-lg font-semibold text-black mb-2">
              Food Image
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
            {loading ? "Adding..." : "Add Food Item"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFoodItem;