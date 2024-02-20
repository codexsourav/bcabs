import { useEffect, useState } from "react";
import BookingCabInfoBox, { BookingDerails, BookingFormWrapper, BookingInfoWrapper, BookingWrapper } from "../../components/Cabs/BookingTrip";
import { CabService, CabServiceWrapper, FAQWrapper, Label, TripBoxContent } from "../../components/Cabs/CabBox";
import Button from "../../components/Inputbox/Button";
import AutoComplete, { InputBox, InputSelectBox } from "../../components/Inputbox/GoogleInputBoc";
import { code_country } from "../../data/sortData";
import { addressOptions } from "../../utils/mapOptons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/stote";
import { ILocalBooking } from "../../interface/booking/Booking";
import { resetLocalBooking, setLocalBooking, setPaymentLocalBooking, setPickupInfoLocalBooking, setTripInfoLocalBooking } from "../../store/provider/booking/localBookingProvider";
import { ILocalCab } from "../../interface/cabs/cab";
import { apiRequest, withErrorHandling } from "../../helper/apiRequest";
import { applyDiscount, replacePlaceholders } from "../../utils/helper";
import { IconData } from "../../data/IconData";
import Loader from "../error/Loader";
import LocalPayment from "./payment/LocalPayment";
import { validateLocalTripBookingFields } from "../../helper/validate/oneWayBookingValidate";

function LocalBooking() {

    const [loading, setLoading] = useState(true)
    const [step, setStep] = useState(0)
    const authResult = new URLSearchParams(window.location.search);

    const id = authResult.get("cabId");
    const from = authResult.get("from");
    const hr = authResult.get("hr");
    const pickupDate = authResult.get("date");
    const pickupTime = authResult.get("time");

    const stateData = useSelector((data: RootState) => data.localtripbooking);
    const dispatch = useDispatch();


    const setStateData = (name: keyof ILocalBooking, value: any) => {
        dispatch(setLocalBooking({ name, value }))
    }

    const setTripData = (name: keyof ILocalBooking['tripInfo'], value: any) => {
        dispatch(setTripInfoLocalBooking({ name, value }))
    }

    const setPickupData = (name: keyof ILocalBooking['pickupInfo'], value: any) => {
        dispatch(setPickupInfoLocalBooking({ name, value }))
    }


    const setPayment = (name: keyof ILocalBooking["paymentInfo"], value: any) => {
        dispatch(setPaymentLocalBooking({ name, value }))
    }

    const loadCab = async () => {

        const req = await apiRequest<{ trip: any, cab: ILocalCab }>({ "path": "/api/explore/local/" + id, method: "POST", data: { from, pickupDate, pickupTime, } });

        setStateData("cabInfo", req.data.cab);
        setStateData("cabId", req.data.cab._id);
        setTripData("from", from)
        setTripData("distance", hr)
        setTripData("pickUpdate", pickupDate)
        setTripData("pickUpTime", pickupTime)
        setPickupData("pickupAddress", from)
        setStateData("tripDuration", hr);
        setPayment("total", applyDiscount((req.data.cab.prices[`hr${hr}` as keyof typeof req.data.cab.prices]), req.data.cab.discount));
        setLoading(false);
    }

    const onError = () => {
        setLoading(false);
    }

    const request = withErrorHandling(loadCab, onError);



    useEffect(() => {
        dispatch(resetLocalBooking());
        request();
    }, [])


    const onSubmit = () => {
        if (validateLocalTripBookingFields(stateData)) {
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

                    </BookingFormWrapper> : <LocalPayment onBack={() => setStep(0)} />}

                    <BookingInfoWrapper>
                        <BookingDerails>
                            <ul className="my-3 flex flex-col gap-2">
                                <TripBoxContent title="Trip Type" value="OneWay" />
                                <TripBoxContent title="From" value={stateData.tripInfo.from} />
                                <TripBoxContent title="Pickup At" value={`${stateData.tripInfo.pickUpdate} at ${stateData.tripInfo.pickUpTime}`} />
                                <TripBoxContent title="Duration" value={`${stateData.tripInfo.distance} Hr`} />
                            </ul>
                        </BookingDerails>
                        <div className=" rounded-2xl shadow-xl  bg-white mt-8">
                            <BookingCabInfoBox
                                inclusions={
                                    <CabServiceWrapper>
                                        {
                                            stateData.cabInfo.inclusions.map((d, i) => <CabService
                                                icon={IconData[d.iconIndex]}
                                                title={replacePlaceholders(d.title, "**KM**", hr + " Hr")}
                                                key={"inclusions-" + i} />)
                                        }
                                    </CabServiceWrapper>
                                }

                                exclusions={
                                    <CabServiceWrapper>
                                        {
                                            stateData.cabInfo.exclusions.map((d, i) => <CabService
                                                icon={IconData[d.iconIndex]}
                                                title={replacePlaceholders(d.title, "**KM**", hr + " Hr")}
                                                key={"exclusions-" + i} />)
                                        }
                                    </CabServiceWrapper>
                                }

                                facilities={
                                    <CabServiceWrapper>
                                        {
                                            stateData.cabInfo.facilities.map((d, i) => <CabService
                                                icon={IconData[d.iconIndex]}
                                                title={replacePlaceholders(d.title, "**KM**", hr + " KM")}
                                                key={"exclusions-" + i} />)
                                        }
                                    </CabServiceWrapper>
                                }

                                taq={
                                    <FAQWrapper>
                                        {
                                            stateData.cabInfo.taq.map((d, i) => <li key={"taq-" + i} className="text-sm">{replacePlaceholders(d, "**KM**", hr + " KM")}</li>)
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
export default LocalBooking