import { Route } from "react-router-dom"
import Login from "../pages/user/Login";
import Signup from "../pages/user/Signup";
import ForgetPassword from "../pages/user/ForgetPassword";
import ResetPassword from "../pages/user/ResetPassword";


function AuthRoutes() {

    return (
        <>
            <Route path="/login" Component={Login} />
            <Route path="/signup" Component={Signup} />
            <Route path="/forgetpassword" Component={ForgetPassword} />
            <Route path="/resetpassword/:id" Component={ResetPassword} />
        </>
    )
}
export default AuthRoutes;