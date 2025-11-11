import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletelike, likeVideos, playSingleVideo } from "../store/videoStore";
import { ThumbsUp } from "lucide-react";
import { userChannel } from "../store/authSlice";
import { userSubscribed, userUnsubscribed } from "../store/subscriber";
import { Suspense } from "react";
import { getVideoComments } from "../store/comment";

const Comments = React.lazy(() => import("./Comments"));
function VideoPlayer() {
  const navigate = useNavigate();
  const { id, username } = useParams();
  const dispatch = useDispatch();
  const { loading, singleVideo } = useSelector((state) => state.video);
  const { user, Channel, status } = useSelector((state) => state.auth);
  const token = localStorage.getItem("accessToken");

  const hasUserLiked = singleVideo?.likedVideo?.includes(user?._id || null);

  useEffect(() => {
    if (id && token) dispatch(playSingleVideo(id));
    if (username && token) dispatch(userChannel(username));
      // dispatch(getVideoComments(id))
    if (!id) return;
  
  }, [id, username, token, dispatch, status]);

  const handleChannelNavigate = () => {
    navigate(`/userchannel/${username}/${singleVideo.owner?._id}`);
  };

  const handleToggleLike = async () => {
    if (!status) return navigate("/login");

    if (hasUserLiked) {
      await dispatch(deletelike(id)).unwrap();
    } else {
      await dispatch(likeVideos(id)).unwrap();
    }

    dispatch(playSingleVideo(id));
    dispatch(userChannel(username));
  };

  const handleSubscribeToggle = async () => {
    if (!status) return navigate("/login");

    if (Channel.isSubscribed) {
      await dispatch(userUnsubscribed(Channel._id)).unwrap();
    } else {
      await dispatch(userSubscribed(Channel._id)).unwrap();
    }

    dispatch(userChannel(username));
  };

  if (!singleVideo || !Channel) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400">Loading video...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0f0f0f] text-white">
      {/* Video Player Section */}
      <div className="flex flex-col lg:flex-row w-full px-4 lg:px-12 py-6">
        <div className="flex-1 flex flex-col items-center lg:items-start">
          {/* Video */}
          <div className="w-full max-w-5xl bg-black rounded-xl overflow-hidden shadow-lg">
            <video
              src={singleVideo.videoFile}
              controls
              autoPlay
              playsInline
              className="w-full max-h-[700px] rounded-lg"
            />
          </div>

          {/* Title */}
          <h2 className="mt-4 text-xl lg:text-2xl font-bold w-full max-w-5xl">
            {singleVideo.title}
          </h2>

          {/* Views and Date */}
          <div className="w-full max-w-5xl mt-2 flex flex-col lg:flex-row lg:items-center justify-between text-gray-400 text-sm">
            <span>{singleVideo.views} views</span>
            <span>
              {new Date(singleVideo?.createdAt || "").toLocaleDateString()}
            </span>
          </div>

          {/* Channel + Like + Subscribe */}
          <div className="w-full max-w-5xl flex flex-col lg:flex-row lg:items-center mt-6 border-t border-gray-700 pt-4 justify-between">
            {/* Channel Info */}
            <div
              onClick={handleChannelNavigate}
              className="flex items-center cursor-pointer hover:opacity-90"
            >
              <img
                src={Channel.avatar || "/default-avatar.png"}
                alt="Channel avatar"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="font-semibold text-lg">
                  {singleVideo.owner?.fullName}
                </p>
                <p className="text-gray-400 text-sm">
                  {Channel.channelSubscriber || 0} subscribers
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4 mt-4 lg:mt-0">
              <button
                onClick={handleSubscribeToggle}
                className={`px-6 py-2 rounded-full font-semibold shadow transition-all duration-200 ${
                  Channel.isSubscribed
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                {Channel.isSubscribed ? "Subscribed" : "Subscribe"}
              </button>

              <button
                onClick={handleToggleLike}
                className={`flex items-center gap-2 px-5 py-2 rounded-full border shadow transition ${
                  hasUserLiked
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-[#272727] text-gray-300 hover:bg-[#383838] border-gray-600"
                }`}
              >
                <ThumbsUp className="w-5 h-5" />
                <span>{singleVideo?.likedVideo?.length ?? 0}</span>
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="w-full max-w-5xl mt-6 bg-[#272727] p-4 rounded-xl">
            <p className="text-gray-300 leading-relaxed">
              {singleVideo.description || "No description available."}
            </p>
          </div>

          {/* Comments */}
          <div className="w-full max-w-5xl mt-8">
            <Suspense fallback={<div className="text-gray-400">Loading comments...</div>}>
              <Comments />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
