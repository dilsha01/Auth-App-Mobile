import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // When user lands on /dashboard from the backend
    navigate("/dashboard");
  }, [navigate]);

  return null; // No UI needed, just redirects
};

export default RedirectHandler;
