import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, removeAvatar, removeCoverImage, } from "./store/authSlice";

export default function UserProfileStepper() {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch=useDispatch()
  const navigate=useNavigate()

   const deleteAvatar=()=>{

     if (user) {
       dispatch(removeAvatar())
       .unwrap()
       .then(()=>{

        dispatch(getCurrentUser())
       })
       

     }

   }
   useEffect(()=>{
    
    dispatch(getCurrentUser())
    
   },[dispatch])


     const deleteCoverImage=()=>{

      if (user) {
       dispatch(removeCoverImage())
       .unwrap()
       .then(()=>{
      
        dispatch(getCurrentUser())

       })
      }
     }
  

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600">No user data found. Please log in.</p>
        </div>
      </div>
    );
  }
  
  if (loading) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      <span className="ml-3 text-lg font-medium text-gray-600">
        Loading...
      </span>
    </div>
  )
}


console.log("user",user)






  // fallback images
  const coverSrc = user.coverImage || "https://via.placeholder.com/1200x360?text=Cover+Image";
  const avatarSrc = user.avatar || "https://via.placeholder.com/150?text=Avatar";

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* COVER + AVATAR */}
        <div className="relative">
          <div className="h-56 w-full bg-gray-200">
            <img
              src={coverSrc}
              alt="cover"
              className="w-full h-full object-cover"
            />
          </div>

          {/* avatar overlaps bottom center of cover */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12">
            <img
              src={avatarSrc}
              alt="avatar"
              className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
            />
          </div>
        </div>

        {/* CONTENT: Stepper list */}
        <div className="pt-16 pb-10 px-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Profile Overview
          </h2>

          <ol className="space-y-6">
            {/* Step 1: Cover */}
            <li className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
                  1
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">Cover Image</h3>
                    <p className="text-sm text-gray-500">This appears at the top of your profile.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700"
                      onClick={()=>navigate("/changecoverimage")}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
                      onClick={deleteCoverImage}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="w-full h-36 rounded-md overflow-hidden border">
                    <img
                      src={coverSrc}
                      alt="cover preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </li>

            {/* Step 2: Avatar */}
            <li className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
                  2
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">Avatar</h3>
                    <p className="text-sm text-gray-500">Profile picture shown across the app.</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                     onClick={()=>{navigate('/changeavatar')}}
                      className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700"
                      // onClick={() => openAvatarEdit()}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
                       onClick={deleteAvatar}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-4">
                  <img
                    src={avatarSrc}
                    alt="avatar preview"
                    className="w-20 h-20 rounded-full object-cover border"
                  />

                  <div className="text-sm text-gray-600">
                    <p className="font-medium text-gray-800">{user.fullName || "No name set"}</p>
                    <p className="mt-1">@{user.username || "username"}</p>
                  </div>
                </div>
              </div>
            </li>

            {/* Step 3: Full name */}
            <li className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
                  3
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">Full name</h3>
                    <p className="text-sm text-gray-500">The name displayed on your profile.</p>
                  </div>
                  <button
                    className="px-3 py-1 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
                     onClick={()=>navigate("/changename")}
                  >
                    Edit
                  </button>
                </div>

                <div className="mt-3">
                  <div className="px-4 py-3 bg-gray-50 border rounded">
                    <p className="text-gray-800">{user.fullName || "—"}</p>
                  </div>
                </div>
              </div>
            </li>

            {/* Step 4: Username */}
            <li className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
                  4
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">Username</h3>
                    <p className="text-sm text-gray-500">Used in URLs and mentions.</p>
                  </div>
                  <button
                    className="px-3 py-1 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
                     onClick={()=>navigate('/changeusername')}
                  >
                    Edit
                  </button>
                </div>

                <div className="mt-3">
                  <div className="px-4 py-3 bg-gray-50 border rounded">
                    <p className="text-gray-800">@{user.username || "—"}</p>
                  </div>
                </div>
              </div>
            </li>

            {/* Step 5: Email */}
            <li className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
                  5
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">Email</h3>
                    <p className="text-sm text-gray-500">Your account email.</p>
                  </div>
                  <button
                    className="px-3 py-1 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
                    onClick={()=>navigate("/changeemail")}
                  >
                    Edit
                  </button>
                </div>

                <div className="mt-3">
                  <div className="px-4 py-3 bg-gray-50 border rounded">
                    <p className="text-gray-800">{user.email || "—"}</p>
                  </div>
                </div>
              </div>
            </li>

            {/* Step 6: Password */}
            <li className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
                  6
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">Password</h3>
                    <p className="text-sm text-gray-500">Your account password (hidden).</p>
                  </div>
                  <button
                    className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                   onClick={()=>navigate("/changepassword")}
                    
                  >
                    Change
                  </button>
                </div>

                <div className="mt-3">
                  <div className="px-4 py-3 bg-gray-50 border rounded flex items-center justify-between">
                    <p className="text-gray-800 tracking-widest">••••••••</p>
                    <span className="text-sm text-gray-500">Last changed:  {user.passwordUpdatedAt 
        ? `${new Date(user.passwordUpdatedAt).toLocaleDateString()}`
        : "Never changed"}</span>
                  </div>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
