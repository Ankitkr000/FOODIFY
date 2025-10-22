import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Nav = () => {
    const city = useSelector((state) => state.user.city)
    const userData = useSelector((state) => state.user.userData)
    const role = userData?.userExist?.role
    const navigate = useNavigate()

    const shopData=useSelector((state)=>state.owner.shopData)

    // Hardcoded order count for now
    const orderCount = 7

    return (
        <nav className="bg-white shadow flex items-center justify-between px-8 py-4 font-mono">
            <div className="flex items-center gap-6">
                <span className="text-2xl font-extrabold text-black tracking-wide">FOODIE</span>
                <span className="text-xl font-semibold text-gray-700">City: {city || "Unknown"}</span>
            </div>
            {role === "owner" && (
                <div className="flex gap-4 items-center">

                    {
                         shopData && <>
                        
                            <button
                                className="px-5 py-2 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition"
                                onClick={() => navigate("/add-foodItem")}
                            >
                                + Add Food Item
                            </button>
                        </>
                    }


                    <div className="relative">
                        <button
                            className="px-5 py-2 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition"
                            onClick={() => navigate("/owner-orders")}
                        >
                            My Orders
                        </button>
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                            {orderCount}
                        </span>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Nav