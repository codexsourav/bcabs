import { useDispatch, useSelector } from "react-redux";
import BookingCabInfoBox, { BookingDerails, BookingFormWrapper, BookingInfoWrapper, BookingWrapper } from "../../components/Cabs/BookingTrip";
import { CabService, CabServiceWrapper, FAQWrapper, Label, TripBoxContent } from "../../components/Cabs/CabBox";
import Button from "../../components/Inputbox/Button";
import AutoComplete, { InputBox, InputSelectBox } from "../../components/Inputbox/GoogleInputBoc";
import { code_country } from "../../data/sortData";
import { addressOptions } from "../../utils/mapOptons";
import { RootState } from "../../store/stote";
import { IOneWayBooking } from "../../interface/booking/Booking";
import { resetOneWayBooking, setOneWayBooking, setPaymentOneWayBooking, setPickupInfoOneWayBooking, setTripInfoOneWayBooking } from "../../store/provider/booking/OneWayBookingProvider";
import { useEffect, useState } from "react";
import { IOneWayCab } from "../../interface/cabs/cab";
import { apiRequest, withErrorHandling } from "../../helper/apiRequest";
import Loader from "../error/Loader";
import { replacePlaceholders } from "../../utils/helper";
import { IconData } from "../../data/IconData";
import OneWayPayment from "./payment/OneWayPayment";
import { validateOneWayBookingFields } from "../../helper/validate/oneWayBookingValidate";

function OneWayBooking() {

    const [loading, setLoading] = useState(true)
    const [step, setStep] = useState(0)
    const authResult = new URLSearchParams(window.location.search);

    const id = authResult.get("cabId");
    const from = authResult.get("from");
    const to = authResult.get("to");
    const pickupDate = authResult.get("date");
    const pickupTime = authResult.get("time");

    const loadCab = async () => {

        const req = await apiRequest<{ trip: any, cab: IOneWayCab }>({ "path": "/api/explore/oneway/" + id, method: "POST", data: { from, to, pickupDate, pickupTime } });

        setStateData("cabInfo", req.data.cab);
        setStateData("cabId", req.data.cab._id);
        setTripData("from", from)
        setTripData("to", to)
        setTripData("pickUpdate", pickupDate)
        setTripData("pickUpTime", pickupTime)
        setPickupData("pickupAddress", from)
        setPickupData("dropAddress", to)
        setPayment("total", req.data.cab.price);
        setTripData("distance", req.data.trip.totalKM);
        setLoading(false);
    }

    const onError = () => {
        setLoading(false);
    }

    const request = withErrorHandling(loadCab, onError);



    const stateData = useSelector((data: RootState) => data.onewaybooking);
    const dispatch = useDispatch();

    const setPayment = (name: keyof IOneWayBooking["paymentInfo"], value: any) => {
        dispatch(setPaymentOneWayBooking({ name, value }))
    }

    const setStateData = (name: keyof IOneWayBooking, value: any) => {
        dispatch(setOneWayBooking({ name, value }))
    }

    const setTripData = (name: keyof IOneWayBooking['tripInfo'], value: any) => {
        dispatch(setTripInfoOneWayBooking({ name, value }))
    }

    const setPickupData = (name: keyof IOneWayBooking['pickupInfo'], value: any) => {
        dispatch(setPickupInfoOneWayBooking({ name, value }))
    }




    useEffect(() => {
        dispatch(resetOneWayBooking());
        request();
    }, [])

    const onSubmit = () => {
        if (validateOneWayBookingFields(stateData)) {
            setStep(2);
        }
    }


    return (
        <BookingWrapper>
            {
                loading ? <div className="col-span-1 md:col-span-12 flex justify-center items-center h-96 w-full"> <Loader /></div> : <>
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

                        <div className="md:col-span-2">
                            <Label>Drop Address</Label>
                            <AutoComplete options={addressOptions} onPlaceSelect={(e) => { setPickupData("dropAddress", e?.formatted_address) }} value={stateData.pickupInfo.dropAddress} placeholder="Your Drop Address" />
                        </div>


                        <div className="md:col-span-2">
                            <Label>Drop Landmark</Label>
                            <InputBox onChange={(e) => { setPickupData("dropLandmark", e) }} value={stateData.pickupInfo.dropLandmark} placeholder="Landmark/Door Number/Building Name" />
                        </div>
                        <Button variant="primary" onClick={onSubmit} className="md:col-span-2 mt-7 uppercase">Proceed</Button>

                    </BookingFormWrapper> : <OneWayPayment onBack={() => { setStep(0) }} />}
                    <BookingInfoWrapper>
                        <BookingDerails>
                            <ul className="my-3 flex flex-col gap-2">
                                <TripBoxContent title="Trip Type" value="OneWay" />
                                <TripBoxContent title="From" value={stateData.tripInfo.from} />
                                <TripBoxContent title="To" value={stateData.tripInfo.to} />
                                <TripBoxContent title="Pickup At" value={`${stateData.tripInfo.pickUpdate} at ${stateData.tripInfo.pickUpTime}`} />
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
                </>
            }

        </BookingWrapper >
    )
}
export default OneWayBooking;

