import { ReactNode, useEffect, useState } from "react";
import { MdOutlineAirlineSeatLegroomReduced } from "react-icons/md";
import { MyComponentProps } from "../wrapper/UserWrapper";
import TripTab from "../formTab/TripTab";
import { AiOutlineClose } from "react-icons/ai";
import ExploreButton from "../formTab/ExploreButton";
import { Link, useLocation } from "react-router-dom";
interface ICabBox {
    cabInfo: ReactNode;
    inclusions: ReactNode;
    exclusions: ReactNode;
    facilities: ReactNode;
    taq: ReactNode;
    className?: string;
}
const CabBox: React.FC<ICabBox> = ({ exclusions, facilities, inclusions, taq, cabInfo, className }) => {
    const [tabIndex, setIndex] = useState(0);
    const classTab = "w-full h-full uppercase  border-orange-200 select-none cursor-pointer flex justify-center items-center md:text-[10px] text-[8px] font-bold";
    return (
        <div className={" border-2 border-orange-100 hover:shadow-lg transition-all  rounded-xl overflow-hidden " + className}>

            <div className="">
                <div className="p-4">
                    <div className="grid grid-cols-5 overflow-hidden w-full h-8 bg-white rounded-lg border border-orange-200">
                        <div onClick={() => setIndex(0)} className={`${classTab}  ${tabIndex == 0 ? "bg-orange-600 text-white" : "text-orange-900"}`}>CAB INFO</div>
                        <div onClick={() => setIndex(1)} className={`border-l ${classTab} ${tabIndex == 1 ? "bg-orange-600 text-white" : "hover:bg-orange-100 text-orange-900"}`}>inclusions</div>
                        <div onClick={() => setIndex(2)} className={`border-l ${classTab} ${tabIndex == 2 ? "bg-orange-600 text-white" : "hover:bg-orange-100 text-orange-900"}`}>exclusions</div>
                        <div onClick={() => setIndex(3)} className={`border-l ${classTab} ${tabIndex == 3 ? "bg-orange-600 text-white" : "hover:bg-orange-100 text-orange-900"}`}>facilities</div>
                        <div onClick={() => setIndex(4)} className={`border-l ${classTab} ${tabIndex == 4 ? "bg-orange-600 text-white" : "hover:bg-orange-100 text-orange-900"}`}>T&C</div>
                    </div>
                </div>
            </div>
            {[cabInfo, inclusions, exclusions, facilities, taq][tabIndex]}
        </div>
    )
}
export default CabBox;


export function CabInfo({ maxPassenger, bookLink, carImage, discount, mainPrice, name, price, totalKM }: { name: string, mainPrice: string, price: string, totalKM: string, carImage: string, discount: string, maxPassenger: string, bookLink: string }) {
    return (
        <div className="w-full min-h-52  h-auto relative flex p-5  justify-start items-start flex-col">
            <div className="grid grid-cols-2 w-full ">
                <div className="px-2 flex justify-center items-center font-bold text-[10px] h-6 text-white rounded-md shadow-md bg-orange-600 absolute top-3 right-4">{discount}% OFF</div>
                <div className="flex flex-col gap-1">
                    <h1 className=" text-2xl">{name}</h1>
                    <h2 className="font-extrabold text-2xl text-orange-600">₹{mainPrice}</h2>
                    <h2 className="line-through font-semibold  text-gray-600  text-[13px]">₹{price}</h2>
                    <p className="font-bold text-sm  text-gray-950 mt-1">Upto {totalKM}</p>
                </div>
                <div className="flex justify-end  items-end w-full">
                    <img src={carImage} className="h-32" />
                </div>

            </div>
            <div className="mt-4 flex justify-center items-center gap-3">
                <div className="w-6 h-6 flex justify-center items-center text-white rounded-full bg-orange-600"><MdOutlineAirlineSeatLegroomReduced /></div>
                <p className="font-semibold text-gray-700">Max Passengers {maxPassenger}</p>
            </div>
            <div className="w-full mt-8">
                <Link to={bookLink} className="p-[11px] w-full  font-bold text-orange-500 rounded-xl justify-center items-center flex text-bold bg-orange-100 hover:bg-orange-600 hover:text-white transition-all">BOOK YOUR RIDE</Link>
            </div>
        </div>
    )
}

export const CabServiceWrapper: React.FC<MyComponentProps> = ({ children, className }) => {
    return (
        <div className={"grid grid-cols-3 p-4 gap-x-4 gap-y-2 min-h-64 " + className}>
            {children}
        </div>
    )
}

export function CabService({ icon, title }: { icon: ReactNode, title: string }) {
    return (

        <div className="flex justify-start items-center flex-col">
            <div className="w-10 h-10 bg-orange-600 flex justify-center items-center rounded-full text-lg text-white border-2 border-orange-300">{icon}</div>
            <p className="text-[11px] font-bold p-2 text-center">{title}</p>
        </div>
    )
}

export const FAQWrapper: React.FC<MyComponentProps> = ({ children, className }) => {
    return (
        <div className={"flex flex-col gap-3 min-h-52 pb-5 pt-2 px-8 text-sm" + className}>
            {children}
        </div>
    )
}



export const TripBoxWrapper: React.FC<MyComponentProps> = ({ children, className }) => {
    const [showUpdate, setShowUpdate] = useState(false);
    useEffect(() => {
        showUpdate && (document.body.style.overflow = 'hidden');
        !showUpdate && (document.body.style.overflow = 'unset');

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showUpdate]);

    const location = useLocation();

    useEffect(() => {
        setShowUpdate(false);
    }, [location]);

    return (
        <>
            <div className="relative md:sticky hover:shadow-lg mb-10 md:mb-0 top-0 md:top-20 w-full border-2 rounded-xl overflow-hidden border-orange-100 ">
                <div className="h-10 border-b-2 border-orange-100 flex justify-center items-center uppercase font-bold text-orange-800 "><h1>Trip Info</h1></div>
                <ul className={"flex flex-col gap-3 p-5 " + className}>
                    {children}
                </ul>
                <div onClick={() => setShowUpdate(true)} className="h-11 cursor-pointer border-t-2 border-orange-100   bg-orange-400 hover:bg-orange-600 transition-all text-white flex justify-center items-center uppercase font-bold "><h1>Update My Trip</h1></div>
            </div>

            {showUpdate ? <div className="fixed  w-full h-screen  flex justify-center items-center bg-black/80 z-50 top-0 right-0 ">
                <div onClick={() => setShowUpdate(false)} className="absolute top-4 right-4 text-orange-600 md:text-white text-xl md:text-5xl cursor-pointer z-50"><AiOutlineClose /></div>
                <div className="overflow-y-auto  max-w-[1200px] h-screen md:h-auto md:m-5 p-3 flex flex-col md:justify-center items-center justify-start md:pt-3 pt-14  w-full  bg-white md:rounded-2xl">
                    <TripTab />
                    <div className="w-full">
                        <ExploreButton className=" -mt-14  md:-mt-7" />
                    </div>
                </div>
            </div> : null}
        </>
    )
}

export function TripBoxContent({ title, value }: { title: string, value: string }) {
    return (
        <li className=" text-[14px] font-semibold text-orange-800"><span className=" font-bold text-orange-950">{title}</span> : {value}</li>

    )
}

export const Label: React.FC<MyComponentProps> = ({ children, className }) => {
    return (
        <label className={"font-semibold text-sm block mb-1 text-gray-700 " + className} >{children}</label>
    )
}



export function LocalTab({ setTabindex, tabIndex }: { tabIndex: number, setTabindex: ((e: number) => void) }) {
    const classTab = "w-full h-full uppercase  border-orange-200 select-none cursor-pointer flex justify-center items-center text-[12px] font-bold";

    return (
        <div className="grid grid-cols-4 overflow-hidden w-full h-8 bg-white rounded-lg border border-orange-200">
            <div onClick={() => setTabindex(0)} className={`${classTab}  ${tabIndex == 0 ? "bg-orange-600 text-white" : "text-orange-900"}`}>4 Hr</div>
            <div onClick={() => setTabindex(1)} className={`border-l ${classTab} ${tabIndex == 1 ? "bg-orange-600 text-white" : "hover:bg-orange-100 text-orange-900"}`}>8 Hr</div>
            <div onClick={() => setTabindex(2)} className={`border-l ${classTab} ${tabIndex == 2 ? "bg-orange-600 text-white" : "hover:bg-orange-100 text-orange-900"}`}>12 Hr</div>
            <div onClick={() => setTabindex(3)} className={`border-l ${classTab} ${tabIndex == 3 ? "bg-orange-600 text-white" : "hover:bg-orange-100 text-orange-900"}`}>24 Hr</div>
        </div>
    )
}
