import { useEffect, useState } from "react";
import BookingCabInfoBox, { BookingDerails, BookingFormWrapper, BookingInfoWrapper, BookingWrapper } from "../../components/Cabs/BookingTrip";
import { CabService, CabServiceWrapper, FAQWrapper, Label, TripBoxContent } from "../../components/Cabs/CabBox";
import Button from "../../components/Inputbox/Button";
import AutoComplete, { InputBox, InputSelectBox } from "../../components/Inputbox/GoogleInputBoc";
import { code_country } from "../../data/sortData";
import { addressOptions } from "../../utils/mapOptons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/stote";
import { IRoundTripBooking } from "../../interface/booking/Booking";
import { resetRoundTripBooking, setPaymentRoundTripBooking, setPickupInfoRoundTripBooking, setRoundTripBooking, setTripInfoRoundTripBooking } from "../../store/provider/booking/roundTripBookingProvider";
import { apiRequest, withErrorHandling } from "../../helper/apiRequest";
import Loader from "../error/Loader";
import { IconData } from "../../data/IconData";
import { replacePlaceholders } from "../../utils/helper";
import { validateRoundTripBookingFields } from "../../helper/validate/oneWayBookingValidate";
import RoundTripPayment from "./payment/RoundTripPayment";
import { IRoundTripCab } from "../../interface/cabs/cab";

function RoundTripBooking() {

    const [loading, setLoading] = useState(true)
    const [step, setStep] = useState(0)
    const authResult = new URLSearchParams(window.location.search);

    const id = authResult.get("cabId");
    const from = authResult.get("from");
    const toData = authResult.get("to");
    const to = toData?.split("||");
    const pickupDate = authResult.get("date");
    const returnDate = authResult.get("return");
    const pickupTime = authResult.get("time");

    const stateData = useSelector((data: RootState) => data.roundtripbooking);
    const dispatch = useDispatch();


    const setStateData = (name: keyof IRoundTripBooking, value: any) => {
        dispatch(setRoundTripBooking({ name, value }))
    }

    const setTripData = (name: keyof IRoundTripBooking['tripInfo'], value: any) => {
        dispatch(setTripInfoRoundTripBooking({ name, value }))
    }

    const setPickupData = (name: keyof IRoundTripBooking['pickupInfo'], value: any) => {
        dispatch(setPickupInfoRoundTripBooking({ name, value }))
    }


    const setPayment = (name: keyof IRoundTripBooking["paymentInfo"], value: any) => {
        dispatch(setPaymentRoundTripBooking({ name, value }))
    }


    const loadCab = async () => {

        const req = await apiRequest<{ trip: any, cab: IRoundTripCab }>({ "path": "/api/explore/roundtrip/" + id, method: "POST", data: { from, to, pickupDate, pickupTime, dropDate: returnDate, } });

        setStateData("cabInfo", req.data.cab);
        setStateData("cabId", req.data.cab._id);
        setTripData("from", from)
        setTripData("to", to)
        setTripData("pickUpdate", pickupDate)
        setTripData("pickUpTime", pickupTime)
        setTripData("returnDate", returnDate)
        setPickupData("pickupAddress", from)
        setTripData("distance", req.data.trip.totalKM);
        setPayment("total", req.data.cab.price)
        setLoading(false);
    }

    const onError = () => {
        setLoading(false);
    }

    const request = withErrorHandling(loadCab, onError);



    useEffect(() => {
        dispatch(resetRoundTripBooking());
        request();
    }, [])

    const onSubmit = () => {
        if (validateRoundTripBookingFields(stateData)) {
            setStep(1);
        }
    }


    return (
        <BookingWrapper>
            {loading ? <div className="col-span-1 md:col-span-12 flex justify-center items-center h-96 w-full"> <Loader /></div> :
                <>
                    {step == 0 ? <BookingFormWrapper>
                        <div className="">
                            <Label>Your Name</Label>
                            <InputBox onChange={(e) => { setStateData("name", e) }} value={stateData.name} placeholder="Enter Your Name" />
                        </div>

                        <div className="">
                            <Label>Your Email</Label>
                            <InputBox placeholder="Enter Email ID" onChange={(e) => { setStateData("email", e) }} value={stateData.email} />
                        </div>

                        <div className="w-full md:col-span-2">
                            <Label>Mobile Number</Label>
                            <div className="grid grid-cols-12 w-full">
                                <InputSelectBox onChange={(_) => { }} value={""} className="col-span-3" >
                                    {
                                        code_country.map((e) => {
                                            return <option value={"+" + e} key={e}>+{e}</option>
                                        })
                                    }
                                </InputSelectBox>
                                <div className="col-span-9  border-l-0">
                                    <InputBox onChange={(e) => { setStateData("mobile", e) }} value={stateData.mobile} placeholder="Enter mobile number" type="number" className="w-full" />
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <Label>Pickup Address</Label>
                            <AutoComplete options={addressOptions} onPlaceSelect={(e) => { setPickupData("pickupAddress", e?.formatted_address) }} value={stateData.pickupInfo.pickupAddress} placeholder="Your Pickup Address" />
                        </div>


                        <div className="md:col-span-2">
                            <Label>Landmark</Label>
                            <InputBox onChange={(e) => { setPickupData("pickupLandmark", e) }} value={stateData.pickupInfo.pickupLandmark} placeholder="Landmark/Door Number/Building Name" />
                        </div>
                        <Button onClick={onSubmit} variant="primary" className="md:col-span-2 mt-7 uppercase">Proceed</Button>

                    </BookingFormWrapper> : <RoundTripPayment onBack={() => setStep(0)} />}

                    <BookingInfoWrapper>
                        <BookingDerails>
                            <ul className="my-3 flex flex-col gap-2">
                                <TripBoxContent title="Trip Type" value="OneWay" />
                                <TripBoxContent title="From" value={stateData.tripInfo.from} />
                                <TripBoxContent title="To" value={stateData.tripInfo.to.join(">")} />
                                <TripBoxContent title="Pickup At" value={`${stateData.tripInfo.pickUpdate} at ${stateData.tripInfo.pickUpTime}`} />
                                <TripBoxContent title="Return At" value={`${stateData.tripInfo.returnDate}`} />
                                <TripBoxContent title="Distance" value={`${stateData.tripInfo.distance} KM`} />
                            </ul>
                        </BookingDerails>
                        <div className=" rounded-2xl shadow-xl  bg-white mt-8">
                            <BookingCabInfoBox
                                inclusions={
                                    <CabServiceWrapper>
                                        {
                                            stateData.cabInfo.inclusions.map((d, i) => <CabService
                                                icon={IconData[d.iconIndex]}
                                                title={replacePlaceholders(d.title, "**KM**", stateData.cabInfo.distance + " KM")}
                                                key={"inclusions-" + i} />)
                                        }
                                    </CabServiceWrapper>
                                }

                                exclusions={
                                    <CabServiceWrapper>
                                        {
                                            stateData.cabInfo.exclusions.map((d, i) => <CabService
                                                icon={IconData[d.iconIndex]}
                                                title={replacePlaceholders(d.title, "**KM**", stateData.cabInfo.distance + " KM")}
                                                key={"exclusions-" + i} />)
                                        }
                                    </CabServiceWrapper>
                                }

                                facilities={
                                    <CabServiceWrapper>
                                        {
                                            stateData.cabInfo.facilities.map((d, i) => <CabService
                                                icon={IconData[d.iconIndex]}
                                                title={replacePlaceholders(d.title, "**KM**", stateData.cabInfo.distance + " KM")}
                                                key={"exclusions-" + i} />)
                                        }
                                    </CabServiceWrapper>
                                }

                                taq={
                                    <FAQWrapper>
                                        {
                                            stateData.cabInfo.taq.map((d, i) => <li key={"taq-" + i} className="text-sm">{replacePlaceholders(d, "**KM**", stateData.cabInfo.distance + " KM")}</li>)
                                        }
                                    </FAQWrapper>
                                }
                            />
                        </div>
                    </BookingInfoWrapper>
                </>}
        </BookingWrapper >
    )
}
export default RoundTripBooking