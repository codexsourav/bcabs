import { ContainerWrapper } from "../wrapper/Wrappers"
import { FaFacebookF } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";



function Drivers() {
    return (
        <ContainerWrapper className="pt-28  pb-20 bg-orange-50">
            <div className="flex w-full flex-col justify-center items-center text-center gap-5">
                <h1 className="font-bold text-orange-600  text-2xl">DRIVERS</h1>
                <h1 className="font-extrabold text-5xl ">Our Expert Drivers</h1>
            </div>
            <div className="grid md:grid-cols-4 gap-8 mt-20">
                <DriverBox />
                <DriverBox />
                <DriverBox />
                <DriverBox />


            </div>
        </ContainerWrapper>
    )
}
export default Drivers;

function DriverBox() {
    return (
        <>
            <div className="shadow-xl shadow-gray-200  bg-white p-4 rounded-[30px] flex flex-col gap-2 pb-5 mt-32 transition-transform duration-500 transform hover:-translate-y-2">
                <div className="-mt-32 mb-2 relative" >
                    <img src="https://live.themewild.com/taxica/assets/img/team/01.jpg" className="h-80 border-[3px] border-orange-600 p-2 md:h-56 w-full rounded-[50px] object-cover" />
                </div>
                <h1 className="font-bold text-2xl text-center w-full">Alma Mcelroy</h1>
                <p className=" text-gray-500 line-clamp-4 leading-7 text-center">Expert Driver</p>
                <div className=" flex justify-center items-center gap-5">
                    <a href="#" className="h-12 rounded-full font-bold w-12 mt-2 gap-4 border-2 border-orange-600  hover:bg-orange-600 transition-all flex justify-center  items-center text-orange-600 hover:text-white hover:border-orange-300 "><FaFacebookF /></a>
                    <a href="#" className="h-12 rounded-full font-bold w-12 mt-2 gap-4 border-2 border-orange-600  hover:bg-orange-600 transition-all flex justify-center  items-center text-orange-600 hover:text-white hover:border-orange-300 "><AiFillInstagram /></a>
                    <a href="#" className="h-12 rounded-full font-bold w-12 mt-2 gap-4 border-2 border-orange-600  hover:bg-orange-600 transition-all flex justify-center  items-center text-orange-600 hover:text-white hover:border-orange-300 "><FaXTwitter /></a>

                </div>
            </div>

        </>
    )
}
