import { Route } from "react-router-dom"
import HomeAdmin from "../admin/HomeAdmin"
import LoginAdmin from "../admin/login/LoginAdmin"
import ViewOneWayBooking from "../admin/oneWay/ViewOneWayBooking"
import OneWayAdmin from "../admin/oneWay/OneWayAdmin"
import RoundTripAdmin from "../admin/roundTrip/RoundTripAdmin"
import LocalAdmin from "../admin/local/LocalAdmin"
import AirportAdmin from "../admin/airport/AirportAdmin"
import ManageCabs from "../admin/ManageCabs/ManageCabs"
import UsersAdmin from "../admin/users/UsersAdmin"
import SettingAdmin from "../admin/Settings/SettingAdmin"
import CreateBooking from "../admin/createBooking/CreateBooking"
import OneWayConfirm from "../admin/oneWay/OneWayConfirm"
import AddOneWayCab from "../admin/ManageCabs/add/oneWay/AddOneWayCab"
import AddLocalCab from "../admin/ManageCabs/add/local/AddLocalCab"
import AddRoundTripCab from "../admin/ManageCabs/add/roundTrip/AddRoundTripCab"
import AddAirportCab from "../admin/ManageCabs/add/airport/AddAirportCab"
import ShowBlogs from "../admin/blogs/ShowBlogs"
import AddNewBlog from "../admin/blogs/add/AddNewBlog"
import UpdateOneWayCab from "../admin/ManageCabs/update/oneWay/UpdateOneWayCab"
import UpdateLocalCab from "../admin/ManageCabs/update/local/UpdateLocalCab"
import UpdateRoundTripCab from "../admin/ManageCabs/update/roundTrip/UpdateRoundTripCab"
import UpdateAirportCab from "../admin/ManageCabs/update/airport/UpdateAirportCab"

export const adminRoutePath = "/admin"
function AdminRoutes() {

    return (
        <>

            <Route path={adminRoutePath} Component={HomeAdmin} />
            <Route path={adminRoutePath + "/login"} Component={LoginAdmin} />
            <Route path={adminRoutePath + "/oneway"} Component={OneWayAdmin} />
            <Route path={adminRoutePath + "/oneway/view/:id"} Component={ViewOneWayBooking} />
            <Route path={adminRoutePath + "/oneway/confirm/:id"} Component={OneWayConfirm} />

            <Route path={adminRoutePath + "/roundtrip"} Component={RoundTripAdmin} />
            <Route path={adminRoutePath + "/local"} Component={LocalAdmin} />
            <Route path={adminRoutePath + "/airport"} Component={AirportAdmin} />
            <Route path={adminRoutePath + "/createbooking"} Component={CreateBooking} />

            <Route path={adminRoutePath + "/managecabs"} Component={ManageCabs} />
            <Route path={adminRoutePath + "/managecabs/oneway/add"} Component={AddOneWayCab} />
            <Route path={adminRoutePath + "/managecabs/local/add"} Component={AddLocalCab} />
            <Route path={adminRoutePath + "/managecabs/roundtrip/add"} Component={AddRoundTripCab} />
            <Route path={adminRoutePath + "/managecabs/airport/add"} Component={AddAirportCab} />

            <Route path={adminRoutePath + "/managecabs/oneway/edit/:id"} Component={UpdateOneWayCab} />
            <Route path={adminRoutePath + "/managecabs/local/edit/:id"} Component={UpdateLocalCab} />
            <Route path={adminRoutePath + "/managecabs/roundtrip/edit/:id"} Component={UpdateRoundTripCab} />
            <Route path={adminRoutePath + "/managecabs/airport/edit/:id"} Component={UpdateAirportCab} />

            <Route path={adminRoutePath + "/blogs"} Component={ShowBlogs} />
            <Route path={adminRoutePath + "/blogs/add"} Component={AddNewBlog} />


            <Route path={adminRoutePath + "/users"} Component={UsersAdmin} />
            <Route path={adminRoutePath + "/setting"} Component={SettingAdmin} />
            <Route path={adminRoutePath + "/blog"} Component={LoginAdmin} />
        </>
    )
}
export default AdminRoutes