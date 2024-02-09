import Button from "../Inputbox/Button";
import { MyComponentProps } from "../wrapper/UserWrapper";

function AccountTabWrapper({ children, className = "flex flex-col gap-6" }: MyComponentProps) {
    return (
        <div className={"col-span-1 md:col-span-8 w-full md:mt-0 mt-6 mb-24 " + className}>
            {children}
        </div>
    )
}
export default AccountTabWrapper;


export function CabBookingView() {
    return (
        <div className="md:px-4">
            <div className="grid grid-cols-1 md:grid-cols-10 border border-gray-200">
                <div className="col-span-1 md:col-span-2 border-b md:border-b-0 md:border-r border-gray-200 p-5 flex justify-center items-center flex-row md:flex-col gap-3">
                    <p className="text-4xl font-extrabold text-gray-700">04</p>
                    <p className="text-gray-800 text-lg font-bold">Jan 2024</p>
                    <p className="font-semibold text-slate-700">7:00 AM</p>
                </div>
                <div className="col-span-1 md:col-span-8 p-4 text-sm flex md:flex-row flex-col justify-between md:items-center gap-4 md:gap-8">
                    <div className="flex flex-col gap-1">
                        <p className="font-bold text-lg">BABA034334KY</p>
                        <p >Gurgaon, Haryana - Outstation (1090 km)</p>
                        <p> Gurgaon - Patna (One-way drop)</p>
                        <p className="text-[12px]">Booking Amount : Rs. 17472</p>
                    </div>
                    <div className="md:text-right flex flex-col gap-1">
                        <p className="text-[10px]">From: 1335, Arjun Nagar Rd, 1335, Arjun Nagar Rd, Arjun Nagar, Sector 8, Gurugram, Haryana 122006</p>
                        <p className="text-[10px]">Drop: 1335, Arjun Nagar Rd, 1335, Arjun Nagar Rd, Arjun Nagar, Sector 8, Gurugram, Haryana 122006</p>
                        <div className="flex gap-4 mt-3 md:justify-end md:items-end">
                            <Button>Update Trip</Button>
                            <Button variant="danger">Cancel Trip</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
