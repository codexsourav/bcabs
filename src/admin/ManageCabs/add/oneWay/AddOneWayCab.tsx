
import { useDispatch, useSelector } from "react-redux"
import AdminNavbar from "../../../../components/admin/AdminNavbar"
import AdminTabWrapper from "../../../../components/admin/AdminTabWrapper"
import OneWayAddStep1 from "./steps/OneWayAddStep1"
import OneWayCabAddStep2 from "./steps/OneWayCabAddStep2"
import OneWayCabAddStep3 from "./steps/OneWayCabAddStep3"
import OneWayCabAddStep4 from "./steps/OneWayCabAddStep4"
import OneWayCabAddStep5 from "./steps/OneWayCabAddStep5"
import { RootState } from "../../../../store/stote"
import OneWayCabAddStep6 from "./steps/OneWayCabAddStep6"
import { Stepper } from 'react-form-stepper';
import { StepStyleDTO } from "react-form-stepper/dist/components/Step/StepTypes"
import { useEffect } from "react"
import { resetOneWayCabData } from "../../../../store/provider/addCabs/AddOneWayCabProvider"
import SaveOneWaydata from "./SaveOneWaydata"

export const stepsStyle: StepStyleDTO = {
    activeBgColor: "#972f00",
    inactiveBgColor: "rgb(228 228 228)",
    inactiveTextColor: "rgb(55 65 81)",
    activeTextColor: "#fff",
    borderRadius: 100,
    completedTextColor: "#fff",
    completedBgColor: "rgb(249 115 22)",
    circleFontSize: 10,
    fontWeight: "500",
    labelFontSize: 12,
    size: 25,
}

function AddOneWayCab() {

    const data = useSelector((state: RootState) => state.addonewaycab);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetOneWayCabData());
    }, [])

    return (
        <>
            <AdminNavbar />
            <AdminTabWrapper>
                <h1 className="font-bold text-xl text-gray-700">Add New OneWay Cab</h1>
                <Stepper
                    steps={[{ label: 'Cab Info' }, { label: 'Inclusions' }, { label: 'Exclusions' }, { label: 'Facilities' }, { label: 'T&Q' }, { label: 'Pricing' }]}
                    activeStep={data.step}
                    styleConfig={stepsStyle}
                />
                {data.step == 0 ? <OneWayAddStep1 /> : null}
                {data.step == 1 ? <OneWayCabAddStep2 /> : null}
                {data.step == 2 ? <OneWayCabAddStep3 /> : null}
                {data.step == 3 ? <OneWayCabAddStep4 /> : null}
                {data.step == 4 ? <OneWayCabAddStep5 /> : null}
                {data.step == 5 ? <>
                    <OneWayCabAddStep6 />
                    <SaveOneWaydata />
                </> : null}
            </AdminTabWrapper>
        </>
    )
}

export default AddOneWayCab