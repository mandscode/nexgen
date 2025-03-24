import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

const Auth: React.FC = () => {
  const navigate = useNavigate();

  const { token, loading, error, user } = useSelector((state: any) => ({
    token: state.token?.token,
    loading: state.token?.loading,
    error: state.token?.error,
    user: state.userDetails?.user
  }));

  // useApiCalls(dispatch, token);

  useEffect(() => {
    if (!token || user == "" || error) {
      console.warn("Redirecting to login");
      navigate("/auth/login");
    } else {
      console.warn("Token found, redirecting to home");
      navigate("/"); // Redirect to a protected route or home if token exists
    }
  }, [token, navigate]);

  if (loading)
    return (
      <div className="smart-glass">
        <div className="logo">
          <div className="circle">
            <div className="circle">
              <div className="circle"></div>
            </div>
          </div>
          <div className="loading-text">Loading...</div>
        </div>
      </div>
    );

  // if (error) return <div>Error: {error.message || error}</div>;

  return <Outlet />;
};

export default Auth;
