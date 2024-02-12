import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/stote";
import { INewRoundTripCab, setNewRoundTripCabData } from "../../../../../store/provider/addCabs/AddRoundTripCabProvider";
import { toast } from "react-toastify";
import { Label } from "../../../../../components/Cabs/CabBox";
import { InputBox, InputSelectBox } from "../../../../../components/Inputbox/GoogleInputBoc";
import Button from "../../../../../components/Inputbox/Button";
import { PickImageFile } from "../../../../../components/picker/ImagePicker";

function AddRoundTripStep1() {
    const data = useSelector((state: RootState) => state.addroundtripcab);
    const dispatch = useDispatch<AppDispatch>();

    const setData = (name: keyof INewRoundTripCab, value: any) => {
        dispatch(setNewRoundTripCabData({ name, value }))
    }


    const goNextStep = () => {
        if (data.cabName.trim().length == 0 || data.image == "" || data.maxPassengers == "") {
            toast.error("Enter Valid Cab Info");
        } else {
            setData("step", 1);
        }
    };
    return (
        <div>
            <div className="grid grid-cols-3 mt-8 gap-6">
                <div className="">
                    <Label>Trip Type</Label>
                    <InputSelectBox
                        value={data.trip} onChange={(e) => {
                            console.log(e);
                        }}>
                        <option disabled={true} value={data.trip}>{data.trip}</option>
                    </InputSelectBox>
                </div>

                <div className="">
                    <Label>Cab Image <span className="text-[12px] font-normal">(recommended .png)</span></Label>
                    <PickImageFile
                        value={data.image}
                        placeholder="Select A Image"
                        onChange={(e: any) => {
                            setData("image", e)
                        }} />
                </div>
                <div className="">
                    <Label>Cab Name</Label>
                    <InputBox value={data.cabName} onChange={(e) => { setData("cabName", e) }} />
                </div>
                <div className="">
                    <Label>Max Passengers</Label>
                    <InputBox value={data.maxPassengers} onChange={(e) => { setData("maxPassengers", e) }} />
                </div>
                <div className="">
                    <Label>Price / KM</Label>
                    <InputBox value={data.pricePerKm} onChange={(e) => { setData("pricePerKm", +e) }} />
                </div>
                <div className="">
                    <Label>Discount %</Label>
                    <InputBox value={data.discount} type="number" onChange={(e) => { setData("discount", +e) }} />
                </div>
                <div className="">
                    <Label>Base KM / Day</Label>
                    <InputBox value={data.baseKm} type="number" onChange={(e) => { setData("baseKm", +e) }} />
                </div>
                <div className="">
                    <Label>Driver Cost / Day</Label>
                    <InputBox value={data.driverCost} type="number" onChange={(e) => { setData("driverCost", +e) }} />
                </div>
            </div>
            <div className="w-full clear-both mb-20"><Button onClick={goNextStep} className="mt-5  float-right clear-both">Next Step</Button></div>

        </div>
    )
}

export default AddRoundTripStep1