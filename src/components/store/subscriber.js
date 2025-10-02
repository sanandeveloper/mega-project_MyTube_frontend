import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const userSubscribed=createAsyncThunk("subscriber",async(channelId)=>{


    try {
        const token=localStorage.getItem('accessToken')

        const response= await axios.post(`http://localhost:8000/api/v1/subscriber/${channelId}`,{},
            {
                headers:{
                    Authorization:token
                }
             
            }
        )
        console.log("subscribed.data,",response.data)
        return response.data?.data.totalSubscriber
    } catch (error) {
        console.log("somethimng went wrong")
    }

})

export const userUnsubscribed=createAsyncThunk("unsubscribed",async(channelId)=>{

    try {

        const token =localStorage.getItem("accessToken")
        const response= await axios.delete(`http://localhost:8000/api/v1/subscriber/delete/${channelId}`,{

            headers:{
                Authorization:token
            }
        })

        return true 
    } catch (error) {
        console.log("something went wrong",error)
    }

}) 


const initialState={
    subscriber:null,
    error:null
}


const subscriberData=createSlice(
    {
        name:"subs",
        initialState,
        extraReducers:(builder)=>{
          builder
          .addCase(userSubscribed.fulfilled,(state,action)=>{

            state.subscriber=action.payload
            console.log("subscriber total",state.subscriber)
          })

        }
    }
)

export default subscriberData