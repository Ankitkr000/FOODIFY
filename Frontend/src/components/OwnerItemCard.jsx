import React from 'react';

const OwnerItemCard = ({ foodItem, onEdit }) => {
  return (
    <div className="flex items-center gap-6 bg-white p-4 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 border-gray-200">
        {foodItem?.foodImage ? (
          <img src={foodItem.foodImage} alt={foodItem.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      
      <div className="flex-1">
        <h4 className="text-lg font-bold text-gray-800">{foodItem.name}</h4>
        {foodItem.categories && (
          <p className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-lg inline-block mt-1">
            {foodItem.categories}
          </p>
        )}
        {foodItem.foodType && (
          <p className="text-xs text-gray-500 mt-1">
            {foodItem.foodType === 'veg' ? '🌱 Vegetarian' : '🍖 Non-Vegetarian'}
          </p>
        )}
      </div>
      
      <div className="text-right flex flex-col items-end gap-2">
        {foodItem.price !== null ? (
          <p className="text-xl font-bold text-gray-800">₹{foodItem.price}</p>
        ) : (
          <p className="text-sm text-gray-500">Price N/A</p>
        )}
        <button
          onClick={onEdit}
          className="bg-gradient-to-r from-gray-800 to-black text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-black hover:to-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          ✏️ Edit
        </button>
      </div>
    </div>
  );
};

export default OwnerItemCard;