import Button from "../../../components/Inputbox/Button"
import { InputBox } from "../../../components/Inputbox/GoogleInputBoc";
import { Label } from "../../../components/Cabs/CabBox";
import PaymentWrapper from "./Wrapper/PaymentWrapper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/stote";
import { IAirportBooking } from "../../../interface/booking/Booking";
import { setAirportBooking, setGstInfoAirportBooking, setPaymentAirportBooking } from "../../../store/provider/booking/airportBookingProvider";
import { validateBookingPaymentFields } from "../../../helper/validate/oneWayBookingValidate";


function AirportPayment({ onBack }: { onBack: (() => void) }) {
    const stateData = useSelector((data: RootState) => data.airportbooking);
    const dispatch = useDispatch();

    const setPayment = (name: keyof IAirportBooking["paymentInfo"], value: any) => {
        dispatch(setPaymentAirportBooking({ name, value }))
    }

    const setStateData = (name: keyof IAirportBooking, value: any) => {
        dispatch(setAirportBooking({ name, value }))
    }

    const setGstData = (name: keyof IAirportBooking['gstInfo'], value: any) => {
        dispatch(setGstInfoAirportBooking({ name, value }))
    }

    const onSubmit = () => {
        if (validateBookingPaymentFields(stateData)) {
            console.log(stateData);

            // redirect To Payment
        }
    }


    return (
        <PaymentWrapper setPayment={setPayment} parcent={stateData.paymentInfo.payPercent} price={stateData.paymentInfo.total} setParcent={(e: number) => setPayment("payPercent", e)} onBack={onBack} >
            <div className="flex justify-start col-span-2 mb-2 mt-3  items-center gap-2 font-semibold" ><input checked={stateData.haveGst} onChange={() => setStateData("haveGst", !stateData.haveGst)} type="checkbox" className="font-xl select-none text-gray-900" id="ckeck" /> <label htmlFor="ckeck" className="select-none" >I have a GST Number <span className="text-gray-600">(Optional)</span></label></div>
            {
                stateData.haveGst ? <div className="col-span-2 w-full grid grid-cols-2 gap-4">
                    <div className="">
                        <Label>Company Name</Label>
                        <InputBox value={stateData.gstInfo.companyName} onChange={(e) => setGstData("companyName", e)} />
                    </div>

                    <div className="">
                        <Label>Registration No.</Label>
                        <InputBox value={stateData.gstInfo.gstNumber} onChange={(e) => setGstData("gstNumber", e)} />
                    </div>
                </div> : null
            }
            <Button onClick={onSubmit} variant="primary" className="md:col-span-2 mt-7 uppercase">Proceed</Button>

        </PaymentWrapper>
    )
}
export default AirportPayment

