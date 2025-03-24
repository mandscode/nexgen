import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetState } from "../../redux/actions/resetStateAction";
import { useSelector } from "react-redux";
import { useLayoutEffect, useState } from "react";

const pageNames: { [key: string]: string } = {
    "/": "Home",
    "/profile": "Portfolio",
    "/auth/login": "",
    "/academy": "Academy",
    "/projects": "Projects",
};


const HeaderMobile = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const [activePage, setActivePage] = useState("");

    useLayoutEffect(() => {
        // Map the current pathname to the corresponding page name
        const currentPage = pageNames[location.pathname] || "";
        setActivePage(currentPage);
    }, [location]);

    const handleLogout = async () => {
        // Dispatch logout action
        await dispatch(resetState());
        window.location.href = "/auth/login";
        // Redirect to login page
        // window.location.href = "/login";
    };

    const { token} = useSelector((state: any) => ({
        token: state.token.token
    }));

    return (
        <>
                    {
                        token && token ?
            <header className="_nav-mobile">
                <div className="_nav-mobile_wrapper _container">
                        <div className="_nav-mobile_items">
                            <Link className="_nav-mobile_item" to={'/profile'}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} viewBox="0 0 37 37" fill="none">
                                        <g clipPath="url(#clip0_742_264)">
                                            <circle cx="18.5001" cy="16.6416" r="4.44055" stroke="#F6F6F6" strokeWidth="2.5" />
                                            <path d="M29.3278 32.7253C29.5176 33.305 29.3728 33.8278 28.9892 34.2515C28.5844 34.6984 27.9119 35.02 27.1433 35.02L9.85668 35.02C9.08809 35.02 8.41553 34.6984 8.01079 34.2515C7.62716 33.8278 7.48235 33.305 7.67213 32.7253C7.76219 32.4502 7.86283 32.1782 7.97394 31.91C8.54651 30.5277 9.38573 29.2717 10.4437 28.2137C11.5017 27.1558 12.7577 26.3165 14.14 25.744C15.5223 25.1714 17.0038 24.8767 18.5 24.8767C19.9962 24.8767 21.4777 25.1714 22.86 25.744C24.2423 26.3165 25.4983 27.1558 26.5563 28.2137C27.6142 29.2717 28.4535 30.5277 29.026 31.91C29.1371 32.1782 29.2378 32.4502 29.3278 32.7253Z" stroke="#F6F6F6" strokeWidth="2.5" />
                                        </g>
                                        <rect x="1.75" y="1.52002" width="33.5" height="33.5" rx="16.75" stroke="#F6F6F6" strokeWidth="2.5" />
                                        <defs>
                                            <clipPath id="clip0_742_264">
                                                <rect x="0.5" y="0.27002" width={36} height={36} rx={18} fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                            </Link>

                            <span className="_nav-mobile_item">
                                {activePage}
                            </span>
                            <button className=" _nav-mobile_button_logout" onClick={handleLogout}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" fill="#ffffff"/>
                                </svg>
                            </button>
                        </div>
                </div>                
            </header>
                    :
                        // <div className="">
                        //     <Link className="" to={'/'}>
                        //     {
                        //         location.pathname !== '/auth/login' ?
                        //             <svg width={40} height={41} viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                        //                 <path d="M0.292893 19.3406C-0.0976311 19.7311 -0.0976311 20.3643 0.292893 20.7548L6.65685 27.1188C7.04738 27.5093 7.68054 27.5093 8.07107 27.1188C8.46159 26.7283 8.46159 26.0951 8.07107 25.7046L2.41421 20.0477L8.07107 14.3909C8.46159 14.0004 8.46159 13.3672 8.07107 12.9767C7.68054 12.5861 7.04738 12.5861 6.65685 12.9767L0.292893 19.3406ZM1.81274 19.0477H1L1 21.0477H1.81274L1.81274 19.0477Z" fill="#F6F6F6" />
                        //             </svg>
                        //         :
                        //         null
                        //     }
                        //     </Link>

                        //     <span className="_nav-mobile_item">
                        //         {activePage}
                        //     </span>
                        //     <button className=" _nav-mobile_button_login _button">

                        //     </button>
                        // </div>
                        null
                    }
        </>
    );
}
 
export default HeaderMobile;