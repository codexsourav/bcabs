import AdminNavbar from "../../../../components/admin/AdminNavbar"
import AdminTabWrapper from "../../../../components/admin/AdminTabWrapper"
import { Stepper } from "react-form-stepper"
import { stepsStyle } from "../oneWay/AddOneWayCab"
import { RootState } from "../../../../store/stote";
import { useDispatch, useSelector } from "react-redux";
import AddRoundTripStep1 from "./steps/AddRoundTripStep1";
import AddRoundTripStep2 from "./steps/AddRoundTripStep2";
import AddRoundTripStep3 from "./steps/AddRoundTripStep3";
import AddRoundTripStep4 from "./steps/AddRoundTripStep4";
import AddRoundTripStep5 from "./steps/AddRoundTripStep5";
import AddRoundTripStep6 from "./steps/AddRoundTripStep6";
import { useEffect } from "react";
import { resetRoundTripCabData } from "../../../../store/provider/addCabs/AddRoundTripCabProvider";
import SaveRoundTripCab from "./SaveRoundTripCab";


function AddRoundTripCab() {
    const data = useSelector((state: RootState) => state.addroundtripcab);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetRoundTripCabData());
    }, [])

    return (
        <>
            <AdminNavbar />
            <AdminTabWrapper>
                <h1 className="font-bold text-xl text-gray-700">Add New Round Trip Cab</h1>
                <Stepper
                    steps={[{ label: 'Cab Info' }, { label: 'Inclusions' }, { label: 'Exclusions' }, { label: 'Facilities' }, { label: 'T&Q' }, { label: 'Pricing' }]}
                    activeStep={data.step}
                    styleConfig={stepsStyle}
                />
                {data.step == 0 ? <AddRoundTripStep1 /> : null}
                {data.step == 1 ? <AddRoundTripStep2 /> : null}
                {data.step == 2 ? <AddRoundTripStep3 /> : null}
                {data.step == 3 ? <AddRoundTripStep4 /> : null}
                {data.step == 4 ? <AddRoundTripStep5 /> : null}
                {data.step == 5 ? <>
                    <AddRoundTripStep6 />
                    <SaveRoundTripCab />
                </> : null}
            </AdminTabWrapper>
        </>
    )
}
export default AddRoundTripCab