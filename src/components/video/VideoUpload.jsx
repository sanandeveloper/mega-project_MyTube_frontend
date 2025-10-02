import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadedVideo } from "../store/videoStore";
import { useNavigate } from "react-router-dom";

function VideoUpload() {
  const dispatch = useDispatch();
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const navigate=useNavigate()

  const [text, setText] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setText((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const videoUpload = (e) => {
    e.preventDefault();

    const data = { ...text, video, thumbnail };
    dispatch(uploadedVideo(data))
    .unwrap()
    .then(()=>{
     navigate("/")

    })
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Upload Video
        </h2>

        <form onSubmit={videoUpload} className="space-y-6">
          {/* Video File */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Video
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0] || null)}
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Thumbnail File */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thumbnail
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files[0] || null)}
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={text.title}
              onChange={handleChange}
              placeholder="Enter video title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              type="text"
              name="description"
              value={text.description}
              onChange={handleChange}
              rows="4"
              placeholder="Write a short description..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default VideoUpload;
