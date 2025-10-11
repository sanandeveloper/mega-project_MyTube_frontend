import React, { useState } from "react";
import Header from "../components/Header/Header";
import ShowVideo from "../components/video/ShowVideo";

function Home() {
  const [text, setText] = useState("");

  return (
    <div className="min-h-screen bg-gray-100">
      <Header text={text} setText={setText} />
      <ShowVideo text={text} />
    </div>
  );
}

export default Home;
