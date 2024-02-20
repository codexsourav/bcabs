import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/stote";
import { addNewLocalCabFacilitiesData, removeNewLocalCabFacilitiesData, setNewLocalCabData, setNewLocalCabFacilitiesData } from "../../../../../store/provider/addCabs/AddLocalCabProvider";
import { FacilitiesKeys } from "../../../../../interface/cabs/cab";
import { areServiceValuesPresent } from "../../../../../utils/mapOptons";
import { toast } from "react-toastify";
import { Label } from "../../../../../components/Cabs/CabBox";
import IconPickerBox from "../../../../../components/picker/IconPickerBox";
import { InputBox } from "../../../../../components/Inputbox/GoogleInputBoc";
import Button from "../../../../../components/Inputbox/Button";
import { IoMdClose } from "react-icons/io";

function AddLocalStep4() {
    const data = useSelector((state: RootState) => state.addlocalcab);
    const dispatch = useDispatch<AppDispatch>();

    const addmore = () => {
        dispatch(addNewLocalCabFacilitiesData());
    };

    const remove = (i: number) => {
        dispatch(removeNewLocalCabFacilitiesData({ index: i }));
    };

    const chengeData = (index: number, key: FacilitiesKeys, value: number | string) => {
        dispatch(setNewLocalCabFacilitiesData({ index, key, value }));
    };

    const goNextStep = () => {
        if (!areServiceValuesPresent(data.facilities)) {
            toast.error("Enter All Facilities");
        } else {
            dispatch(setNewLocalCabData({ name: "step", value: 4 }))
        }
    };

    const goBack = () => {
        dispatch(setNewLocalCabData({ name: "step", value: data.step - 1 }))
    };

    return (
        <div className="mt-5 grid grid-col-3 gap-5">

            <div className="">
                <Label className="mb-2 text-xl">Add Facilities <span className="text-[10px] ">(add **KM** For (xxx Km))</span></Label>
                <div className="grid grid-cols-2 gap-5">
                    {
                        data.facilities.map((e, i) => {
                            return <div className="flex" key={"inclusions-" + i}>
                                <IconPickerBox index={e.iconIndex} onClick={(e) => chengeData(i, "iconIndex", e)} className="px-4 text-xl border" />
                                <InputBox value={e.title} onChange={(e) => chengeData(i, "title", e)} />
                                {i == 0 ? null : <div onClick={() => remove(i)} className="px-2 cursor-pointer bg-gray-300 flex justify-center items-center text-orange-600 text-xl"><IoMdClose /></div>}
                            </div>
                        })
                    }
                </div>
                <Button variant="secondary" onClick={addmore} className=" mt-5">Add More</Button>
            </div>
            <div className="w-full clear-both mb-5 flex justify-end items-end gap-5"> <Button className="mt-5" variant="secondary" onClick={goBack}>Back</Button> <Button className="mt-5" onClick={goNextStep}>Next Step</Button></div>

        </div>
    )
}
export default AddLocalStep4;