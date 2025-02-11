import { useDispatch } from "react-redux";
import { tokenFailure, tokenRequest, tokenSuccess } from "../../redux/actions/tokenActions";
import { createUser } from "../../api/apiEndpoints";
import { fetchUserById } from "../../redux/actions/userActions";
import { Link } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const LoginLayoutMobile = () => {

    const dispatch = useDispatch();

    const handleLoginSuccess = async (credentialResponse:any) => {
        try {
            dispatch(tokenRequest()); // Dispatch token request action
            const token = credentialResponse.credential;

            const response:any = await createUser(token); // API call to validate and get user info
            if (response.status === 200) {
                await dispatch(fetchUserById(Number(response?.data?.id)) as any);
                await dispatch(tokenSuccess(token)); // Dispatch token success action
            } else {
                throw new Error("Login response was not successful.");
            }
        } catch (error:any) {
            dispatch(tokenFailure(error.message)); // Dispatch token failure action
            console.error("Login failed", error);
        }
    };
    
    const handleLoginFailure = () => {
        console.error("Login Failed");
    };

    return (
        <>
            <div className="_login-mobile">
                <div className="_login-mobile_wrapper _container">
                    <h2 className="_login-mobile_title">
                        NEXGEN PROP
                    </h2>

                    <div className="_login-mobile_auth">
                        <a className="_login-mobile_auth_link">
                            <GoogleOAuthProvider clientId="799373350915-tjcsjie1ph3kgboco6fha7lcg5b0dn6u.apps.googleusercontent.com">
                                <div className="_login-mobile_auth_google">
                                    {/* <img src="/assets/media/images/pages/login/login/google_login.png"/> */}
                                    <GoogleLogin
                                        onSuccess={handleLoginSuccess}
                                        onError={handleLoginFailure}
                                    />
                                </div>
                            </GoogleOAuthProvider>
                        </a>

                    </div>

                    <div className="_login-mobile_discover">
                        <div className="_login-mobile_discover_routes">
                            <h6 className="_login-mobile_discover_title">Discover your dream prop</h6>
                            <div className="_login-mobile_services_cards">
                                <Link to={'/projects'} className="_login-mobile_services_card">
                                    <span className="_login-mobile_services_card_icon_wrapper">
                                        <svg className="_login-mobile_services_card_icon" xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28" fill="none">
                                            <path d="M14.5 8.7952L21.9948 5.04482L14.5 1.29443V13.7957" stroke="#E5AF57" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9.50347 13.7832L2.63325 17.7086C2.44101 17.8176 2.28111 17.9758 2.16986 18.1668C2.05861 18.3579 2 18.5751 2 18.7962C2 19.0174 2.05861 19.2345 2.16986 19.4256C2.28111 19.6167 2.44101 19.7748 2.63325 19.8838L13.2509 25.9595C13.6307 26.1789 14.0615 26.2944 14.5 26.2944C14.9385 26.2944 15.3693 26.1789 15.7491 25.9595L26.3668 19.8838C26.559 19.7748 26.7189 19.6167 26.8301 19.4256C26.9414 19.2345 27 19.0174 27 18.7962C27 18.5751 26.9414 18.3579 26.8301 18.1668C26.7189 17.9758 26.559 17.8176 26.3668 17.7086L19.4965 13.7957M7.61728 14.8583L21.3827 22.7341M21.3827 14.8583L7.62977 22.7341" stroke="#E5AF57" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <p className="_login-mobile_services_card_title">Projects</p>
                                </Link>
                                <Link to={'/academy'} className="_login-mobile_services_card">
                                    <span className="_login-mobile_services_card_icon_wrapper">
                                        <svg className="_login-mobile_services_card_icon" xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26" fill="none">
                                            <path d="M12.5062 0.294434V4.26158H13.8537V0.294434H12.5062ZM7.0039 1.48662L5.8999 2.2596L8.17496 5.50848L9.27835 4.73548L7.0039 1.48662ZM19.3557 1.48662L17.0813 4.7355L18.1849 5.5085L20.4599 2.2596L19.3557 1.48662ZM13.1796 5.34702C9.88325 5.34702 7.21104 7.34875 7.21104 9.81837L10.6021 20.0881H15.7577L19.1485 9.81837C19.1485 7.34879 16.4762 5.34702 13.1796 5.34702ZM2.4604 6.53762L2 7.80458L5.72602 9.16112L6.18812 7.89477L2.4604 6.53762ZM23.8992 6.53762L20.1714 7.89487L20.6319 9.16137L24.3597 7.8046L23.8992 6.53762ZM6.00813 12.3295L2.17688 13.3571L2.5245 14.6577L6.35575 13.6316L6.00813 12.3295ZM20.3515 12.3295L20.0041 13.6316L23.8353 14.6575L24.1827 13.3569L20.3515 12.3295ZM10.527 20.8368V22.6219H15.8329V20.837L10.527 20.8368ZM10.527 23.5093V25.2944H15.8329V23.5096L10.527 23.5093Z" fill="#E5AF57" />
                                            <path d="M12.5062 0.294434V4.26158H13.8537V0.294434H12.5062ZM7.0039 1.48662L5.8999 2.2596L8.17496 5.50848L9.27835 4.73548L7.0039 1.48662ZM19.3557 1.48662L17.0813 4.7355L18.1849 5.5085L20.4599 2.2596L19.3557 1.48662ZM13.1796 5.34702C9.88325 5.34702 7.21104 7.34875 7.21104 9.81837L10.6021 20.0881H15.7577L19.1485 9.81837C19.1485 7.34879 16.4762 5.34702 13.1796 5.34702ZM2.4604 6.53762L2 7.80458L5.72602 9.16112L6.18812 7.89477L2.4604 6.53762ZM23.8992 6.53762L20.1714 7.89487L20.6319 9.16137L24.3597 7.8046L23.8992 6.53762ZM6.00813 12.3295L2.17688 13.3571L2.5245 14.6577L6.35575 13.6316L6.00813 12.3295ZM20.3515 12.3295L20.0041 13.6316L23.8353 14.6575L24.1827 13.3569L20.3515 12.3295ZM10.527 20.8368V22.6219H15.8329V20.837L10.527 20.8368ZM10.527 23.5093V25.2944H15.8329V23.5096L10.527 23.5093Z" stroke="#E5AF57" />
                                        </svg>
                                    </span>
                                    <p className="_login-mobile_services_card_title">Academy</p>
                                </Link>
                            </div>
                        </div>
                        <p className="_login-mobile_discover_text">
                            Advanced Investing for the Modern Generation
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default LoginLayoutMobile;