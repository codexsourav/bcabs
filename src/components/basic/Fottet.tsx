import { ReactNode } from "react";
import { ContainerWrapper } from "../wrapper/Wrappers";
import { LuPhoneCall } from "react-icons/lu";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { HiLocationMarker } from "react-icons/hi";
import { BiSolidRightArrow } from "react-icons/bi";
import { FiSend } from "react-icons/fi";


function Fottet() {
    return (
        <div className="bg-[#111111]">
            <div className="bg-[url('/images/shape.png')]  h-10 w-full bg-orange-600 "></div>

            <ContainerWrapper className=" grid grid-cols-1 md:grid-cols-10 gap-6 py-11  text-white">
                <div className="flex flex-col gap-7 col-span-3">
                    <img src="/images/logo.png" className="w-36" />
                    <p>We are many variations of passages available but the majority have suffered alteration in some form by injected humour words believable.</p>

                    <div className="flex flex-col gap-4">
                        <FottetTab icon={<LuPhoneCall />} title="01169266014" />
                        <FottetTab icon={<MdOutlineMarkEmailRead />} title="support@babagcabs.com" />
                        <FottetTab icon={<HiLocationMarker />} title="Sheetla Colony, Sector-6, Gurgaon Haryana 122006" />
                    </div>
                </div>
                <div className="col-span-4 grid grid-cols-2 mt-10">
                    <div className="">
                        <h1 className="text-xl md:text-2xl font-bold uppercase ">Quick Links</h1>
                        <ul className="flex flex-col gap-8 mt-8">
                            <li className="transition-transform duration-500 transform hover:translate-x-2"><a href="#" className="flex justify-start items-center gap-2"><BiSolidRightArrow size={14} className="text-orange-600" /> About US</a></li>
                            <li className="transition-transform duration-500 transform hover:translate-x-2"><a href="#" className="flex justify-start items-center gap-2"><BiSolidRightArrow size={14} className="text-orange-600" /> Update News</a></li>
                            <li className="transition-transform duration-500 transform hover:translate-x-2"><a href="#" className="flex justify-start items-center gap-2"><BiSolidRightArrow size={14} className="text-orange-600" /> Terms Of Service</a></li>
                            <li className="transition-transform duration-500 transform hover:translate-x-2"><a href="#" className="flex justify-start items-center gap-2"><BiSolidRightArrow size={14} className="text-orange-600" /> Privacy policy</a></li>
                            <li className="transition-transform duration-500 transform hover:translate-x-2"><a href="#" className="flex justify-start items-center gap-2"><BiSolidRightArrow size={14} className="text-orange-600" /> Our Drivers</a></li>
                        </ul>
                    </div>
                    <div className="">
                        <h1 className="text-xl md:text-2xl font-bold uppercase">Support</h1>
                        <ul className="flex flex-col gap-8 mt-8">
                            <li className="transition-transform duration-500 transform hover:translate-x-2"><a href="#" className="flex justify-start items-center gap-2"><BiSolidRightArrow size={14} className="text-orange-600" /> FAQ's</a></li>
                            <li className="transition-transform duration-500 transform hover:translate-x-2"><a href="#" className="flex justify-start items-center gap-2"><BiSolidRightArrow size={14} className="text-orange-600" /> Booking Tips</a></li>
                            <li className="transition-transform duration-500 transform hover:translate-x-2"><a href="#" className="flex justify-start items-center gap-2"><BiSolidRightArrow size={14} className="text-orange-600" /> Book A Ride</a></li>
                            <li className="transition-transform duration-500 transform hover:translate-x-2"><a href="#" className="flex justify-start items-center gap-2"><BiSolidRightArrow size={14} className="text-orange-600" /> Download App</a></li>
                            <li className="transition-transform duration-500 transform hover:translate-x-2"><a href="#" className="flex justify-start items-center gap-2"><BiSolidRightArrow size={14} className="text-orange-600" /> Contact Us</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-span-3 mt-10 flex flex-col  gap-5 md:gap-10">
                    <div className="">
                        <h1 className="text-xl md:text-2xl font-bold uppercase">Newsletter</h1>
                    </div>
                    <p>Subscribe Our Newsletter To Get Latest Update And News</p>
                    <div className="">
                        <input className="w-full px-5 py-4 rounded-3xl" placeholder="Email ID" />
                        <a href="#" className="h-14 mt-5 w-full rounded-full font-bold  gap-6  bg-orange-600 hover:bg-gray-950 transition-all flex justify-center items-center text-white">Subscribe Now <FiSend /></a>

                    </div>
                </div>
            </ContainerWrapper>
            <div className="h-20 w-full bg-[#181818]  justify-center items-center border-b-[4px] border-orange-600">
                <ContainerWrapper className="w-full flex justify-center items-center h-full">
                    <p className=" text-white">© Copyright 2024 babagcabs All Rights Reserved.</p>
                </ContainerWrapper>
            </div>
        </div>
    )
}
export default Fottet;

function FottetTab({ icon, title }: { title: string, icon: ReactNode }) {
    return (
        <div className="flex justify-start items-center gap-5">
            <div className=""><div className="bg-orange-600 w-11 h-11 flex justify-center items-center text-lg rounded-full">{icon}</div></div>
            <p className="text-lg">{title}</p>
        </div>
    )
}
