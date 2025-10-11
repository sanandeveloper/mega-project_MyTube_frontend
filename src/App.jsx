import { useEffect, useState } from "react";

import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./components/store/authSlice";
import Home from "./components/Home";

function App() {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (token) {
      dispatch(getCurrentUser());
    }
  }, [token, status]);

  return (
    <>
      <Home />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
