
import { useDispatch } from 'react-redux';
import { tokenFailure, tokenRequest, tokenSuccess } from '../../redux/actions/tokenActions';
import { fetchUserById } from '../../redux/actions/userActions';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/api';


import React from "react";
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
} from "mdb-react-ui-kit";
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

  
  const [showModalForOldPassword, setShowModalForOldPassword] = useState(false);
  
  const handleEmailPasswordLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    // dispatch(tokenRequest());
    try {
      const response = await api.post("/users/login", { email, password });
      const { token, message, userId, isMasterAdmin, isFirstLogin } = response.data;
      const user = await getUser(userId);
      if(user.roles) {
          let isAdmin = user.roles.find((role:any) => role.name === "Admin");

          if (!isAdmin) {


      
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
      <MDBContainer className=" d-flex flex-column">
              <form onSubmit={handleEmailPasswordLogin}>
              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                id="form1"
                size='lg'
                className={`form-control-lg login-input ${isResponsive ? "bg-white" : ""}`}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <div className="mb-4 position-relative">

          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="form2"
            type={showPassword ? "text" : "password"}
            className={`form-control-lg login-input ${isResponsive ? "bg-white" : ""}`}
            value={password}
            size='lg'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
              className="position-absolute end-0 translate-middle-y me-3"
              style={{top:'50%', transform:'translateY(-50%)', cursor: "pointer"}}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
            </div>
                {/* <div className="d-flex justify-content-between mx-3 mb-4"> */}
                  {/* <a href="#!">Forgot password?</a> */}
        <MDBBtn className="mb-4 btn-lg">Sign in</MDBBtn>
                {/* </div> */}
              </form>
      </MDBContainer>
      <OldPasswordChangeModal show={showModalForOldPassword} onHide={() => setShowModalForOldPassword(false)} userId={userId}/>
    </>
  );
};

export default LoginMDB;
