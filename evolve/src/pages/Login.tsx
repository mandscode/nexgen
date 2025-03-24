import LoginLayout from "../components/layout/LoginLayout";
import LoginLayoutMobile from "../components/mobile/LoginLayoutMobile";

const Login = () => {

    return (
        <>
        <main className="_login_page">
            <LoginLayout/>
            <LoginLayoutMobile/>
        </main>
        </>
    );
}
 
export default Login;