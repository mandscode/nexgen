import { NavLink, useLocation } from "react-router-dom";
import Home from "../../utils/icons/Home";
import Academy from "../../utils/icons/Academy";

const NavBottomMobile = () => {
    const location = useLocation();
    return (
        <>
        {
            location.pathname !== "/auth/login" && (
            <div className="_nav-bottom">
                <div className="_nav-bottom_wrapper _container">
                    <NavLink to={'/'} className="_nav-bottom_link">
                        <Home/>
                        Home
                    </NavLink>
                    <NavLink to={'/portfolio'} className="_nav-bottom_link">
                        <svg xmlns="http://www.w3.org/2000/svg" width={21} height={20} viewBox="0 0 21 20" fill="none">
                            <path d="M9.5 12H1.5V18C1.5 18.5304 1.71071 19.0391 2.08579 19.4142C2.46086 19.7893 2.96957 20 3.5 20H17.5C18.0304 20 18.5391 19.7893 18.9142 19.4142C19.2893 19.0391 19.5 18.5304 19.5 18V12H11.5V14H9.5V12ZM9.5 11H0.5V5C0.5 3.9 1.4 3 2.5 3H6.5V2C6.5 1.46957 6.71071 0.960859 7.08579 0.585786C7.46086 0.210714 7.96957 0 8.5 0L12.5 0C13.0304 0 13.5391 0.210714 13.9142 0.585786C14.2893 0.960859 14.5 1.46957 14.5 2V3H18.5C19.0304 3 19.5391 3.21071 19.9142 3.58579C20.2893 3.96086 20.5 4.46957 20.5 5V11H11.5V9H9.5V11ZM12.5 3V2H8.5V3H12.5Z" fill="#949494" className="active-svg"/>
                        </svg>

                        Portfolio
                    </NavLink>
                    <NavLink to={'/projects'} className="_nav-bottom_link">
                        <svg xmlns="http://www.w3.org/2000/svg" width={25} height={24} viewBox="0 0 25 24" fill="none">
                            <mask id="mask0_742_229" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x={2} y={1} width={21} height={22}>
                                <path d="M3.5 10H7.5V17H3.5V10ZM10.5 7H14.5V20H10.5V7Z" fill="#555555" stroke="white" strokeWidth={2} strokeLinejoin="round" />
                                <path d="M12.5 22V20" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M17.5 6H21.5V10.5H17.5V6Z" fill="#555555" stroke="white" strokeWidth={2} strokeLinejoin="round" />
                                <path d="M5.5 10V5M19.5 17V10.5M19.5 6V2" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </mask>
                            <g mask="url(#mask0_742_229)">
                                <path d="M2.8999 2.40002H22.0999V21.6H2.8999V2.40002Z" fill="#949494" className="active-svg"/>
                            </g>
                        </svg>

                        Project
                    </NavLink>
                    <NavLink to={'/academy'} className="_nav-bottom_link">
                        <Academy/>
                        Academy
                    </NavLink>
                </div>
            </div>
        )}
        </>
    );
}
 
export default NavBottomMobile;