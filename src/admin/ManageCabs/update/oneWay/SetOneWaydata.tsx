import { useDispatch, useSelector } from "react-redux"
import Button from "../../../../components/Inputbox/Button"
import { RootState } from "../../../../store/stote"
import { apiRequest, withErrorHandling } from "../../../../helper/apiRequest";
import { useState } from "react";
import { setNewOneWayCabData } from "../../../../store/provider/addCabs/AddOneWayCabProvider";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";


function SetOneWaydata() {
    const oneWayCab = useSelector((state: RootState) => state.addonewaycab);
    const pricing = useSelector((state: RootState) => state.onewaypricing);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false)
    const { id } = useParams();

    const saveCab = async () => {
        setLoading(true)
        dispatch(setNewOneWayCabData({ name: "isPublic", value: true }))
        const res = await apiRequest({ "path": "/api/admin/managecabs/oneway/" + id, method: "PUT", data: { cab: oneWayCab, pricing }, isAdmin: true });
        dispatch(setNewOneWayCabData({ name: "step", value: 0 }));
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
            <Button className="mt-5" disabled={loading} onClick={withErrorHandling(saveCab, onSaveEror)}>{loading ? "update..." : "Update Cab"}</Button>
        </div>
    )
}
export default SetOneWaydata