import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/axiosInstance";


export const registerUser=createAsyncThunk(
    "auth/register",
    async(formData,{rejecteWithValue})=>{
        try{
            const response=await api.post("/users/register",formData)
            return response.data
        }catch(error){
            return rejecteWithValue(error.response?.data?.message || "Erreur d'inscription")

    
        }

    }
)

const authSlice= createSlice({
    name:"auth",
    initialState:{
        user: JSON.parse(localStorage.getItem("user")) || null,
        token:localStorage.getItem("token") || null,
        loading:false,
        error:null
    },
    reducers:{ },
    extraReducers: (builder)=>{
        builder
            .addCase(registerUser.pending, (state)=>{
                state.loading= true
                state.error= null
            })
            .addCase(registerUser.fulfilled, (state)=>{
                state.loading=false
            })
            .addCase(registerUser.rejected,(state,action)=>{
                state.loading=false
                state.error=action.payload

            })
    }
})

export default authSlice.reducer