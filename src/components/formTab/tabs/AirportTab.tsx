import { useDispatch, useSelector } from "react-redux";
import { addressOptions, airportOptions } from "../../../utils/mapOptons"
import AutoComplete, { DatePickMe, TimePicker, TripTypeBox } from "../../Inputbox/GoogleInputBoc"
import { AppDispatch, RootState } from "../../../store/stote";
import { IAirportProvider, setAirportData } from "../../../store/provider/trips/AirportProvider";
import { Label } from "../../Cabs/CabBox";

export function airportType(type: number) {
    return type == 0 ? "Drop Me Airport" : "Pick to Airport"
}

function AirportTab() {
    const data = useSelector((state: RootState) => state.airport);
    const dispatch = useDispatch<AppDispatch>();
    const setData = (name: keyof IAirportProvider, value: string | number) => {
        dispatch(setAirportData({ name, value }));
    }

    console.log(data);

    return (
        <div className="grid gap-4 md:grid-cols-5 grid-cols-1 mt-8 md:px-5 px-3 w-full">
            <div className="w-full">
                <Label>Trip Type</Label>
                <TripTypeBox trip={data.type} onChange={(e) => setData("type", e)} />
            </div>
            <div className="col-span-1 md:col-span-2 grid gap-4 md:grid-cols-2 grid-cols-1  w-full 	">

                <div className={`w-full ${data.type == 1 ? "order-1" : "order-2"}`}>
                    <Label>Airport Name</Label>
                    <AutoComplete onClear={() => setData("airport", "")} value={data.airport} placeholder="Enter Airport Address" options={airportOptions} onPlaceSelect={(e) => setData("airport", `${e?.name}, ${e?.formatted_address}` || '')} />
                </div>
                <div className={`w-full ${data.type == 1 ? "order-2" : "order-1"}`}>
                    <Label>{data.type == 0 ? "Pickup Address" : "Drop Address"}</Label>
                    <AutoComplete onClear={() => setData("location", "")} value={data.location} placeholder={data.type == 0 ? "Enter Pickup Address" : "Enter Drop Address"} options={addressOptions} onPlaceSelect={(e) => setData("location", e?.formatted_address || '')} />
                </div>
            </div>
            <div className="col-span-1 md:col-span-2 grid gap-4 md:grid-cols-2 grid-cols-2  w-full">
                <div className="w-full">
                    <Label>PickUp Date</Label>
                    <DatePickMe selectedDate={data.date} setSelectedDate={(e) => setData("date", e)} />
                </div>
                <div className="w-full">
                    <Label>Pickup Time</Label>
                    <TimePicker selectedTime={data.time} className="" onChange={(e) => setData("time", e)} />
                </div>
            </div>
        </div>
    )
}
export default AirportTab;