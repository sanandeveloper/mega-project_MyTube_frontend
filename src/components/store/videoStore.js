import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const uploadedVideo = createAsyncThunk(
  "video-upload",
  async (data, { rejectWithValue }) => {
    console.log("data,", data);

    try {

      const token=localStorage.getItem("accessToken")
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("videoFile", data.video);
      formData.append("thumbnail", data.thumbnail);

      const response = await axios.post(
        "http://localhost:8000/api/v1/video/upload-video",
        formData,
        {

          headers:{
            Authorization:token
          }
        }
      );
      console.log("response", response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const getAllvideo=createAsyncThunk("get/video",async(_,{rejectWithValue})=>{


try {


  const response= await axios.get("http://localhost:8000/api/v1/video/get-video",{


    
  })

  console.log("response.data",response.data)

  return response.data?.data
} catch (error) {
  
}


})


export const playSingleVideo=createAsyncThunk("play/video",async(id,{rejectWithValue})=>{
try {

  
  const response= await axios.get(`http://localhost:8000/api/v1/video/${id}`,{
  })

  console.log("response.data",response.data?.data)

return response.data?.data
  
} catch (error) {
  
}


})


export const likeVideos=createAsyncThunk("like/video",async(id,{rejectWithValue})=>{

try {

  const token=localStorage.getItem("accessToken")
  const response=await axios.get(`http://localhost:8000/api/v1/video/like/${id}`,{

    headers:{
      Authorization:token
    }
  })
  console.log("responsezz .data",response.data.data?.likedVideo)
  return response.data.data?.likedVideo
  
} catch (error) {
  console.log("something went wrong",error)
}

})

export const deletelike=createAsyncThunk("like/video",async(id,{rejectWithValue})=>{

try {

  const token=localStorage.getItem("accessToken")
  const response=await axios.delete(`http://localhost:8000/api/v1/video/deletelike/${id}`,{

    headers:{
      Authorization:token
    }
  })
  console.log("delete like data .data",response.data)
  return response.data
  
} catch (error) {
  console.log(" something went wrong in delete like",error)
}

})




const initialState={

    videos:[],
    likeVideo:[],
    singleVideo:null,
    loading:false,
    error:null
}



const videoStore=createSlice(
  {
    name:"video",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
      builder
      .addCase(uploadedVideo.pending,(state)=>{

        state.loading=true 
        state.error=null
      }
      )
      .addCase(uploadedVideo.fulfilled,(state)=>{

        state.loading=false
      })
      .addCase(getAllvideo.pending,(state)=>{
            state.loading=true
      })
      .addCase(getAllvideo.fulfilled,(state,action)=>{
          state.loading=false
       state.videos=action.payload


      }

      )
      .addCase(playSingleVideo.pending,(state)=>{
        state.loading=true

      })
      .addCase(playSingleVideo.fulfilled,(state,action)=>{
       state.loading=false,
       state.singleVideo=action.payload.data

      })

    }
  }
)


export default videoStore.reducer