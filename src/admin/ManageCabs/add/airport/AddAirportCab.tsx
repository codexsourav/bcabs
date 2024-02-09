import { Stepper } from "react-form-stepper"
import AdminNavbar from "../../../../components/admin/AdminNavbar"
import AdminTabWrapper from "../../../../components/admin/AdminTabWrapper"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/stote";
import { stepsStyle } from "../oneWay/AddOneWayCab";
import AddAirportCabStep1 from "./steps/AddAirportCabStep1";
import AddAirportCabStep2 from "./steps/AddAirportCabStep2";
import AddAirportCabStep3 from "./steps/AddAirportCabStep3";
import AddAirportCabStep4 from "./steps/AddAirportCabStep4";
import AddAirportCabStep5 from "./steps/AddAirportCabStep5";
import AddAirportCabStep6 from "./steps/AddAirportCabStep6";
import { useEffect } from "react";
import { resetAirportCabData } from "../../../../store/provider/addCabs/AddAirportCabProvider";
import SaveAirportCab from "./SaveAirportCab";

function AddAirportCab() {
    const data = useSelector((state: RootState) => state.addairportcab);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetAirportCabData());
    }, [])

    return (
        <>
            <AdminNavbar />
            <AdminTabWrapper>
                <h1 className="font-bold text-xl text-gray-700">Add New Airport Cab</h1>
                <Stepper
                    steps={[{ label: 'Cab Info' }, { label: 'Inclusions' }, { label: 'Exclusions' }, { label: 'Facilities' }, { label: 'T&Q' }, { label: 'Pricing' }]}
                    activeStep={data.step}
                    styleConfig={stepsStyle}
                />
                {data.step == 0 ? <AddAirportCabStep1 /> : null}
                {data.step == 1 ? <AddAirportCabStep2 /> : null}
                {data.step == 2 ? <AddAirportCabStep3 /> : null}
                {data.step == 3 ? <AddAirportCabStep4 /> : null}
                {data.step == 4 ? <AddAirportCabStep5 /> : null}
                {data.step == 5 ? <>
                    <AddAirportCabStep6 />
                    <div className="mt-10">
                        <SaveAirportCab />
                    </div>
                </>
                    : null}
            </AdminTabWrapper>
        </>
    )
}
export default AddAirportCab