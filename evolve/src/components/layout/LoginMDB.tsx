
import { useDispatch } from 'react-redux';
import { tokenFailure, tokenRequest, tokenSuccess } from '../../redux/actions/tokenActions';
import { fetchUserById } from '../../redux/actions/userActions';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/api';


import React from "react";
import { Eye, EyeOff } from 'react-feather';
import OldPasswordChangeModal from './OldPasswordChangeModal';
import { getUser } from '../../api/apiEndpoints';

interface LoginMDBProps {
  isResponsive?: boolean; // Optional prop
}

const LoginMDB: React.FC<LoginMDBProps> = ({isResponsive}) => {

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle State

  const [userId, setUserId] = useState("");
  const [isFirstLoginState, setIsFirstLogin] = useState("");

  
  const [showModalForOldPassword, setShowModalForOldPassword] = useState(false);
  
  const handleEmailPasswordLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    // dispatch(tokenRequest());
    try {
      const response = await api.post("/users/login", { email, password, entity:2 });
      const { token, message, userId, isMasterAdmin, isFirstLogin } = response.data;
      const user = await getUser(userId);
      if(user.roles) {
          let isAdmin = user.roles.find((role:any) => role.name === "Admin");

          if (!isAdmin) {


      setIsFirstLogin(isFirstLogin)
      if(isFirstLogin) {
        setUserId(userId)
        setShowModalForOldPassword(true)
      } else if(token) {  

        await dispatch(tokenSuccess(token));
        await dispatch(fetchUserById(Number(userId)) as any);
      }
    }
    else {
      alert("you have not permission to login")
    }
  }
      // Redirect to the dashboard or home page (if needed)
    } catch (err: any) {
      dispatch(tokenFailure(err.message));
      alert("Invalid email or password");
    }
  };

  return (
    <>
    <div className="login-container">
      {
        showModalForOldPassword ?

        <OldPasswordChangeModal
                  show={showModalForOldPassword}
                  onHide={() => setShowModalForOldPassword(false)}
                  userId={userId} 
                  email={email}
                  isFirstLogin={isFirstLoginState}
                />
                :
      <div className="login-box">
        <form onSubmit={handleEmailPasswordLogin} className="login-form">
          {/* Email Field */}
          <div className="input-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              />
          </div>

          {/* Password Field */}
          <div className="input-group password-group">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* Toggle Password Visibility */}
            <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          {/* Submit Button */}
          <button type="submit" className="login-button">Sign in</button>
        </form>
      </div>
      }


    </div>
    </>
  );
};

export default LoginMDB;
