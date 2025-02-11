import { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { LoginForm, LoginStore } from "./LoginStore";
import { useForm } from "react-hook-form";
import * as yup from "yup"

import  "./Login.scss";
import { yupResolver } from '@hookform/resolvers/yup';
import { Eye } from 'react-feather';
import { AppStore } from '../../AppStore';
import {AppContext} from '../../AppContext';
import { useNavigate } from 'react-router-dom';

export interface LoginProps {
 className?: string;
}



const Login = ({ }:LoginProps) => {
  const [loginStore] = useState(() => new LoginStore());
  const appStore = useContext<AppStore>(AppContext);
  const navigator = useNavigate();

  const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required()
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: LoginForm) => loginStore.login(data, appStore, navigator)


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-5 col-xl-4 my-5">
          <h1 className="display-4 text-center mb-3">
            Sign in
          </h1>
          <p className="text-body-secondary text-center mb-5">
            Access dashboard.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label className="form-label">
                Email Address
              </label>
              <input type="text" className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="name@address.com" {...register("email")}/>
              <div className="invalid-feedback">
                {errors.email?.message}
              </div>
            </div>

            
            <div className="form-group">
              <div className="row">
                <div className="col">
                  <label className="form-label">
                    Password
                  </label>
                </div>
                <div className="col-auto">
                  <a href="password-reset-cover.html" className="form-text small text-body-secondary">
                    Forgot password?
                  </a>
                </div>
              </div> 

              
              <div className="input-group input-group-merge">

                
                <input className={`form-control ${errors.password ? 'is-invalid' : ''}`} type="password" placeholder="Enter your password" {...register("password")}/>
                <span className="input-group-text">
                  <Eye className='fe' />
                </span>
              <div className="invalid-feedback">
                {errors.password?.message}
              </div>
              </div>
            </div>

            <button className="btn btn-lg w-100 btn-primary mb-3" type='submit'>
              Sign in
            </button>
            
            <div className="text-center">
              <small className="text-body-secondary text-center">
                Don't have an account yet? <a href="sign-up.html">Sign up</a>.
              </small>
            </div>

          </form>

        </div>
      </div> 
    </div>
  );
};

export default observer(Login);