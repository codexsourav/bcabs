import { useDispatch, useSelector } from "react-redux";
import { Label } from "../../../../../components/Cabs/CabBox";
import { InputBox } from "../../../../../components/Inputbox/GoogleInputBoc";
import { AppDispatch, RootState } from "../../../../../store/stote";
import { INewAirportCab, setNewAirportCabData } from "../../../../../store/provider/addCabs/AddAirportCabProvider";
import Button from "../../../../../components/Inputbox/Button";

function AddAirportCabStep6() {
    const data = useSelector((state: RootState) => state.addairportcab);
    const dispatch = useDispatch<AppDispatch>();

    const setData = (name: keyof INewAirportCab, value: any) => {
        dispatch(setNewAirportCabData({ name, value }))
    }

    const goBack = () => {
        setData("step", data.step - 1)
    }

    return (
        <div>
            <div className="grid grid-cols-3 gap-5">

                <div className="">
                    <Label>Price /KM</Label>
                    <InputBox value={data.pricePerKm} type="number" onChange={(e) => { setData("pricePerKm", +e) }} />
                </div>
                <div className="">
                    <Label>Base Amount</Label>
                    <InputBox value={data.baseAmount} type="number" onChange={(e) => { setData("baseAmount", +e) }} />
                </div>
                <div className="">
                    <Label>Discount %</Label>
                    <InputBox value={data.discount} type="number" onChange={(e) => { setData("discount", +e) }} />
                </div>
            </div>
            <div className="w-full clear-both mb-5 flex justify-end items-end gap-5"> <Button className="mt-5" variant="secondary" onClick={goBack}>Back</Button> </div>
        </div>
    )
}

export default AddAirportCabStep6;