import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const APi = import.meta.env.VITE_API_BASE_URL;

export const addComments = createAsyncThunk(
  "add-comment",
  async ({ id, title }, { rejectWithValue }) => {
    console.log("videoUrl", id);
    console.log("text", title);

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${APi}/${import.meta.env.VITE_ADD_COMMENT_ENDPOINT}/${id}/comments`,

        { title },

        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("commentSData", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue;
    }
  }
);

export const getVideoComments = createAsyncThunk("get-comments", async (id) => {
  console.log("id", id);

  try {
    const token = localStorage.getItem("accessToken");

    const respone = await axios.get(`${APi}/${import.meta.env.VITE_GET_COMMENT_ENDPOINT}/${id}/getcomments`, {
      headers: {
        Authorization: token,
      },
    });

    console.log("reposne of get comments+>", respone);

    return respone.data?.data;
  } catch (error) {}
});

const initialState = {
  comment: [],
  error: false,
};

const Videocomments = createSlice({
  name: "comment",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getVideoComments.fulfilled, (state, action) => {
      state.comment = action.payload;
      state.error = false;
      console.log("state comments", state.comment);
    });
  },
});

export default Videocomments.reducer;
