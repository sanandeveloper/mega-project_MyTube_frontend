import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletelike, likeVideos, playSingleVideo } from "../store/videoStore";
import { ThumbsUp } from "lucide-react";
import { userChannel } from "../store/authSlice";
import { userSubscribed, userUnsubscribed } from "../store/subscriber";
import { useState } from "react";

function VideoPlayer() {
  const navigate = useNavigate();
  const { id, username } = useParams();
  const dispatch = useDispatch();
  const { loading, singleVideo } = useSelector((state) => state.video);
  const { user, Channel } = useSelector((state) => state.auth);
  console.log("channel.isubscribed", Channel);

  console.log("channel", Channel || null);
  const hasUserLiked = singleVideo?.likedVideo?.includes(user?._id || null);
  console.log("singlevideodata", singleVideo);

  useEffect(() => {
    if (id) {
      dispatch(playSingleVideo(id));
    }
    if (username) {
      dispatch(userChannel(username));
    }
  }, [id, dispatch, username]);

  const usersChannel = () => {
    navigate(`/userchannel/${username}`);
  };

  const handletogglelikedVideo = () => {
    if (hasUserLiked) {
      if (id) {
        dispatch(deletelike(id))
          .unwrap()
          .then(() => {
            if (username) {
              dispatch(userChannel(username));
              if (id) {
                dispatch(playSingleVideo(id));
              }
            }
          });
      }
    } else {
      if (id) {
        dispatch(likeVideos(id))
          .unwrap()
          .then(() => {
            if (username) {
              dispatch(userChannel(username));
            }
            if (id) {
              dispatch(playSingleVideo(id));
            }
          });
      }
    }
  };

  const handleSubscribeToggle = () => {
    if (Channel.isSubscribed) {
      dispatch(userUnsubscribed(Channel._id))
        .unwrap()
        .then(() => {
          if (username) {
            dispatch(userChannel(username));
          }
        });
    } else {
      dispatch(userSubscribed(Channel._id))
        .unwrap()
        .then(() => {
          if (username) {
            dispatch(userChannel(username));
          }
        });
    }
  };
  if (!singleVideo || !Channel) {
    return (
      <div className="flex justify-center items-center h-100">Loading...</div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen  text-black">
      {/* Main Video Section */}
      <div className="flex-1 flex flex-col items-center lg:items-start px-4 lg:px-10 py-6">
        {/* Video with 16:9 ratio */}
        <div className="w-full max-w-5xl aspect-video rounded-lg overflow-hidden shadow-lg">
          <video
            src={singleVideo.videoFile}
            controls
            autoPlay
            className="w-full h-140 object-cover"
          />
        </div>

        {/* Title */}
        <h2 className="mt-4 text-xl lg:text-2xl font-bold w-full max-w-5xl">
          {singleVideo.title}
        </h2>

        {/* Views + Date */}
        <div className="w-full max-w-5xl mt-2 flex flex-col lg:flex-row lg:items-center justify-between text-gray-600 text-sm">
          <span>{singleVideo.views} views</span>
          <span>
            {new Date(singleVideo?.createdAt || "").toLocaleDateString()}
          </span>
        </div>

        {/* Owner Info + Buttons */}
        <div className="w-full max-w-5xl flex flex-col lg:flex-row lg:items-center mt-6 border-t border-gray-200 pt-4 justify-between">
          {/* Owner Info */}
          <div className="flex items-center">
            <img
              onClick={usersChannel}
              src={Channel.avatar || "/default-avatar.png"}
              alt="owner avatar"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <p className="font-semibold">{singleVideo.owner?.fullName}</p>
              <p className="text-gray-500 text-sm">
                {Channel.channelSubscriber} subscriber
              </p>
            </div>
          </div>

          {/* Buttons Row */}
          <div className="flex items-center gap-4 mt-4 lg:mt-0">
            {/* ✅ Subscribe Button */}
            <button
              onClick={handleSubscribeToggle}
              className={`px-6 py-2 rounded-full font-semibold shadow-md transition duration-300 ease-in-out
    ${
      Channel.isSubscribed
        ? "bg-red-600 text-white hover:bg-red-700"
        : "bg-blue-600 text-white hover:bg-blue-700"
    }`}
            >
              {Channel.isSubscribed ? "Unsubscribe" : "Subscribe"}
            </button>

            {/* ✅ Like Button */}
            <button
              onClick={handletogglelikedVideo}
              className={`flex items-center gap-2 px-5 py-2 rounded-full shadow border transition ${
                hasUserLiked
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300"
              }`}
            >
              <ThumbsUp className="w-5 h-5" />
              {hasUserLiked ? "UnLiked" : "Like" || null}{" "}
              {singleVideo?.likedVideo?.length ?? 0}
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="w-full max-w-5xl mt-6 bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-700">{singleVideo.description}</p>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
