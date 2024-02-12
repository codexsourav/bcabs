import { useEffect, useState } from "react";
import { ContainerWrapper } from "../wrapper/Wrappers"
import { FaCar } from "react-icons/fa";
import { RiMenu3Fill } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { Link, NavLink, useLocation } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
import { StorageKEY, getLocalStorageData } from "../../helper/storageKeys";

export interface MenuClassProps extends React.HTMLAttributes<HTMLDivElement> { }

function Navbar() {
    const location = useLocation();
    const [show, setShow] = useState(false);
    const [isloginUser, setIsLogin] = useState(false);

    const isLogin = () => {
        if (getLocalStorageData(StorageKEY.user)) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }

    const menuClass: MenuClassProps = {
        className: "fixed flex md:relative flex-col md:flex-row top-0 right-0 w-screen md:w-auto h-screen md:h-full bg-gray-950 md:bg-white z-50 md:flex justify-center items-center gap-9",
    };
    const linkClass: MenuClassProps = {
        className: "font-bold  hover:text-orange-600 transition-all  ",
    };

    useEffect(() => {
        isLogin();
        setShow(false);
    }, [location]);

    return (
        <div className="bg-white h-16 md:h-20 w-full border-b border-orange-100" >
            <ContainerWrapper className="flex justify-between items-center h-full">
                <Link to="/"><img src="/images/logo.png" alt="logo" className="h-12 md:h-16" /></Link>
                <RiMenu3Fill className="text-orange-600 text-3xl block md:hidden" onClick={() => setShow(true)} />
                <div className={`${menuClass.className} ${show ? "flex" : "hidden"}`} >
                    <AiOutlineClose className="absolute md:hidden block text-white text-4xl top-5 right-5 cursor-pointer" onClick={() => setShow(false)} />
                    <ul className="flex md:flex-row flex-col justify-center items-center md:text-lg text-3xl gap-12 md:gap-9" >
                        <li className={` ${linkClass.className} ${location.pathname == "/" ? "text-white md:text-orange-600 " : "md:text-gray-900 text-white "}`}><NavLink to="/" >Home</NavLink></li>
                        <li className={` ${linkClass.className} ${location.pathname.includes("about") ? "text-white md:text-orange-600 " : "md:text-gray-900 text-white "}`}><a href="#">About</a></li>
                        <li className={` ${linkClass.className} ${location.pathname.includes("service") ? "text-white md:text-orange-600 " : "md:text-gray-900 text-white "}`}><a href="#">Services</a></li>
                        <li className={` ${linkClass.className} ${location.pathname.includes("blog") ? "text-white md:text-orange-600 " : "md:text-gray-900 text-white "}`}><a href="#">Blogs</a></li>
                        <li className={` ${linkClass.className} ${location.pathname.includes("contact") ? "text-white md:text-orange-600 " : "md:text-gray-900 text-white "}`}><a href="#">Contact</a></li>
                    </ul>
                    {
                        !isloginUser ? <Link to="/login" className={`h-14 md:h-11 rounded-full font-bold w-52 md:w-28 md:text-lg text-2xl gap-7   md:gap-3 ${location.pathname == "/login" ? "bg-gray-950" : "bg-orange-600"} hover:bg-gray-950 transition-all flex justify-center items-center text-white`}><FaCar /> Login</Link> :
                            <Link to="/account/booking" className={`h-14 md:h-11 rounded-full font-bold w-60 md:w-36 md:text-lg text-2xl gap-7   md:gap-3 ${location.pathname == "/account" ? "bg-gray-950" : "bg-orange-600"} hover:bg-gray-950 transition-all flex justify-center items-center text-white`}><IoPerson /> Account</Link>
                    }
                </div>
            </ContainerWrapper>
        </div>
    )
}

export default Navbar