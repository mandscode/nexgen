import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useApiCalls from "../utils/useApiCalls";
import { useDispatch } from "react-redux";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state: any) => state?.token?.token); // Adjust state typing if necessary
  const user = useSelector((state: any) => state?.userDetails?.user); // Adjust state typing if necessary

  useApiCalls(dispatch, token);

  useEffect(() => {
    if (!token || user == "") {
      console.warn("No token found, redirecting to login");
      navigate('/auth/login');
    }
  }, [token, navigate]);

  // Only render children if the user is authenticated
  return token ? <>{children}</> : null;
};

export default ProtectedRoute;
