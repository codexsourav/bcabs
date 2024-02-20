import { Route } from "react-router-dom"
import UserBookings from "../pages/user/userView/UserBookings"
import AccountSetting from "../pages/user/account/AccountSetting"

function UserRoutes() {
    return (
        <>
            <Route path="/account/booking" Component={UserBookings} />
            <Route path="/account/booking/current" Component={UserBookings} />
            <Route path="/account/booking/history" Component={UserBookings} />
            <Route path="/account/setting" Component={AccountSetting} />
        </>
    )
}

export default UserRoutes;