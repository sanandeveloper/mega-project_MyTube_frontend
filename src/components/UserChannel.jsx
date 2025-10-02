import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userChannel } from "./store/authSlice";
import { useParams } from "react-router-dom";

function UserChannel() {

  const {username}=useParams()
  console.log("username",username)
  const authStatus=useSelector((state)=>state.auth.status)

    const dispatch=useDispatch()

    const {Channel,loading}=useSelector((state)=>state.auth)
    console.log("channel",Channel)

   useEffect(()=>{

   if (username) {
      dispatch(userChannel(username))
   }

   },[dispatch,username,authStatus])

   if (loading || !Channel) {
  return (
    <div className="min-h-screen bg-white p-6 animate-pulse">
      <div className="max-w-6xl mx-auto">
        {/* Banner skeleton */}
        <div className="w-full h-48 bg-gray-300 rounded-lg mb-6"></div>

        <div className="flex items-center gap-6">
          {/* Avatar skeleton */}
          <div className="w-24 h-24 bg-gray-300 rounded-full"></div>

          {/* Text skeleton */}
          <div className="flex-1 space-y-3">
            <div className="h-6 w-40 bg-gray-300 rounded"></div>
            <div className="h-4 w-64 bg-gray-300 rounded"></div>
          </div>

          {/* Button skeleton */}
          <div className="h-10 w-32 bg-gray-300 rounded-full"></div>
        </div>

        {/* Description skeleton */}
        <div className="mt-6 space-y-2">
          <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
          <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
          <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
}


  return (
    <div className="min-h-screen bg-white text-black">
      {/* Channel Banner */}
      <div>
       <img className="w-full h-48 bg-gradient-to-r from-red-500 to-orange-500" src={Channel.coverImage} alt="" />
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-12">
        {/* Channel Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
          {/* Left: Avatar + Info */}
          <div className="flex items-center gap-4">
            <img
              src={ Channel.avatar}
              alt="channel avatar"
              className="w-24 h-24 rounded-full border-4 border-white shadow"
            />
            <div>
              <h1 className="text-2xl font-bold">{Channel.fullName}</h1>
              <p className="text-gray-600 text-sm">{Channel.channelSubscriber} subscribers • {Channel.allUserVideos} videos</p>
            </div>
          </div>

          {/* Right: Subscribe Button */}
          <button className="bg-red-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-red-700 transition">
            Subscribe
          </button>
        </div>

        {/* Channel Description */}
        <div className="mt-6 text-gray-700">
          <p>
            Welcome to my channel! Here I share tutorials, vlogs, and insights
            about tech, coding, and creativity. Don’t forget to subscribe and
            stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserChannel;
