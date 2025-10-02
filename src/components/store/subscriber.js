import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const API = import.meta.env.VITE_API_BASE_URL;

export const userSubscribed = createAsyncThunk(
  "subscriber/subscribe",
  async (channelId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.post(
        `${API}${import.meta.env.VITE_SUBSCRIBE_ENDPOINT}/${channelId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("subscribed.data:", response.data);
      return response.data?.data.totalSubscriber;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const userUnsubscribed = createAsyncThunk(
  "subscriber/unsubscribe",
  async (channelId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      await axios.delete(
        `${API}${import.meta.env.VITE_UNSUBSCRIBE_ENDPOINT}/${channelId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  subscriber: null,
  error: null,
};

const subscriberData = createSlice({
  name: "subs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userSubscribed.fulfilled, (state, action) => {
        state.subscriber = action.payload;
        console.log("subscriber total", state.subscriber);
      })
      .addCase(userUnsubscribed.fulfilled, (state) => {
        state.subscriber = null;
      });
  },
});

export default subscriberData.reducer;
