import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllvideo } from "../store/videoStore";
import { Link, useNavigate } from "react-router-dom";
import { timeAgo } from "../../utils/Timeago";
import Pagination from "../Pagination";

function ShowVideo() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit] = useState(3);
  const navigate=useNavigate()

  const { videos = [], loading, totalPages } = useSelector(
    (state) => state.video
  );
 

  useEffect(() => {
    dispatch(getAllvideo({ page, limit }));
  }, [dispatch, page, limit]);

    

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
            <Link  to={`/video/${video._id}/${video.owner.username}`}>
              <div className="relative w-full h-48 bg-gray-200">
                {  video.thumbnail ? (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    className="w-full h-full object-cover"
                    src={video.videoFile}
                  ></video>
                )}
              </div>
            </Link>

            <div className="flex p-4">
              <img
                src={video.owner.avatar}
                alt={video.channel}
                className="w-10 h-10 rounded-full mr-3"
              />

              <div className="flex flex-col">
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                  {video.title}
                </h3>
                <div className="mt-1">
                  <p className="text-sm font-medium text-gray-800 hover:text-black cursor-pointer">
                    {video.owner.fullName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {video.views} views • {timeAgo(video.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
  
      <Pagination totallength={totalPages} totalPages={totalPages || 1} setPage={setPage} page={page}  />
    </div>
  );
}

export default ShowVideo;
