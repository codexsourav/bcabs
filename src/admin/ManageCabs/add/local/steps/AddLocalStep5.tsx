import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/stote";
import { addNewLocalCabTAQData, removeNewLocalCabTAQData, setNewLocalCabData, setNewLocalCabTAQData } from "../../../../../store/provider/addCabs/AddLocalCabProvider";
import { areAllValuesPresent } from "../../../../../utils/mapOptons";
import { toast } from "react-toastify";
import { Label } from "../../../../../components/Cabs/CabBox";
import { InputBox } from "../../../../../components/Inputbox/GoogleInputBoc";
import Button from "../../../../../components/Inputbox/Button";
import { IoMdClose } from "react-icons/io";

function AddLocalStep5() {
    const data = useSelector((state: RootState) => state.addlocalcab);
    const dispatch = useDispatch<AppDispatch>();

    const addmore = () => {
        dispatch(addNewLocalCabTAQData());
    };

    const remove = (i: number) => {
        dispatch(removeNewLocalCabTAQData({ index: i }));
    };

    const chengeData = (index: number, value: string) => {
        dispatch(setNewLocalCabTAQData({ index, value }));
    };

    const goNextStep = () => {
        if (!areAllValuesPresent(data.taq)) {
            toast.error("Enter All T&Q");
        } else {
            dispatch(setNewLocalCabData({ name: "step", value: 5 }))
        }
    };

    const goBack = () => {
        dispatch(setNewLocalCabData({ name: "step", value: data.step - 1 }))
    };


    return (
        <div className="mt-5 grid grid-col-3 gap-5">

            <div className="">
                <Label className="mb-2 text-xl">Add T&Q <span className="text-[10px] ">(add **KM** For (xxx Km))</span></Label>
                <div className="grid grid-cols-1 gap-5">
                    {
                        data.taq.map((e, i) => {
                            return <div className="flex" key={"taq-" + i}>
                                <InputBox value={e} onChange={(e) => chengeData(i, e)} />
                                {i == 0 ? null : <div onClick={() => remove(i)} className="px-2 cursor-pointer bg-gray-300 flex justify-center items-center text-orange-600 text-xl"><IoMdClose /></div>}
                            </div>
                        })
                    }
                </div>
                <Button variant="secondary" onClick={addmore} className=" mt-5" >Add More</Button>
            </div>
            <div className="w-full clear-both mb-5 flex justify-end items-end gap-5"> <Button className="mt-5" variant="secondary" onClick={goBack}>Back</Button> <Button className="mt-5" onClick={goNextStep}>Next Step</Button></div>

        </div>
    )
}
export default AddLocalStep5