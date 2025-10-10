import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playSingleVideo } from "../store/videoStore";
import { useParams } from "react-router-dom";

function PlayVideo() {
  const { id } = useParams();
  const { singleVideo, loading } = useSelector((state) => state.video);

  console.log("singleVideo", singleVideo);
  console.log("id", id);

  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(playSingleVideo(id));
    }
  }, [id]);

  if (!singleVideo) {
    return <div className="flex justify-center items-center h-120">
      
       <div className=" grid place-content-center border-t-transparent mx-auto my-auto w-12 h-12 rounded-full border-2 border-blue-500 animate-spin"></div>
       
       
       </div>
  }

  return (
    <div className="bg-black">
      <video
        controls
        autoPlay
        playsInline
        className="w-full max-h-[600px] rounded-lg shadow-lg"
        src={singleVideo.videoFile}
      ></video>
    </div>
  );
}

export default PlayVideo;
