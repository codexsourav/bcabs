import { useEffect, useState } from "react";
import BookingCabInfoBox, { BookingDerails, BookingFormWrapper, BookingInfoWrapper, BookingWrapper } from "../../components/Cabs/BookingTrip";
import { CabService, CabServiceWrapper, FAQWrapper, Label, TripBoxContent } from "../../components/Cabs/CabBox";
import Button from "../../components/Inputbox/Button";
import { InputBox, InputSelectBox } from "../../components/Inputbox/GoogleInputBoc";
import { code_country } from "../../data/sortData";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/stote";
import { IAirportBooking } from "../../interface/booking/Booking";
import { resetAirportBooking, setAirportBooking, setPaymentAirportBooking, setPickupInfoAirportBooking, setTripInfoAirportBooking } from "../../store/provider/booking/airportBookingProvider";
import { apiRequest, withErrorHandling } from "../../helper/apiRequest";
import { IAirportCab } from "../../interface/cabs/cab";
import AirportPayment from "./payment/AirportPayment";
import { IconData } from "../../data/IconData";
import { replacePlaceholders } from "../../utils/helper";
import Loader from "../error/Loader";
import { airportType } from "../../components/formTab/tabs/AirportTab";
import { validateAirportTripBookingFields } from "../../helper/validate/oneWayBookingValidate";

function AirportBooking() {

    const [loading, setLoading] = useState(true)
    const [step, setStep] = useState(0)
    const authResult = new URLSearchParams(window.location.search);

    const id = authResult.get("cabId");
    const trip = authResult.get("trip");
    const airport = authResult.get("airport");
    const location = authResult.get("location");
    const pickupDate = authResult.get("date");
    const pickupTime = authResult.get("time");

    const stateData = useSelector((data: RootState) => data.airportbooking);
    const dispatch = useDispatch();

    const setStateData = (name: keyof IAirportBooking, value: any) => {
        dispatch(setAirportBooking({ name, value }))
    }

    const setTripData = (name: keyof IAirportBooking['tripInfo'], value: any) => {
        dispatch(setTripInfoAirportBooking({ name, value }))
    }

    const setPickupData = (name: keyof IAirportBooking['pickupInfo'], value: any) => {
        dispatch(setPickupInfoAirportBooking({ name, value }))
    }

    const setPayment = (name: keyof IAirportBooking["paymentInfo"], value: any) => {
        dispatch(setPaymentAirportBooking({ name, value }))
    }

    const loadCab = async () => {

        const req = await apiRequest<{ trip: any, cab: IAirportCab }>({ "path": "/api/explore/airport/" + id, method: "POST", data: { trip, from: airport, to: location, pickupDate, pickupTime, } });

        setStateData("cabInfo", req.data.cab);
        setStateData("cabId", req.data.cab._id);
        setTripData("airport", airport)
        setTripData("location", location)
        setTripData("distance", req.data.trip.totalKM)
        setTripData("pickUpdate", pickupDate)
        setTripData("pickUpTime", pickupTime)
        setTripData("trip", +(trip || 0))
        setTripData("type", airportType(+(trip || 0)))
        setPayment("total", req.data.cab.price);
        setPickupData("address", location);
        setPickupData("airport", airport);

        setLoading(false);
    }

    const onError = () => {
        setLoading(false);
    }

    const request = withErrorHandling(loadCab, onError);

    useEffect(() => {
        dispatch(resetAirportBooking());
        request();
    }, []);


    const onSubmit = () => {
        if (validateAirportTripBookingFields(stateData)) {
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

                        <div className="md:col-span-2 ">
                            <Label>Airport</Label>
                            <InputBox readOnly={true} className=" cursor-not-allowed" onChange={(e) => { console.log(e); }} value={stateData.pickupInfo.airport} placeholder="Your Airport Name" />
                        </div>

                        <div className="md:col-span-2">
                            <Label>Address</Label>
                            <InputBox readOnly={true}
                                className=" cursor-not-allowed"
                                onChange={(e) => {
                                    console.log(e);
                                }} value={stateData.pickupInfo.address} placeholder="Your Address" />
                        </div>


                        <div className="md:col-span-2">
                            <Label>Landmark</Label>
                            <InputBox onChange={(e) => { setPickupData("landmark", e) }} value={stateData.pickupInfo.landmark} placeholder="Landmark/Door Number/Building Name" />
                        </div>
                        <Button onClick={onSubmit} variant="primary" className="md:col-span-2 mt-7 uppercase">Proceed</Button>

                    </BookingFormWrapper> : <AirportPayment onBack={() => setStep(0)} />}

                    <BookingInfoWrapper>
                        <BookingDerails>
                            <ul className="my-3 flex flex-col gap-2">
                                <TripBoxContent title="Trip Type" value={airportType(+(trip || 0))} />
                                <TripBoxContent title="Airport" value={stateData.tripInfo.airport} />
                                <TripBoxContent title="Address" value={stateData.tripInfo.location} />
                                <TripBoxContent title="Pickup At" value={`${stateData.tripInfo.pickUpdate} at ${stateData.tripInfo.pickUpTime}`} />
                                <TripBoxContent title="Duration" value={`${stateData.tripInfo.distance} Km`} />
                            </ul>
                        </BookingDerails>
                        <div className=" rounded-2xl shadow-xl  bg-white mt-8">
                            <BookingCabInfoBox
                                inclusions={
                                    <CabServiceWrapper>
                                        {
                                            stateData.cabInfo.inclusions.map((d, i) => <CabService
                                                icon={IconData[d.iconIndex]}
                                                title={replacePlaceholders(d.title, "**KM**", stateData.distance + " KM")}
                                                key={"inclusions-" + i} />)
                                        }
                                    </CabServiceWrapper>
                                }

                                exclusions={
                                    <CabServiceWrapper>
                                        {
                                            stateData.cabInfo.exclusions.map((d, i) => <CabService
                                                icon={IconData[d.iconIndex]}
                                                title={replacePlaceholders(d.title, "**KM**", stateData.distance + " KM")}
                                                key={"exclusions-" + i} />)
                                        }
                                    </CabServiceWrapper>
                                }

                                facilities={
                                    <CabServiceWrapper>
                                        {
                                            stateData.cabInfo.facilities.map((d, i) => <CabService
                                                icon={IconData[d.iconIndex]}
                                                title={replacePlaceholders(d.title, "**KM**", stateData.distance + "Km")}
                                                key={"exclusions-" + i} />)
                                        }
                                    </CabServiceWrapper>
                                }

                                taq={
                                    <FAQWrapper>
                                        {
                                            stateData.cabInfo.taq.map((d, i) => <li key={"taq-" + i} className="text-sm">{replacePlaceholders(d, "**KM**", stateData.distance + "Km")}</li>)
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
export default AirportBooking