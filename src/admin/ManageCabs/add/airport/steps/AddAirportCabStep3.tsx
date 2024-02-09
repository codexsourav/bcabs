import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/stote";
import { ExclusionsKeys } from "../../../../../interface/cabs/cab";
import { areServiceValuesPresent } from "../../../../../utils/mapOptons";
import { toast } from "react-toastify";
import { Label } from "../../../../../components/Cabs/CabBox";
import IconPickerBox from "../../../../../components/picker/IconPickerBox";
import { InputBox } from "../../../../../components/Inputbox/GoogleInputBoc";
import Button from "../../../../../components/Inputbox/Button";
import { IoMdClose } from "react-icons/io";
import { addNewAirportCabExclusionsData, removeNewAirportCabExclusionsData, setNewAirportCabData, setNewAirportCabExclusionsData } from "../../../../../store/provider/addCabs/AddAirportCabProvider";

function AddAirportCabStep3() {
    const data = useSelector((state: RootState) => state.addairportcab);
    const dispatch = useDispatch<AppDispatch>();

    const addmore = () => {
        dispatch(addNewAirportCabExclusionsData());
    };

    const remove = (i: number) => {
        dispatch(removeNewAirportCabExclusionsData({ index: i }));
    };

    const chengeData = (index: number, key: ExclusionsKeys, value: number | string) => {
        dispatch(setNewAirportCabExclusionsData({ index, key, value }));
    };

    const goNextStep = () => {
        if (!areServiceValuesPresent(data.exclusions)) {
            toast.error("Enter All Exclusions");
        } else {
            dispatch(setNewAirportCabData({ name: "step", value: 3 }))
        }
    };

    const goBack = () => {
        dispatch(setNewAirportCabData({ name: "step", value: data.step - 1 }))
    };


    return (
        <div className="mt-5 grid grid-col-3 gap-5">

            <div className="">
                <Label className="mb-2 text-xl">Add Exclusions <span className="text-[10px] ">(add **KM** For (xxx Km))</span></Label>
                <div className="grid grid-cols-2 gap-5">
                    {
                        data.exclusions.map((e, i) => {
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
export default AddAirportCabStep3;