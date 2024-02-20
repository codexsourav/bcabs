import React from "react"
import OneWayTab from "./tabs/OneWayTab"
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from "../../store/stote"
import { setTripIndex } from "../../store/provider/trips/TripIndex";
import RoundTripTab from "./tabs/RoundTripTab";
import LocalTab from "./tabs/LocalTab";
import AirportTab from "./tabs/AirportTab";


function TripTab() {
    const index = useSelector((state: RootState) => state.tripIndex);
    const dispatch = useDispatch<AppDispatch>();
    const setIndex = (i: number) => {
        dispatch(setTripIndex(i));
    }
    const activeClass = "bg-orange-600 text-white ";
    const baseClass = "h-9 flex justify-center items-center cursor-pointer";
    return (
        <div className="mb-20 w-full" >
            <div className="grid select-none grid-cols-4 w-full md:max-w-[400px]  h-9 bg-white m-auto  place-content-center overflow-hidden  text-center rounded font-bold uppercase text-[12px] border">
                <div onClick={() => setIndex(0)} className={`${baseClass} ${(index.value == 0 ? activeClass : null)}`}>One Way</div>
                <div onClick={() => setIndex(1)} className={`${baseClass} border-l  ${(index.value == 1 ? activeClass : null)}`}>Round Trip</div>
                <div onClick={() => setIndex(2)} className={`${baseClass} border-l   ${(index.value == 2 ? activeClass : null)}`}>Local</div>
                <div onClick={() => setIndex(3)} className={`${baseClass} border-l   ${(index.value == 3 ? activeClass : null)}`}>Airport</div>
            </div>
            {[<OneWayTab />, <RoundTripTab />, <LocalTab />, <AirportTab />][index.value]}
        </div>
    )
}
export default React.memo(TripTab)