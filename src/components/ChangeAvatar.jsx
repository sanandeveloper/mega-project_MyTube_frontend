import React, { useEffect, useState } from "react";
import { Camera } from "lucide-react"; // icon librar
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { changeAvatar, getCurrentUser } from "./store/authSlice";
import { useNavigate } from "react-router-dom";

function ChangeAvatar() {
  const [Avatar, setChngAvatar] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const navigate=useNavigate()
  console.log("user",user)
  const dispatch = useDispatch();

  const handleChangeAvatar = () => {
    if (Avatar) {
     dispatch(changeAvatar(Avatar)).
     unwrap()
     .then(()=>{
     
      dispatch(getCurrentUser())
     
      navigate("/user")

      
     })
    }
    setChngAvatar(null);
   
  };

  console.log("avatar",Avatar)

  if (Avatar) {
    
     const file = new File([Avatar.name],"sanan pic",{type:Avatar.type})
     console.log("newfile",file)
  }

  // if (Avatar) {
  //    Avatar.name ="newname.jpg"
  // }
  
  

  if (loading) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      <span className="ml-3 text-lg font-medium text-gray-600">
        Loading...
      </span>
    </div>
  );
}


  return (
    <div className="flex flex-col items-center mt-20">
      <div className="relative group">
        {/* Avatar Preview */}
        {Avatar ? (
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
            <img src={URL.createObjectURL(Avatar) } alt="Preview Avatar" />
          </div>
        ) : user?.avatar ? (   // ✅ guard against undefined
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg flex items-center justify-center text-gray-400 bg-gray-100">
            No Avatar
          </div>
        )}

        {/* Overlay Icon */}
        <label
          htmlFor="avatar-upload"
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition"
        >
          <Camera className="w-8 h-8 text-white" />
        </label>

        {/* Hidden File Input */}
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => setChngAvatar(e.target.files[0] || null)}
        />
      </div>
      

      <p className="mt-3 mb-3 text-sm text-gray-500">
        Click the avatar to change your profile picture
      </p>
      <Button onClick={handleChangeAvatar}>Save</Button>
    </div>
  );
}

export default ChangeAvatar;
