import { RiArrowRightSLine } from "react-icons/ri"
import { Link, useLocation } from "react-router-dom"

function AccountTabview() {
  const inacriveClass = " text-gray-700 transition-all border-gray-200 hover:text-orange-600 hover:border-orange-200";
  const activeClass = "text-orange-700 border-orange-200 ";
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname == path ? activeClass : inacriveClass;
  }

  return (
    <div className="md:col-span-2 w-full gap-5 ">
      <div className="flex flex-col gap-3 w-full  md:sticky md:top-10 md:mb-24">
        <Link to="/account/booking" className={"flex justify-between items-center h-10 border cursor-pointer p-4 " + isActive("/account/booking")}>
          <p>Upcoming</p>
          <RiArrowRightSLine size={22} />
        </Link>
        <Link to="/account/booking/current" className={"flex justify-between items-center h-10 border  cursor-pointer p-4 " + isActive("/account/booking/current")}>
          <p>Current</p>
          <RiArrowRightSLine size={22} />
        </Link>
        <Link to="/account/booking/history" className={"flex justify-between items-center h-10 border  cursor-pointer p-4 " + isActive("/account/booking/history")}>
          <p>History</p>
          <RiArrowRightSLine size={22} />
        </Link>
        <Link to="/account/setting" className={"flex justify-between items-center h-10 border  cursor-pointer p-4 " + isActive("/account/setting")}>
          <p>Account Setting</p>
          <RiArrowRightSLine size={22} />
        </Link>
        <div onClick={() => { localStorage.clear(); window.location.replace("/") }} className="flex justify-between items-center h-10 border  cursor-pointer p-4 border-gray-200 text-gray-700 hover:text-orange-600 hover:border-orange-200">
          <p>Logout</p>
          <RiArrowRightSLine size={22} />
        </div>
      </div>
    </div>
  )
}
export default AccountTabview