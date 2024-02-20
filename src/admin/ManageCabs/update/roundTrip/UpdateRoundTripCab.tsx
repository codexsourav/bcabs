import AdminNavbar from "../../../../components/admin/AdminNavbar"
import AdminTabWrapper from "../../../../components/admin/AdminTabWrapper"
import { Stepper } from "react-form-stepper"
import { stepsStyle } from "../oneWay/UpdateOneWayCab"
import { RootState } from "../../../../store/stote";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { initRoundTripCabData, resetRoundTripCabData } from "../../../../store/provider/addCabs/AddRoundTripCabProvider";
import AddRoundTripStep1 from "../../add/roundTrip/steps/AddRoundTripStep1";
import AddRoundTripStep2 from "../../add/roundTrip/steps/AddRoundTripStep2";
import AddRoundTripStep3 from "../../add/roundTrip/steps/AddRoundTripStep3";
import AddRoundTripStep4 from "../../add/roundTrip/steps/AddRoundTripStep4";
import AddRoundTripStep5 from "../../add/roundTrip/steps/AddRoundTripStep5";
import AddRoundTripStep6 from "../../add/roundTrip/steps/AddRoundTripStep6";
import { useNavigate, useParams } from "react-router-dom";
import { apiRequest, withErrorHandling } from "../../../../helper/apiRequest";
import { initRoundTripPricingData } from "../../../../store/provider/addCabs/pricing/roundTripPricingProvider";
import SaveRoundTripCab from "./SaveRoundTripCab";
import Loader from "../../../../pages/error/Loader";


function UpdateRoundTripCab() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    const { id } = useParams();

    const loadCab = async () => {
        setLoading(true)
        const data = await apiRequest<any>({ path: "/api/admin/managecabs/roundtrip/" + id, isAdmin: true })
        setLoading(false)
        console.log(data.data);


        dispatch(initRoundTripCabData({ step: 0, ...data.data.cab }));
        dispatch(initRoundTripPricingData(data.data.pricing));

    }

    const onError = () => {
        // setLoading(false);
        navigate(-1)
    };

    const initLoad = withErrorHandling(loadCab, onError)

    const data = useSelector((state: RootState) => state.addroundtripcab);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetRoundTripCabData());
        initLoad();
    }, [])

    return (
        <>
            <AdminNavbar />
            <AdminTabWrapper>
                <h1 className="font-bold text-xl text-gray-700">Update Round Trip Cab</h1>
                {
                    loading ? <div className="flex justify-center items-center mt-36"><Loader /></div> : <>    <Stepper
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
                        </>
                            : null}
                    </>
                }

            </AdminTabWrapper>
        </>
    )
}
export default UpdateRoundTripCab