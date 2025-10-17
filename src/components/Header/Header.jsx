import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Search, Video, Menu, X, ClockFading } from "lucide-react";
import LogoutBtn from "./LogoutBtn";
import { SearchText } from "../store/searchSlice";

function Header(props) {

  console.log("props",props)
  const authStatus = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.user);
  const[text,setText]=useState('')
  const dispatch=useDispatch()

  const navigate = useNavigate();

  const [showAction, setShowAction] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

 console.log("texting",text)
  useEffect(()=>{
  
    if (text.trim==="") {
      return
    }

   dispatch(SearchText(text))


  },[text])

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

        {/* CENTER: Search bar (desktop) */}
        <div className="hidden sm:flex flex-1 px-4 max-w-2xl">
          <div className="flex w-full">
            <input
              type="text"
              placeholder="Search"
              value={text}
              onChange={((e)=>setText(e.target.value))}
              
              className="w-full border border-gray-300 rounded-l-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
            />
            <button className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-full px-4 flex items-center justify-center hover:bg-gray-200">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* RIGHT: Desktop icons */}
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
                src={user?.avatar || "https://via.placeholder.com/40x40.png?text=U"}
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

        {/* MOBILE: Icons */}
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

      {/* MOBILE: Search bar */}
      {showSearch && (
        <div className="sm:hidden px-4 pb-2">
          <div className="flex w-full">
            <input
              type="text"
              value={text}
              onChange={((e)=>setText(e.target.value))}
              placeholder="Search"
              className="w-full border border-gray-300 rounded-l-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
            />
            <button className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-full px-4 flex items-center justify-center hover:bg-gray-200">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      )}

      {/* MOBILE: Menu */}
      {showMobileMenu && (
        <div className="sm:hidden bg-white border-t shadow-md px-4 py-3">
          {authStatus ? (
            <ul className="space-y-2">
              <li
                onClick={() => {
                  setShowMobileMenu(false);
                  navigate("/upload-video");
                }}
                className="cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                Upload Video
              </li>
              <li
                onClick={() => {
                  setShowMobileMenu(false);
                  navigate("/user");
                }}
                className="cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                Profile
              </li>
              <li
                onClick={() => {
                  setShowMobileMenu(false);
                  navigate("/changepassword");
                }}
                className="cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                Change Password
              </li>
              <li className="px-3 py-2 rounded-lg text-red-600 hover:bg-red-100">
                <LogoutBtn />
              </li>
            </ul>
          ) : (
            navItem.map(
              (item) =>
                item.active && (
                  <button
                    key={item.name}
                    onClick={() => {
                      setShowMobileMenu(false);
                      navigate(item.path);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100"
                  >
                    {item.name}
                  </button>
                )
            )
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
