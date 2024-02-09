import { Link, useLocation } from "react-router-dom"
import { RiSettings4Fill } from "react-icons/ri";
import { IoIosExit } from "react-icons/io";
import { FaCar, FaPlaneArrival } from "react-icons/fa";
import { IoCarSport } from "react-icons/io5";
import { RiUserSettingsFill } from "react-icons/ri";
import { FaCarSide, FaCarOn } from "react-icons/fa6";
import { PiCarFill } from "react-icons/pi";
import { TbDashboard } from "react-icons/tb";
import { adminRoutePath } from "../../routes/AdminRoutes";
import { clearLocalStorageData } from "../../helper/storageKeys";
import { SiWritedotas } from "react-icons/si";


function AdminMenu() {
    const activeClass = "bg-orange-600 text-white hover:bg-orange-700 ";
    const base = "hover:bg-orange-100 border-b border-t-0 border font-normal  transition-all";
    const location = useLocation();
    const isActive = (path: string) => {
        return location.pathname.includes(path) ? `${base} ${activeClass}` : `${base}  text-gray-700`
    }
    return (
        <div className="w-full   m-5 ">
            <ul className="w-full">
                <li className={(location.pathname == "/admin") || (location.pathname == "/admin/") ? "hover:bg-orange-700  border-b border-t border  font-normal " + activeClass : "text-gray-700 border-b border-t border  font-normal hover:bg-orange-100"}>
                    <Link to={adminRoutePath} className="flex justify-start gap-2 items-center px-4 py-3">
                        <TbDashboard />   Dashboard
                    </Link>
                </li>
                <li className={isActive(adminRoutePath + "/oneway")}><Link to={adminRoutePath + "/oneway"} className="flex justify-start gap-2 items-center h-full w-full px-4 py-3"><PiCarFill />   OneWay</Link></li>
                <li className={isActive(adminRoutePath + "/roundtrip")}><Link to={adminRoutePath + "/roundtrip"} className="flex justify-start gap-2 items-center h-full w-full px-4 py-3"><FaCarSide />   RoundTrip</Link></li>
                <li className={isActive(adminRoutePath + "/local")}><Link to={adminRoutePath + "/local"} className="flex justify-start gap-2 items-center h-full w-full px-4 py-3"><FaCarOn />   Local</Link></li>
                <li className={isActive(adminRoutePath + "/airport")}><Link to={adminRoutePath + "/airport"} className="flex justify-start gap-2 items-center h-full w-full px-4 py-3"><FaPlaneArrival />   Airport</Link></li>
                <li className={isActive(adminRoutePath + "/createbooking")}><Link to={adminRoutePath + "/createbooking"} className="flex justify-start gap-2 items-center h-full w-full px-4 py-3"><IoCarSport />    Create Booking</Link></li>
                <li className={isActive(adminRoutePath + "/managecabs")}><Link to={adminRoutePath + "/managecabs"} className="flex justify-start gap-2 items-center h-full w-full px-4 py-3"><FaCar />   Manage Cabs</Link></li>
                <li className={isActive(adminRoutePath + "/blogs")}><Link to={adminRoutePath + "/blogs"} className="flex justify-start gap-2 items-center h-full w-full px-4 py-3"><SiWritedotas />   Blogs</Link></li>

                <li className={isActive(adminRoutePath + "/users")}><Link to={adminRoutePath + "/users"} className="flex justify-start gap-2 items-center h-full w-full px-4 py-3"><RiUserSettingsFill />   Users</Link></li>
                <li className={isActive(adminRoutePath + "/setting")}><Link to={adminRoutePath + "/setting"} className="flex justify-start gap-2 items-center h-full w-full px-4 py-3"><RiSettings4Fill />   Settings</Link></li>
                <li className={isActive(adminRoutePath + "/logout")}><p onClick={() => {
                    clearLocalStorageData();
                    window.location.replace(adminRoutePath + "/login")
                }} className="flex justify-start gap-2 items-center h-full w-full px-4 py-3"><IoIosExit />   Logout</p></li>
            </ul>
        </div>
    )
}
export default AdminMenu