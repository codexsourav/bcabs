import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/stote";
import { INewAirportCab, setNewAirportCabData } from "../../../../../store/provider/addCabs/AddAirportCabProvider";
import { toast } from "react-toastify";
import { Label } from "../../../../../components/Cabs/CabBox";
import { InputBox, InputFileBox, InputSelectBox } from "../../../../../components/Inputbox/GoogleInputBoc";
import Button from "../../../../../components/Inputbox/Button";
import { PickImageFile } from "../../../../../components/picker/ImagePicker";

function AddAirportCabStep1() {
    const data = useSelector((state: RootState) => state.addairportcab);
    const dispatch = useDispatch<AppDispatch>();

    const setData = (name: keyof INewAirportCab, value: any) => {
        dispatch(setNewAirportCabData({ name, value }))
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
            <div className="grid grid-cols-4 mt-8 gap-6">
                <div className="">
                    <Label>Trip Type</Label>
                    <InputSelectBox
                        value={data.trip} onChange={(e) => {
                            setData("image", e)
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

            </div>
            <div className="w-full clear-both mb-20"><Button onClick={goNextStep} className="mt-5  float-right clear-both">Next Step</Button></div>

        </div>
    )
}
export default AddAirportCabStep1