import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:null,
        city:null,
        state:null,
        address:null
        },
    reducers:{
        setUserData:(state,action)=>{
            state.userData=action.payload
        },
        setUserCity:(state,action)=>{
            state.city=action.payload
        },
        setUserState:(state,action)=>{
            state.state=action.payload
        },
        setUserAddress:(state,action)=>{
            state.address=action.payload
        }
    }
})


export default userSlice.reducer;
export const {setUserData,setUserCity,setUserState,setUserAddress}=userSlice.actions
