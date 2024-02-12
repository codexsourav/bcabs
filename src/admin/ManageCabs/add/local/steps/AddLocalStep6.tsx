import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/stote";
import { Label } from "../../../../../components/Cabs/CabBox";
import { InputBox } from "../../../../../components/Inputbox/GoogleInputBoc";
import Button from "../../../../../components/Inputbox/Button";
import { INewLocalCab, setLocalPricing, setNewLocalCabData } from "../../../../../store/provider/addCabs/AddLocalCabProvider";


function AddLocalStep6() {
    const data = useSelector((state: RootState) => state.addlocalcab);
    const dispatch = useDispatch<AppDispatch>();

    const setData = (key: keyof INewLocalCab['prices'], value: any) => {
        dispatch(setLocalPricing({ key, value }));
    };

    const goBack = () => {
        dispatch(setNewLocalCabData({ name: "step", value: data.step - 1 }))
    };

    return (
        <div className="mt-5 grid grid-col-3 gap-5">
            <Label className="mb-2 text-xl">Add Pricing Data</Label>
            <div className="grid grid-cols-4 gap-4">
                <div className="">
                    <Label>Price For 4hr</Label>
                    <InputBox onChange={(e) => setData("hr4", +e)} value={data.prices.hr4} />
                </div>
                <div className="">
                    <Label>Price For 8hr</Label>
                    <InputBox onChange={(e) => setData("kr8", +e)} value={data.prices.kr8} />
                </div>
                <div className="">
                    <Label>Price For 12hr</Label>
                    <InputBox onChange={(e) => setData("hr12", +e)} value={data.prices.hr12} />
                </div>
                <div className="">
                    <Label>Price For 24hr</Label>
                    <InputBox onChange={(e) => setData("hr24", +e)} value={data.prices.hr24} />
                </div>
            </div>
            <div className="w-full clear-both mb-5 flex justify-end items-end gap-5"> <Button className="mt-5" variant="secondary" onClick={goBack}>Back</Button></div>


        </div>

    )
}
export default AddLocalStep6