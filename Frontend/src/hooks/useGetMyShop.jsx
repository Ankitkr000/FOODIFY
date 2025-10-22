import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setShopData } from '../redux/ownerSlice'

const useGetMyShop = () => {
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.user.userData)

  const SERVER_URL=import.meta.env.VITE_SERVER_URL
  console.log(SERVER_URL)

    useEffect(() => {
        if (!userData) return; // Only fetch if user is logged in

        const fetchShop = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/api/shop/get-my-shop`, { withCredentials: true })
                console.log("FROM USEGETMYSHOP HOOK :", response)
                dispatch(setShopData(response.data)) //📌📌
            } catch (error) {
                console.log(error)
            }
        }
        fetchShop()
    }, [userData, dispatch,SERVER_URL])
}

export default useGetMyShop