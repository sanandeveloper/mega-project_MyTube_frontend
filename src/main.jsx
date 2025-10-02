import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./components/store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/SignUp.jsx";
import Login from "./components/Login.jsx";
import UserProfile from "./components/UserProfile.jsx";
import LogoutBtn from "./components/Header/LogoutBtn.jsx";
import ChangeAvatar from "./components/ChangeAvatar.jsx";
import ChangeCoverImage from "./components/ChangeCoverImage.jsx";
import ChangeName from "./components/ChangeName.jsx";
import ChangeUsername from "./components/ChangeUsername.jsx";
import ChangeEmail from "./components/ChangeEmail.jsx";
import ChangePassword from "./components/ChangePassword.jsx";
import VideoUpload from "./components/video/VideoUpload.jsx";
import ShowVideo from "./components/video/ShowVideo.jsx";
import VideoPlayer from "./components/video/VideoPlayer.jsx";
import Protected from "./components/AuthLayout.jsx";
import UserChannel from "./components/UserChannel.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
            <SignUp />
          </Protected>
        ),
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        ),
      },
      {
        path: "/user",
        element: (
          <Protected authentication>
            <UserProfile />
          </Protected>
        ),
      },
      {
        path: "/logout",
        element: (
          <Protected authentication>
            <LogoutBtn />
          </Protected>
        ),
      },
      {
        path: "/changeavatar",
        element: (
          <Protected authentication>
            <ChangeAvatar />
          </Protected>
        ),
      },
      {
        path: "/changecoverimage",
        element: (
          <Protected authentication>
            <ChangeCoverImage />
          </Protected>
        ),
      },
      {
        path: "/changename",
        element: (
          <Protected authentication>
            <ChangeName />
          </Protected>
        ),
      },
      {
        path: "/changeusername",
        element: (
          <Protected authentication>
            <ChangeUsername />
          </Protected>
        ),
      },
      {
        path: "/changeemail",
        element: (
          <Protected authentication>
            <ChangeEmail />
          </Protected>
        ),
      },
      {
        path: "/changepassword",
        element: (
          <Protected authentication>
            <ChangePassword />
          </Protected>
        ),
      },
      {
        path: "/upload-video",
        element: (
          <Protected authentication>
            <VideoUpload />
          </Protected>
        ),
      },
      {
        path: "/",
        element: (
          <Protected authentication >
            <ShowVideo />
          </Protected>
        ),
      },
      {
        path: "/video/:id/:username",
        element: (
          <Protected authentication >
            <VideoPlayer />
          </Protected>
        ),
      },
      {
        path: "/userchannel/:username",
        element: (
          <Protected authentication >
            <UserChannel />
          </Protected>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
