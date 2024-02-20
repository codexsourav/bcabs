import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/stote";
import { areServiceValuesPresent } from "../../../../../utils/mapOptons";
import { addNewLocalCabInclusionsData, removeNewLocalCabInclusionsData, setNewLocalCabData, setNewLocalCabInclusionsData } from "../../../../../store/provider/addCabs/AddLocalCabProvider";
import { InclusionsKeys } from "../../../../../interface/cabs/cab";
import { toast } from "react-toastify";
import Button from "../../../../../components/Inputbox/Button";
import { Label } from "../../../../../components/Cabs/CabBox";
import IconPickerBox from "../../../../../components/picker/IconPickerBox";
import { InputBox } from "../../../../../components/Inputbox/GoogleInputBoc";
import { IoMdClose } from "react-icons/io";

function AddLocalStep2() {
    const data = useSelector((state: RootState) => state.addlocalcab);
    const dispatch = useDispatch<AppDispatch>();
    const addmore = () => {
        dispatch(addNewLocalCabInclusionsData());
    };

    const remove = (i: number) => {
        dispatch(removeNewLocalCabInclusionsData({ index: i }));
    };

    const changeData = (index: number, key: InclusionsKeys, value: number | string) => {
        dispatch(setNewLocalCabInclusionsData({ index, key, value }));
    };

    const goNextStep = () => {
        if (!areServiceValuesPresent(data.inclusions)) {
            toast.error("Enter All Inclusions");
        } else {
            dispatch(setNewLocalCabData({ name: "step", value: 2 }))
        }
    };

    const goBack = () => {
        dispatch(setNewLocalCabData({ name: "step", value: data.step - 1 }))
    };

    return (
        <div className="mt-5 grid grid-col-3 gap-5">

            <div className="">
                <Label className="mb-2 text-xl">Add Inclusions <span className="text-[10px] ">(add **KM** For Show (xxx Km))</span></Label>
                <div className="grid grid-cols-2 gap-5">
                    {
                        data.inclusions.map((e, i) => {
                            return <div className="flex" key={"inclusions-" + i}>
                                <IconPickerBox index={e.iconIndex} onClick={(e) => changeData(i, "iconIndex", e)} className="px-4 text-xl border" />
                                <InputBox value={e.title} onChange={(e) => changeData(i, "title", e)} />
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
export default AddLocalStep2