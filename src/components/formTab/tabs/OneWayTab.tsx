import { useDispatch, useSelector } from "react-redux";
import { cityOptions } from "../../../utils/mapOptons"
import AutoComplete, { DatePickMe, TimePicker } from "../../Inputbox/GoogleInputBoc"
import { AppDispatch, RootState } from "../../../store/stote";
import { IOneWayProvider, setOneWayData } from "../../../store/provider/trips/OneWayProvider";
import { Label } from "../../Cabs/CabBox";

function OneWayTab() {
    const data = useSelector((state: RootState) => state.oneway);
    const dispatch = useDispatch<AppDispatch>();
    const setData = (name: keyof IOneWayProvider, value: string) => {
        dispatch(setOneWayData({ name, value }));
    }
    return (
        <div className="grid gap-4 md:grid-cols-4 grid-cols-1 mt-8 md:px-5 px-3 w-full">
            <div className="w-full">
                <Label>FROM</Label>
                <AutoComplete onClear={() => setData("from", "")} value={data.from} options={cityOptions} onPlaceSelect={(e) => setData("from", e?.formatted_address!)} />
            </div>
            <div className="w-full">
                <Label>TO</Label>
                <AutoComplete onClear={() => setData("to", "")} value={data.to} options={cityOptions} onPlaceSelect={(e) => setData("to", e?.formatted_address!)} />
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
export default OneWayTab