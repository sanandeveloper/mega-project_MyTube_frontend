import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userChannel } from "./store/authSlice";
import { useParams } from "react-router-dom";
import { Uservideo } from "./store/videoStore";

function UserChannel() {
  const { username, id } = useParams();
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const { Channel, loading } = useSelector((state) => state.auth);
  const { videos,userVideos } = useSelector((state) => state.video || []);

  useEffect(() => {
    if (username && id) {
      dispatch(userChannel(username));
      dispatch(Uservideo(id));
    }
  }, [dispatch, username, authStatus]);

  if (loading || !Channel) {
    return (
      <div className="min-h-screen bg-white p-6 animate-pulse">
        <div className="max-w-6xl mx-auto">
          <div className="w-full h-48 bg-gray-300 rounded-lg mb-6"></div>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
            <div className="flex-1 space-y-3">
              <div className="h-6 w-40 bg-gray-300 rounded"></div>
              <div className="h-4 w-64 bg-gray-300 rounded"></div>
            </div>
            <div className="h-10 w-32 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Channel Banner */}
      <div className="relative w-full h-56 sm:h-64 bg-gradient-to-r from-red-500 to-orange-500">
        {Channel.coverImage && (
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={Channel.coverImage}
            alt="channel banner"
          />
        )}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-16 relative z-10">
        {/* Channel Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
          <div className="flex items-center gap-4">
            <img
              src={Channel.avatar}
              alt="channel avatar"
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {Channel.fullName}
              </h1>
              <p className="text-gray-600 text-sm mt-1">@{Channel.username}</p>
              <p className="text-gray-700 text-sm mt-2">
                {Channel.channelSubscriber} subscribers •{" "}
                {Channel.allUserVideos} videos
              </p>
            </div>
          </div>

          {/* Subscribe Button */}
          <button className="bg-red-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-red-700 transition">
            Subscribe
          </button>
        </div>

        {/* Channel Description */}
        <div className="mt-6 text-gray-700 leading-relaxed">
          <p>
            Welcome to my channel! Here I share tutorials, vlogs, and insights
            about tech, coding, and creativity. Don’t forget to subscribe and
            stay tuned!
          </p>
        </div>

        {/* Reels / Videos Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-5 border-b pb-2">
            Videos
          </h2>

          {userVideos && userVideos.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">
              {userVideos.map((video) => (
                <div
                  key={video._id}
                  className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
                    <img
                      src={video.thumbnail || video.videoFile}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-0.5 rounded">
                      {video.views} views
                    </div>
                  </div>

                  <div className="p-3 flex gap-3">
                    <img
                      src={video.owner?.avatar}
                      alt={video.owner?.username}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {video.owner?.username}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(video.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-4 text-center">
              No videos uploaded yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserChannel;
