import { useDispatch, useSelector } from "react-redux";
import { addressOptions, cityOptions } from "../../../utils/mapOptons"
import AutoComplete, { DatePickMe, TimePicker } from "../../Inputbox/GoogleInputBoc"
import { AppDispatch, RootState } from "../../../store/stote";
import { ILocalProvider, setLocalData } from "../../../store/provider/trips/LocalProvider";
import { Label } from "../../Cabs/CabBox";

function LocalTab() {
    const data = useSelector((state: RootState) => state.local);
    const dispatch = useDispatch<AppDispatch>();
    const setData = (name: keyof ILocalProvider, value: string) => {
        dispatch(setLocalData({ name, value }));
    }
    return (
        <div className="grid gap-4 md:grid-cols-3 grid-cols-1 mt-8 md:px-5 px-3 w-full">
            <div className="w-full">
                <Label>Pickup Address</Label>
                <AutoComplete onClear={() => setData("from", "")} value={data.from} options={addressOptions} onPlaceSelect={(e) => setData("from", e?.formatted_address || "")} />
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
export default LocalTab;