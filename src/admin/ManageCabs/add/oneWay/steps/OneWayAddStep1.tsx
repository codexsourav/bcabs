import { useDispatch, useSelector } from "react-redux"
import { Label } from "../../../../../components/Cabs/CabBox"
import { AppDispatch, RootState } from "../../../../../store/stote"
import { INewOneWayCab, setNewOneWayCabData } from "../../../../../store/provider/addCabs/AddOneWayCabProvider"
import { InputBox, InputSelectBox } from "../../../../../components/Inputbox/GoogleInputBoc"
import Button from "../../../../../components/Inputbox/Button"
import { toast } from "react-toastify"
import { PickImageFile } from "../../../../../components/picker/ImagePicker"

function OneWayAddStep1() {
    const data = useSelector((state: RootState) => state.addonewaycab);
    const dispatch = useDispatch<AppDispatch>();

    const setData = (name: keyof INewOneWayCab, value: any) => {
        dispatch(setNewOneWayCabData({ name, value }))
    }


    const goNextStep = () => {
        if (data.cabName.trim().length == 0 || data.image == "" || data.maxPassengers == "" || data.pricePerKm == 0) {
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
                    <Label>Discount %</Label>
                    <InputBox value={data.discount} type="number" onChange={(e) => { setData("discount", +e) }} />
                </div>
                <div className="">
                    <Label>Price / KM</Label>
                    <InputBox value={data.pricePerKm} type="number" onChange={(e) => { setData("pricePerKm", +e) }} />
                </div>

            </div>
            <div className="w-full clear-both mb-20"><Button onClick={goNextStep} className="mt-5  float-right clear-both">Next Step</Button></div>
        </div>
    )
}
export default OneWayAddStep1