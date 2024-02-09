import { FaArrowLeft } from "react-icons/fa6";
import { BookingFormWrapper } from "../../../../../components/Cabs/BookingTrip";
import { MyComponentProps } from "../../../../../components/wrapper/UserWrapper";

interface IPaymentWrapper extends MyComponentProps {
    parcent: number,
    setParcent: (e: number) => void,
    onBack: () => void
}

function PaymentWrapper({ parcent, setParcent, onBack, children, className }: IPaymentWrapper) {
    const activeClass = "bg-orange-600 text-white";
    const inactiveClass = "bg-orange-200 text-orange-500";
    return (
        <BookingFormWrapper title="PAYMENT DETAILS" className={className}>
            <div className="absolute top-10 text-orange-600 cursor-pointer" onClick={onBack}><FaArrowLeft /></div>
            <div className="grid grid-cols-2 md:grid-cols-4  gap-6 w-full col-span-2">
                <div onClick={() => setParcent(0)} className={` select-none  rounded-2xl cursor-pointer border-2 border-orange-300 p-3 flex flex-col justify-center items-center gap-2 ${parcent == 0 ? activeClass : inactiveClass}`}>
                    <h1 className="font-bold text-2xl   ">₹0<span className="text-sm ">% now</span></h1>
                    <p className="text-sm font-bold ">₹1976 later</p>
                </div>
                <div onClick={() => setParcent(25)} className={` select-none  rounded-2xl cursor-pointer border-2 border-orange-300 p-3 flex flex-col justify-center items-center gap-2 ${parcent == 25 ? activeClass : inactiveClass}`}>
                    <h1 className="font-bold text-2xl   ">₹25<span className="text-sm ">% now</span></h1>
                    <p className="text-sm font-bold ">₹1976 later</p>
                </div>
                <div onClick={() => setParcent(50)} className={` select-none  rounded-2xl cursor-pointer border-2 border-orange-300 p-3 flex flex-col justify-center items-center gap-2 ${parcent == 50 ? activeClass : inactiveClass}`}>
                    <h1 className="font-bold text-2xl   ">₹50<span className="text-sm ">% now</span></h1>
                    <p className="text-sm font-bold ">₹1976 later</p>
                </div>

                <div onClick={() => setParcent(100)} className={` select-none  rounded-2xl cursor-pointer border-2 border-orange-300 p-3 flex flex-col justify-center items-center gap-2 ${parcent == 100 ? activeClass : inactiveClass}`}>
                    <h1 className="font-bold text-2xl ">₹100<span className="text-sm ">% now</span></h1>
                    <p className="text-sm font-bold ">₹1976 later</p>
                </div>

            </div>

            {
                children
            }
        </BookingFormWrapper>
    )
}
export default PaymentWrapper