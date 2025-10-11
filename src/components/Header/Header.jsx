import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Search, Video, Menu, X } from "lucide-react";
import LogoutBtn from "./LogoutBtn";

function Header({ text, setText }) {
  const authStatus = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [showAction, setShowAction] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    setShowAction(false);
    setShowMobileMenu(false);
  }, [authStatus]);

  const navItem = [
    { path: "/", name: "Home", active: authStatus },
    { path: "/signup", name: "SignUp", active: !authStatus },
    { path: "/login", name: "Login", active: !authStatus },
  ];

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 h-16">
        {/* LEFT: Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src="/MS.jpeg" alt="logo" className="w-8 h-8 rounded-2xl" />
          <span className="font-semibold text-lg hidden sm:block">MyTube</span>
        </div>

        {/* CENTER: Search Bar (Desktop) */}
        <div className="hidden sm:flex flex-1 justify-center px-4 max-w-2xl">
          <div className="flex w-full max-w-2xl">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Search"
              className="w-full border border-gray-300 rounded-l-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
            />
            <button
              onClick={() => console.log("Search for:", text)}
              className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-full px-6 flex items-center justify-center hover:bg-gray-200 transition"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* RIGHT: Actions */}
        <div className="hidden sm:flex items-center gap-4">
          {authStatus && (
            <button
              onClick={() => navigate("/upload-video")}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Video className="w-5 h-5 text-gray-700" />
            </button>
          )}

          {authStatus ? (
            <div className="relative">
              <img
                src={
                  user?.avatar || "https://via.placeholder.com/40x40.png?text=U"
                }
                alt="avatar"
                onClick={() => setShowAction(!showAction)}
                className="w-10 h-10 rounded-full cursor-pointer border shadow-sm hover:scale-105 transition-transform"
              />
              {showAction && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-2xl py-2 border">
                  <ul className="space-y-1">
                    <li
                      onClick={() => {
                        setShowAction(false);
                        navigate("/user");
                      }}
                      className="cursor-pointer px-4 py-2 text-gray-600 hover:bg-blue-500 hover:text-white rounded-lg transition-colors"
                    >
                      Profile
                    </li>
                    <li
                      onClick={() => {
                        setShowAction(false);
                        navigate("/changepassword");
                      }}
                      className="cursor-pointer px-4 py-2 text-gray-600 hover:bg-blue-500 hover:text-white rounded-lg transition-colors"
                    >
                      Change Password
                    </li>
                    <li className="cursor-pointer px-4 py-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                      <LogoutBtn />
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            navItem.map(
              (item) =>
                item.active && (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.path)}
                    className="px-4 py-1.5 rounded-full border text-sm font-medium hover:bg-gray-50"
                  >
                    {item.name}
                  </button>
                )
            )
          )}
        </div>

        {/* MOBILE MENU BUTTONS */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Search className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={() => navigate("/upload-video")}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Video className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            {showMobileMenu ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      {showSearch && (
        <div className="sm:hidden px-4 pb-3">
          <div className="flex w-full">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Search"
              className="w-full border border-gray-300 rounded-l-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
            />
            <button
              onClick={() => console.log("Search for:", text)}
              className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-full px-4 flex items-center justify-center hover:bg-gray-200"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
