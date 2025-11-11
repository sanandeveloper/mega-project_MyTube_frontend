import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import videoStore from "./videoStore";
import subscriberData from "./subscriber";
import searchSlice from "./searchSlice";
import Videocomments from "./comment";

const store = configureStore({
  reducer: {
    auth: authSlice,
    video: videoStore,
    subs: subscriberData,
    search: searchSlice,
    comment: Videocomments,
  },
});

export default store;
