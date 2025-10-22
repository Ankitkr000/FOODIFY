import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OwnerItemCard from './OwnerItemCard';
import EditFoodItemModal from './EditFoodItemModal';

const OwnerDashboard = () => {
  const shopData = useSelector((state) => state.owner.shopData);
  const navigate = useNavigate();
  const foodItems = shopData?.shopExist?.foodItems || [];

  // State for handling the edit modal
  const [editingItem, setEditingItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEditClick = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 font-mono">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h1 className="text-3xl font-extrabold text-black mb-8 text-center tracking-wide">
          Owner Dashboard
        </h1>

        {!shopData ? (
          <div className="flex flex-col items-center justify-center py-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add Your Restaurant</h2>
            <p className="mb-6 text-gray-600 text-center">
              You have not added your restaurant yet. Click below to get started!
            </p>
            <button
              className="px-6 py-3 rounded-xl bg-black text-white font-bold text-lg shadow hover:bg-gray-900 transition"
              onClick={() => navigate("/register-shop")}
            >
              + Add Restaurant
            </button>
          </div>
        ) : (
          <div className="bg-gray-100 rounded-xl p-8 flex flex-col gap-8">
            {/* Restaurant Image */}
            {shopData?.shopExist?.shopImage && (
              <div className="flex flex-col items-center mb-6">
                <img
                  src={shopData.shopExist.shopImage}
                  alt="Restaurant"
                  className="rounded-2xl w-56 h-56 object-cover border-4 border-white shadow-lg mb-4"
                />
              </div>
            )}

            {/* Restaurant Info */}
            <div className="flex flex-col items-center gap-2 mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your Restaurant</h2>
              <p className="text-lg">
                <span className="font-bold">Name:</span> {shopData?.shopExist?.name}
              </p>
              <p className="text-lg">
                <span className="font-bold">City:</span> {shopData?.shopExist?.city}
              </p>
              <p className="text-lg">
                <span className="font-bold">State:</span> {shopData?.shopExist?.state}
              </p>
              <p className="text-lg">
                <span className="font-bold">Address:</span> {shopData?.shopExist?.address}
              </p>
            </div>

            {/* Food Items Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Food Items</h3>
                {foodItems.length > 0 && (
                  <button
                    className="px-4 py-2 rounded-lg bg-black text-white font-semibold hover:bg-gray-900 transition"
                    onClick={() => navigate("/add-foodItem")}
                  >
                    + Add Food Item
                  </button>
                )}
              </div>

              {foodItems.length === 0 ? (
                <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <p className="text-gray-600 mb-4">No food items added yet.</p>
                  <button
                    className="px-5 py-2 rounded-lg bg-black text-white font-semibold hover:bg-gray-900 transition"
                    onClick={() => navigate("/add-food-item")}
                  >
                    Add Your First Item
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {foodItems.map((item, idx) => (
                    <OwnerItemCard
                      key={item?._id || idx}
                      foodItem={item}
                      // Pass an onEdit handler to be called when the Edit button is clicked
                      onEdit={() => handleEditClick(item)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Render the edit modal when showModal is true */}
        {showModal && editingItem && (
          <EditFoodItemModal foodItem={editingItem} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;