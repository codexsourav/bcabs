import { ReactNode, useState } from "react";
import { MyComponentProps, UserWrapper } from "../wrapper/UserWrapper";
import { ContainerWrapper } from "../wrapper/Wrappers";

interface ICabBox {
    inclusions: ReactNode;
    exclusions: ReactNode;
    facilities: ReactNode;
    taq: ReactNode;
    className?: string;
}

const BookingCabInfoBox: React.FC<ICabBox> = ({ exclusions, facilities, inclusions, taq, className }) => {
    const [tabIndex, setIndex] = useState(0);
    const classTab = "w-full h-full uppercase  border-orange-200 select-none cursor-pointer flex justify-center items-center text-[10px] font-bold";
    return (
        <div className={" border-2 border-orange-100 hover:shadow-lg transition-all  rounded-xl overflow-hidden " + className}>

            <div className="border-b-2 border-orange-100">
                <div className="p-4">
                    <div className="grid grid-cols-4 overflow-hidden w-full h-8 bg-white rounded-lg border border-orange-200">
                        <div onClick={() => setIndex(0)} className={`${classTab} ${tabIndex == 0 ? "bg-orange-600 text-white" : "hover:bg-orange-100 text-orange-900"}`}>inclusions</div>
                        <div onClick={() => setIndex(1)} className={`border-l ${classTab} ${tabIndex == 1 ? "bg-orange-600 text-white" : "hover:bg-orange-100 text-orange-900"}`}>exclusions</div>
                        <div onClick={() => setIndex(2)} className={`border-l ${classTab} ${tabIndex == 2 ? "bg-orange-600 text-white" : "hover:bg-orange-100 text-orange-900"}`}>facilities</div>
                        <div onClick={() => setIndex(3)} className={`border-l ${classTab} ${tabIndex == 3 ? "bg-orange-600 text-white" : "hover:bg-orange-100 text-orange-900"}`}>T&C</div>
                    </div>
                </div>
            </div>
            {[inclusions, exclusions, facilities, taq][tabIndex]}
        </div>
    )
}

export default BookingCabInfoBox;

export function BookingWrapper({ children, className }: MyComponentProps) {
    return (
        <UserWrapper className="bg-orange-50 pt-11 ">
            <ContainerWrapper className={"grid grid-cols-1 md:grid-cols-12  gap-10 pb-16 " + className}>
                {children}
            </ContainerWrapper>
        </UserWrapper>
    )
}

interface IBookingWrapper extends MyComponentProps {
    title?: string,
}

export function BookingFormWrapper({ children, className, title = "CONTACT & PICKUP DETAILS" }: IBookingWrapper) {
    return <div className={"md:col-span-7 relative " + className}>
        <div className=" shadow-xl  rounded-2xl p-8 bg-white">
            <h1 className="font-bold uppercase text-xl text-orange-600 text-center mb-6">{title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
                {children}
            </div>
        </div>
    </div>
}

export function BookingInfoWrapper({ children, className }: MyComponentProps) {
    return <div className={"w-full col-span-1 md:col-span-5 " + className}>
        {children}
    </div>
}

export function BookingDerails({ children, className }: MyComponentProps) {
    return <div className={" rounded-2xl shadow-xl px-8 py-7 bg-white " + className}>
        <h1 className="font-bold uppercase text-xl text-orange-600">BOOKING DETAILS</h1>
        {children}
    </div>
}