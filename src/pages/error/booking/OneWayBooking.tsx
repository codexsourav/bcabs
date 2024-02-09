import BookingCabInfoBox, { BookingDerails, BookingFormWrapper, BookingInfoWrapper, BookingWrapper } from "../../../components/Cabs/BookingTrip";
import { Label, TripBoxContent } from "../../../components/Cabs/CabBox";
import Button from "../../../components/Inputbox/Button";
import AutoComplete, { InputBox, InputSelectBox } from "../../../components/Inputbox/GoogleInputBoc";
import { code_country } from "../../../data/sortData";
import { addressOptions } from "../../../utils/mapOptons";

function OneWayBooking() {
    return (
        <BookingWrapper>
            <BookingFormWrapper>
                <div className="">
                    <Label>Your Name</Label>
                    <InputBox onChange={(e) => { }} value={""} placeholder="Enter Your Name" />
                </div>

                <div className="">
                    <Label>Your Email</Label>
                    <InputBox placeholder="Enter Email ID" onChange={(e) => { }} value={""} />
                </div>

                <div className="w-full md:col-span-2">
                    <Label>Mobile Number</Label>
                    <div className="grid grid-cols-12 w-full">
                        <InputSelectBox onChange={(e) => { }} value={""} className="col-span-3" >
                            {
                                code_country.map((e) => {
                                    return <option value={"+" + e} key={e}>+{e}</option>
                                })
                            }
                        </InputSelectBox>
                        <div className="col-span-9  border-l-0">
                            <InputBox onChange={(e) => { }} value={""} placeholder="Enter mobile number" type="number" className="w-full" />
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <Label>Pickup Address</Label>
                    <AutoComplete options={addressOptions} onPlaceSelect={(e) => { }} placeholder="Your Pickup Address" />
                </div>


                <div className="md:col-span-2">
                    <Label>Landmark</Label>
                    <InputBox onChange={(e) => { }} value={""} placeholder="Landmark/Door Number/Building Name" />
                </div>
                <Button variant="primary" className="md:col-span-2 mt-7 uppercase">Proceed</Button>

            </BookingFormWrapper>

            <BookingInfoWrapper>
                <BookingDerails>
                    <ul className="my-3 flex flex-col gap-2">
                        <TripBoxContent title="Trip Type" value="ssfdf" />
                        <TripBoxContent title="Trip Type" value="ssfdf" />
                        <TripBoxContent title="Trip Type" value="ssfdf" />
                        <TripBoxContent title="Trip Type" value="ssfdf" />
                    </ul>
                </BookingDerails>
                <div className=" rounded-2xl shadow-xl  bg-white mt-8">
                    {/* <BookingCabInfoBox /> */}
                </div>
            </BookingInfoWrapper>
        </BookingWrapper >
    )
}
export default OneWayBooking;

