import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../components/Inputbox/Button"
import { RootState } from "../../../../store/stote";
import { useState } from "react";
import { resetLocalCabData, setNewLocalCabData } from "../../../../store/provider/addCabs/AddLocalCabProvider";
import { apiRequest, withErrorHandling } from "../../../../helper/apiRequest";
import { toast } from "react-toastify";

function SaveLocalData() {
    const roundtripcab = useSelector((state: RootState) => state.addlocalcab);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false)

    const saveCab = async () => {
        setLoading(true)
        dispatch(setNewLocalCabData({ name: "isPublic", value: true }))
        const res = await apiRequest({ "path": "/api/admin/managecabs/local", method: "POST", data: roundtripcab, isAdmin: true });
        dispatch(resetLocalCabData());
        toast.success("Cab Added Successfully");
        setLoading(false)
        console.log((res).data);
    };

    const onSaveEror = (error: any) => {
        setLoading(false)
        console.log(error);
    };


    return (
        <div className="flex gap-4">
            <Button className="mt-5" disabled={loading} onClick={withErrorHandling(saveCab, onSaveEror)}>{loading ? "Saving..." : "Save And Publish Cab"}</Button>
        </div>
    )
}
export default SaveLocalData