import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../components/Inputbox/Button"
import { RootState } from "../../../../store/stote";
import { useState } from "react";
import { apiRequest, withErrorHandling } from "../../../../helper/apiRequest";
import { resetAirportCabData, setNewAirportCabData } from "../../../../store/provider/addCabs/AddAirportCabProvider";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function SaveAirportCab() {
    const { id } = useParams();
    const airportCab = useSelector((state: RootState) => state.addairportcab);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false)

    const saveCab = async () => {
        setLoading(true)
        dispatch(setNewAirportCabData({ name: "isPublic", value: true }))
        const res = await apiRequest({ "path": "/api/admin/managecabs/airport/" + id, method: "PUT", data: airportCab, isAdmin: true });
        dispatch(setNewAirportCabData({ "name": "step", value: 0 }));
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
            <Button className="mt-5" disabled={loading} onClick={withErrorHandling(saveCab, onSaveEror)}>{loading ? "Update..." : "Update Cab Data"}</Button>
        </div>
    )
}
export default SaveAirportCab;