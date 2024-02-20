import { HiOutlineBell } from "react-icons/hi2";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

function AdminNavbar() {
  const [show, setShow] = useState(false)
  return (
    <div className="w-full h-16 border-b flex justify-between items-center px-5">
      <img src="/images/logo.png" className="h-12" />
      <div className="flex justify-center items-center gap-10 text-gray-600">
        <Link to="/vender"><HiOutlineBell size={30} /></Link>
        <div className="cursor-pointer" onClick={() => setShow(!show)}><FaUserCircle size={30} /></div>
      </div>
      {show ? <ul className="absolute right-0 top-16 flex flex-col gap-6 p-6 border bg-white text-gray-800 border-t-0 z-40">
        <Link to="/">View Profile</Link>
        <Link to="/">Account Setting</Link>
        <li className="cursor-pointer" onClick={() => {
          localStorage.clear();
          window.location.replace("/");
        }}>Logout</li>
      </ul> : null}
    </div>
  )
}

export default AdminNavbar;