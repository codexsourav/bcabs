import { MyComponentProps } from "../wrapper/UserWrapper"

interface IViewBooking extends MyComponentProps {
    bookingID: string;
}

function ViewBookingWrapper({ children, className, bookingID }: IViewBooking) {
    return (
        <div className={" px-16 text-gray-900 mb-96 " + className}>
            <div className="border w-full shadow-2xl text-sm">
                <div className="bg-orange-600 text-white h-10  flex justify-center items-center uppercase font-bold">Trip {"#" + bookingID}</div>
                {children}
            </div>
        </div>
    )
}
export default ViewBookingWrapper