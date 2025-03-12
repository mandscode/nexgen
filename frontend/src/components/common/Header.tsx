import { Link, NavLink, useLocation } from "react-router-dom";
import Home from "../../utils/icons/Home";
import Project from "../../utils/icons/Project";
import Academy from "../../utils/icons/Academy";
import { useDispatch } from "react-redux";
import { resetState } from "../../redux/actions/resetStateAction";
import { useSelector } from "react-redux";

const Header = () => {
    const dispatch = useDispatch();
    const location = useLocation();

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
            <header className="_nav">
                <div className="_nav_wrapper _container">
                    <div className="_nav_left">
                        <NavLink to={'/'} className={({ isActive }) => (isActive ? "_nav_item _nav_item" : "_nav_item")}>
                            <img className="_nav_brand_logo" src="/assets/media/images/logo/brand.png"/>
                        </NavLink>
                    </div>
                    <div className="_nav_right">
                        <ul className="_nav_items_left">
                            <NavLink to={'/'} className={({ isActive }) => (isActive ? "_nav_item-active _nav_item" : "_nav_item")}>
                                <Home/>
                                Home
                            </NavLink>
                            <NavLink to={'/projects'} className={({ isActive }) => (isActive ? "_nav_item-active _nav_item" : "_nav_item")}>
                                <Project/>
                                Project
                            </NavLink>
                            <NavLink to={'/academy'} className={({ isActive }) => (isActive ? "_nav_item-active _nav_item" : "_nav_item")}>
                                <Academy/>
                                Academy
                            </NavLink>
                        </ul>
                        {
                            token && token ?
                            <ul className="_nav_items_right">
                                <Link to={'/profile'} className="_button _is_primary">
                                    <svg width={19} height={20} viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_590_4760)">
                                            <circle cx="9.50017" cy="9.14055" r="2.34362" stroke="#F6F6F6" strokeWidth="1.31944" />
                                            <path d="M15.215 17.6292C15.3151 17.9351 15.2387 18.2111 15.0363 18.4347C14.8226 18.6705 14.4677 18.8403 14.062 18.8403L4.93854 18.8403C4.53289 18.8403 4.17793 18.6705 3.96432 18.4347C3.76185 18.2111 3.68542 17.9351 3.78558 17.6292C3.83311 17.484 3.88623 17.3405 3.94487 17.1989C4.24706 16.4693 4.68998 15.8064 5.24836 15.2481C5.80673 14.6897 6.46961 14.2468 7.19916 13.9446C7.9287 13.6424 8.71063 13.4869 9.50029 13.4869C10.2899 13.4869 11.0719 13.6424 11.8014 13.9446C12.531 14.2468 13.1938 14.6897 13.7522 15.2481C14.3106 15.8064 14.7535 16.4693 15.0557 17.1989C15.1143 17.3405 15.1675 17.484 15.215 17.6292Z" stroke="#F6F6F6" strokeWidth="1.31944" />
                                        </g>
                                        <rect x="0.659722" y="1.15972" width="17.6806" height="17.6806" rx="8.84028" stroke="#F6F6F6" strokeWidth="1.31944" />
                                        <defs>
                                            <clipPath id="clip0_590_4760">
                                                <rect y="0.5" width={19} height={19} rx="9.5" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                    Profile
                                </Link>
                                <button className="_button _nav_button_logout" onClick={handleLogout}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" fill="#01276C"/>
                                    </svg>
                                </button>
                            </ul>
                            :
                            <ul className="_nav_items_right">
                                {
                                    location.pathname !== "/auth/login" && (

                                    <Link to={'/auth/login'} className="_button _is_primary">

                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" fill="#ffffff"/>
                                        </svg>
                                        Login/Sign up
                                    </Link>
                                    )
                                }
                                <button className="_button _nav_button_logout" onClick={handleLogout}>
                                </button>
                            </ul>
                        }
                    </div>
                </div>                
            </header>
        </>
    );
}
 
export default Header;