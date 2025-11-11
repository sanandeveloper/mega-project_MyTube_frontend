import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addComments, getVideoComments } from "../store/comment";

function Comments() {
  const [text, setText] = useState("");
  // const [videoComment,setVideoComment]=useState([])
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const { id } = useParams();
  const { comment } = useSelector((state) => state.comment);

  const handleComment = () => {
    if (!text.trim()) return;
    dispatch(addComments({ id, title: text }))
      .unwrap()
      .then(() => {
        dispatch(getVideoComments(id));
      });
    setText("");
  };

  useEffect(() => {
    if (!id) return;
    dispatch(getVideoComments(id));

    //   setVideoComment(comment)
  }, [dispatch, id]);

  return (
    <div className="text-gray-200 mt-6">
      {/* Comment header */}
      <h2 className="text-xl font-semibold mb-4">
        Comments{" "}
        <span className="text-gray-400 text-sm">
          ({comment?.totalComment || 0})
        </span>
      </h2>

      {/* Comment input box */}
      <div className="flex items-start gap-3 mb-6">
        <img
          src={user.avatar}
          alt="user avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <textarea
            className="w-full p-2 bg-transparent border-b border-gray-600 text-sm focus:border-blue-500 focus:outline-none resize-none"
            rows="1"
            placeholder="Add a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex justify-end gap-2 mt-2">
            {text && (
              <button
                onClick={() => setText("")}
                className="px-3 py-1 text-sm text-gray-400 hover:text-gray-300"
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleComment}
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                text.trim()
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
              disabled={!text.trim()}
            >
              Comment
            </button>
          </div>
        </div>
      </div>

      {/* Comment list */}
      <div className="space-y-5">
        {comment?.videoComment?.length > 0 ? (
          comment?.videoComment.map((item) => (
            <div key={item._id} className="flex gap-3">
              <img
                src={item.commentOwner.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">
                    {item.commentOwner.username}
                  </p>
                  <span className="text-xs text-gray-500">• just now</span>
                </div>
                <p className="text-sm text-gray-300 mt-1">{item.content}</p>
                <div className="flex gap-4 mt-2 text-gray-400 text-sm">
                  <button className="hover:text-gray-200">👍</button>
                  <button className="hover:text-gray-200">👎</button>
                  <button className="hover:text-blue-400 font-medium">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
}

export default Comments;
