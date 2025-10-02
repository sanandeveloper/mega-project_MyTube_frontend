import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  const authStatus = useSelector((state) => state.auth.status);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (authentication && !authStatus && !token) {
      navigate("/login");
    } else if (!authentication && (authStatus || token)) {
      navigate("/");
    }
    setLoader(false);
  }, [authentication, navigate, authStatus, token]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
