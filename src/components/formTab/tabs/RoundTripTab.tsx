import { useDispatch, useSelector } from "react-redux";
import { cityOptions } from "../../../utils/mapOptons"
import AutoComplete, { DatePickMe, TimePicker } from "../../Inputbox/GoogleInputBoc"
import { AppDispatch, RootState } from "../../../store/stote";
import { IRoundTripProvider, addNewToData, deleteToData, setRoundTripData, setRoundTripToIndexData } from "../../../store/provider/trips/RoundTripProvider";
import { useState } from "react";
import { Label } from "../../Cabs/CabBox";

function RoundTripTab() {
    const data = useSelector((state: RootState) => state.roundtrip);
    const dispatch = useDispatch<AppDispatch>();
    const setData = (name: keyof IRoundTripProvider, value: string) => {
        dispatch(setRoundTripData({ name, value }));
    }

    const setToData = (index: number, value: string) => {
        dispatch(setRoundTripToIndexData({ index, value }));
    }

    const removeTo = (i: number) => {
        dispatch(deleteToData(i));
    }

    return (
        <div className="grid gap-4 md:grid-cols-5 grid-cols-1 mt-8 md:px-5 px-3 w-full">
            <div className="w-full">
                <Label>FROM</Label>
                <AutoComplete onClear={() => setData("from", "")} value={data.from} options={cityOptions} onPlaceSelect={(e) => setData("from", e?.formatted_address || "")} />
            </div>

            {
                data.to.map((_, i) => {
                    return <div className="w-full" key={"to-" + i}>
                        <div className="flex justify-between items-center"><Label className="font-bold text-sm block mb-1 text-gray-900 " >TO</Label>
                            {(data.to.length - 1) == i && data.to.length != 5 ? <div className="cursor-pointer flex justify-center items-center text-[10px] gap-2 bg-orange-600 px-[8px] select-none py-[2px] text-white rounded-lg shadow" onClick={() => dispatch(addNewToData())}>Add More</div>
                                : <div className="cursor-pointer flex justify-center items-center text-[10px] gap-2 select-none" onClick={() => removeTo(i)}>Remove</div>}
                        </div>
                        <AutoComplete onClear={() => setToData(i, "")} value={data.to[i]} options={cityOptions} onPlaceSelect={(e) => setToData(i, e?.formatted_address || "")} />
                    </div>
                })
            }

            {/* <div className="col-span-1 md:col-span-2 grid gap-4 md:grid-cols-2 grid-cols-2  w-full"> */}
            <div className="w-full md:block hidden">
                <Label>PickUp Date</Label>
                <DatePickMe selectedDate={data.date} setSelectedDate={(e) => setData("date", e)} />
            </div>
            <div className="w-full md:block hidden">
                <Label className=" font-bold text-sm block mb-1 text-gray-900" >Return Date</Label>
                <DatePickMe selectedDate={data.returnDate} setSelectedDate={(e) => setData("returnDate", e)} />
            </div>
            {/* </div> */}

            {/* for mobile */}
            <div className="md:hidden  col-span-1 md:col-span-2 grid gap-4 md:grid-cols-2 grid-cols-2  w-full">
                <div className="w-full">
                    <Label>PickUp Date</Label>
                    <DatePickMe selectedDate={data.date} setSelectedDate={(e) => setData("date", e)} />
                </div>
                <div className="w-full">
                    <Label>Return Date</Label>
                    <DatePickMe selectedDate={data.returnDate} setSelectedDate={(e) => setData("returnDate", e)} />
                </div>
            </div>
            {/* for mobile end  */}

            <div className="w-full">
                <Label>Pickup Time</Label>
                <TimePicker selectedTime={data.time} className="" onChange={(e) => setData("time", e)} />
            </div>
        </div>
    )
}
export default RoundTripTab;