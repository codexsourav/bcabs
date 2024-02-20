
import { useDispatch, useSelector } from "react-redux"
import AdminNavbar from "../../../../components/admin/AdminNavbar"
import AdminTabWrapper from "../../../../components/admin/AdminTabWrapper"

import { RootState } from "../../../../store/stote"
import { Stepper } from 'react-form-stepper';
import { StepStyleDTO } from "react-form-stepper/dist/components/Step/StepTypes"
import { useEffect, useState } from "react"
import { initOneWayCabData, resetOneWayCabData } from "../../../../store/provider/addCabs/AddOneWayCabProvider"
import OneWayAddStep1 from "../../add/oneWay/steps/OneWayAddStep1";
import OneWayCabAddStep2 from "../../add/oneWay/steps/OneWayCabAddStep2";
import OneWayCabAddStep3 from "../../add/oneWay/steps/OneWayCabAddStep3";
import OneWayCabAddStep4 from "../../add/oneWay/steps/OneWayCabAddStep4";
import OneWayCabAddStep5 from "../../add/oneWay/steps/OneWayCabAddStep5";
import OneWayCabAddStep6 from "../../add/oneWay/steps/OneWayCabAddStep6";
import { apiRequest, withErrorHandling } from "../../../../helper/apiRequest";
import { useNavigate, useParams } from "react-router-dom";
import { initOneWayPricingData } from "../../../../store/provider/addCabs/pricing/oneWayPricingProvider";
import SetOneWaydata from "./SetOneWaydata";
import Loader from "../../../../pages/error/Loader";

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

function UpdateOneWayCab() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    const { id } = useParams();

    const loadCab = async () => {
        setLoading(true)
        const data = await apiRequest<any>({ path: "/api/admin/managecabs/oneway/" + id, isAdmin: true })
        setLoading(false)

        dispatch(initOneWayCabData({ step: 0, ...data.data.cab }));
        dispatch(initOneWayPricingData(data.data.pricing));
    }

    const onError = () => {
        // setLoading(false);
        navigate(-1)
    };

    const initLoad = withErrorHandling(loadCab, onError)

    const data = useSelector((state: RootState) => state.addonewaycab);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetOneWayCabData());
        initLoad()
    }, [])

    return (
        <>
            <AdminNavbar />
            <AdminTabWrapper>
                <h1 className="font-bold text-xl text-gray-700">Update OneWay Cab</h1>
                {
                    loading ? <div className="flex justify-center items-center mt-36"><Loader /></div> : <>
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
                            <SetOneWaydata />
                        </>
                            : null}
                    </>
                }
            </AdminTabWrapper>
        </>
    )
}

export default UpdateOneWayCab