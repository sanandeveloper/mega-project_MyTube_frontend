  import { configureStore } from "@reduxjs/toolkit";
  import authSlice from "./authSlice"
  import videoStore from "./videoStore"
  import subscriberData from "./subscriber";



  const store= configureStore(
    {
        reducer:{
           auth:authSlice,
           video:videoStore,
           subs:subscriberData
        }
    }
  )

  export default store