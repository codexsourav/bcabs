import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../components/Inputbox/Button"
import { RootState } from "../../../../store/stote";
import { useState } from "react";
import { resetRoundTripCabData, setNewRoundTripCabData } from "../../../../store/provider/addCabs/AddRoundTripCabProvider";
import { apiRequest, withErrorHandling } from "../../../../helper/apiRequest";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function SaveRoundTripCab() {
    const { id } = useParams();
    const roundtripcab = useSelector((state: RootState) => state.addroundtripcab);
    const pricing = useSelector((state: RootState) => state.roundtrippricing);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false)

    const saveCab = async () => {
        setLoading(true)
        dispatch(setNewRoundTripCabData({ name: "isPublic", value: true }))
        const res = await apiRequest({ "path": "/api/admin/managecabs/roundtrip/" + id, method: "PUT", data: { cab: roundtripcab, pricing }, isAdmin: true });
        dispatch(setNewRoundTripCabData({ "name": "step", value: 0 }));
        toast.success("Cab Update Successfully");
        setLoading(false)
        console.log((res).data);
    };

    const onSaveEror = (error: any) => {
        setLoading(false)
        console.log(error);
    };


    return (
        <div className="flex gap-4">
            <Button className="mt-5" disabled={loading} onClick={withErrorHandling(saveCab, onSaveEror)}>{loading ? "Update..." : "Update Cab"}</Button>
        </div>
    )
}
export default SaveRoundTripCab