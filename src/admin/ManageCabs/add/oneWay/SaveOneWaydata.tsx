import { useDispatch, useSelector } from "react-redux"
import Button from "../../../../components/Inputbox/Button"
import { RootState } from "../../../../store/stote"
import { apiRequest, withErrorHandling } from "../../../../helper/apiRequest";
import { useState } from "react";
import { resetOneWayCabData, setNewOneWayCabData } from "../../../../store/provider/addCabs/AddOneWayCabProvider";
import { toast } from "react-toastify";


function SaveOneWaydata() {
    const oneWayCab = useSelector((state: RootState) => state.addonewaycab);
    const pricing = useSelector((state: RootState) => state.onewaypricing);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false)

    const saveCab = async () => {
        setLoading(true)
        dispatch(setNewOneWayCabData({ name: "isPublic", value: true }))
        const res = await apiRequest({ "path": "/api/admin/managecabs/oneway", method: "POST", data: { ...oneWayCab, pricing }, isAdmin: true });
        dispatch(resetOneWayCabData());
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
export default SaveOneWaydata