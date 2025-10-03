import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllvideo } from "../store/videoStore";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/Timeago";



function ShowVideo() {
  const dispatch = useDispatch();

  const videos = useSelector((state) => state.video.videos || []);
  const loading = useSelector((state) => state.video.loading);
  console.log("show video", videos);

  useEffect(() => {
    if (videos) {
      dispatch(getAllvideo());
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Grid Layout */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <div
            key={video._id}
            className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden cursor-pointer"
          >
            {/* Thumbnail */}
            <Link to={`/video/${video._id}/${video.owner.username}`}>
              {" "}
              <div className="relative w-full h-48 bg-gray-200">
                {video.thumbnail ? (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="relative w-full h-48 bg-gray-200">
                    <video
                      className="w-full h-full object-cover"
                      src={video.videoFile}
                    ></video>
                  </div>
                )}
              </div>
            </Link>

            {/* Video Info */}
            <div className="flex p-4">
              {/* Channel Avatar */}
              <img
                src={video.owner.avatar}
                alt={video.channel}
                className="w-10 h-10 rounded-full mr-3"
              />

              {/* Title + Meta */}
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                  {video.title}
                </h3>
                <div className="mt-1">
                  {/* Channel name */}
                  <p className="text-sm font-medium text-gray-800 hover:text-black cursor-pointer">
                    {video.owner.fullName}
                  </p>

                  {/* Views and time */}
                  <p className="text-xs text-gray-500">
                    {video.views} views • {timeAgo(video.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowVideo;
