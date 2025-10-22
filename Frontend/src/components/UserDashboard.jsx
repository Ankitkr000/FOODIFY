import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

const UserDashboard = () => {
  const userCity = useSelector((state) => state.user.city) //📌
  const [allShopsData, setAllShopsData] = useState([])

  const SERVER_URL=import.meta.env.VITE_SERVER_URL


  useEffect(() => {
    const fetchShop = async () => {
      const res = await axios.post(
        `${SERVER_URL}/api/shop/show-shop-to-user`, //📌
        { userCity },// 📌
        { withCredentials: true } 
      )
      console.log(res?.data)
      setAllShopsData(res?.data?.allShops || [])
    }
    fetchShop()
  }, [userCity])

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 font-mono">
      <div className="max-w-4xl mx-auto">
        {/* Top left heading */}
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-extrabold text-black tracking-wide">UserDashboard</h2>
        </div>
        <h1 className="text-4xl font-extrabold text-black mb-8 text-center tracking-wide">
          Restaurants in <span className="text-indigo-600">{userCity || "your city"}</span>
        </h1>
        {allShopsData.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-20">
            No restaurants found in your city.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {allShopsData.map((shop, idx) => (
              <div
                key={shop._id || idx}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col items-center hover:shadow-2xl transition"
              >
                <img
                  src={shop.shopImage}
                  alt={shop.name}
                  className="w-48 h-48 object-cover rounded-xl border-4 border-white shadow mb-4"
                />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{shop.name}</h2>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold">City:</span> {shop.city}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold">State:</span> {shop.state}
                </p>
                <p className="text-gray-600 mb-3 text-center">
                  <span className="font-semibold">Address:</span> {shop.address}
                </p>
                {/* You can add a button for viewing menu or ordering here */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserDashboard