import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API = import.meta.env.VITE_API_BASE_URL 

export const uploadedVideo = createAsyncThunk(
  "video/upload",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("videoFile", data.video);
      formData.append("thumbnail", data.thumbnail);

      const response = await axios.post(
        `${API}/${import.meta.env.VITE_UPLOAD_VIDEO_ENDPOINT}`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllvideo = createAsyncThunk(
  "video/getAll",
  async ({page,limit}) => {
    console.log("page",page)
    try {
      const response = await axios.get(
        `${API}/${import.meta.env.VITE_GET_ALL_VIDEOS_ENDPOINT}`,{
          params:{
            page:page,
            limit
          }
        }
      );
      console.log("totalvideos",response.data.data.totalpages)
      return response.data?.data;
    } catch (error) {
      console.log("video not fetched")
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const playSingleVideo = createAsyncThunk(
  "video/play",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/${import.meta.env.VITE_SINGLE_VIDEO_ENDPOINT}/${id}`);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const likeVideos = createAsyncThunk(
  "video/like",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`${API}/${import.meta.env.VITE_LIKE_VIDEO_ENDPOINT}/${id}`, {
        headers: { Authorization: token },
      });
      return response.data.data?.likedVideo;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deletelike = createAsyncThunk(
  "video/deleteLike",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.delete(`${API}/${import.meta.env.VITE_DELETE_LIKE_VIDEO_ENDPOINT}/${id}`, {
        headers: { Authorization: token },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const Uservideo=createAsyncThunk("user-videos",async(id,{rejectWithValue})=>{

  console.log("user video id",id)
  try {
    const token=localStorage.getItem("accessToken")
    const reposne=await axios.get(`${API}/${import.meta.env.VITE_COUNT_VIDEO_ENDPOINT}/${id}`
      ,{
        headers:{
          Authorization:token
        }
      }
    )
    console.log("reponse.data...ok",reposne.data.data)
    return reposne.data.data
    
  } catch (error) {
    console.log("error while getting user video",error)
    return rejectWithValue(error)
  }


})

const initialState = {
  videos: [],
  likeVideo: [],
  singleVideo: null,
  loading: false,
  error: null,
  totalPages:null,
  userVideos:[],
};

const videoStore = createSlice({
  name: "video",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadedVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadedVideo.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getAllvideo.pending, (state) => {
        state.loading = true;
        
      })
      .addCase(getAllvideo.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload.videos;
        state.totalPages=action.payload.totalpages
        console.log("satae.totalpages",state.totalPages)
      })
      .addCase(playSingleVideo.pending, (state) => {
        state.loading = true;
      })
      .addCase(playSingleVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.singleVideo = action.payload.data;
        console.log("single video data",state.singleVideo)
      })
      .addCase(Uservideo.pending,(state)=>{
       state.loading=true
        
      })
      .addCase(Uservideo.fulfilled,(state,action)=>{
       
        state.loading=false
        state.userVideos=action.payload

        console.log("state.userVideo",state.userVideos)

      })
  },
});

export default videoStore.reducer;
