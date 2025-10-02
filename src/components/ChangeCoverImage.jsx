import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { coverImageUpdate } from "./store/authSlice";


function ChangeCoverImage() {
  const [coverImage, setCoverImage] = useState(null);

  const {user,loading} = useSelector((state) => state.auth);
  const dispatch=useDispatch()

  const updateCoverImage = () => {
     
    if (coverImage) {
         dispatch(coverImageUpdate(coverImage))
    }
  };
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


  return (
    <div className="w-full flex justify-center items-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800">
            Change Cover Image
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Upload and preview your new cover image before saving.
          </p>
        </div>

        {/* Image Preview */}
        <div className="relative w-full h-64 bg-gray-100 flex items-center justify-center">
          <img
            src={
              coverImage
                ? URL.createObjectURL(coverImage)
                : user.coverImage  || "/default-cover.jpg"
            }
            alt="Cover Preview"
            className="w-full h-full object-cover"
          />
          {!coverImage && !user?.coverImage && (
            <span className="absolute text-gray-400 text-sm">
              No cover image uploaded
            </span>
          )}
        </div>

        {/* Upload & Actions */}
        <div className="px-6 py-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <label className="cursor-pointer inline-flex items-center px-5 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-lg shadow hover:bg-blue-700 transition">
            Upload New
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setCoverImage(e.target.files[0])}
            />
          </label>

          <div className="flex items-center gap-3">
            {coverImage && (
              <>
                <Button
                  onClick={updateCoverImage}
                  className="px-5 py-2.5 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                >
                  Update
                </Button>

                <Button
                  onClick={() => setCoverImage(null)}
                  className="px-5 py-2.5 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                >
                  Remove
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeCoverImage;


