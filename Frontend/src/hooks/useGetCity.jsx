import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUserCity,setUserState,setUserAddress } from '../redux/userSlice'

const useGetCity = () => {
    const geoAPIKEY=import.meta.env.VITE_GEOAPIFY
   

    const dispatch=useDispatch()
    const userData=useSelector((state)=>state.user.userData)
    useEffect(()=>{

        navigator.geolocation.getCurrentPosition(async(position)=>{
            console.log(position)
            let longitude=position.coords.longitude
            let latitude=position.coords.latitude
            
            console.log(longitude)
            console.log(latitude)   

            const res=await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${geoAPIKEY}`)
            console.log("RESPONSE: ",res)
            console.log("RESPONSE: ",res?.data?.features[0]?.properties?.city)
            dispatch(setUserCity(res?.data?.features[0]?.properties?.city))
            dispatch(setUserState(res?.data?.features[0]?.properties?.state))
            dispatch(setUserAddress(res?.data?.features[0]?.properties?.address_line1))
        })


    },[userData])   
//   return ()
}

export default useGetCity
