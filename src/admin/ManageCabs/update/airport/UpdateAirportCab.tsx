import { Stepper } from "react-form-stepper"
import AdminNavbar from "../../../../components/admin/AdminNavbar"
import AdminTabWrapper from "../../../../components/admin/AdminTabWrapper"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/stote";
import { stepsStyle } from "../oneWay/UpdateOneWayCab";

import { useEffect, useState } from "react";
import { initAirportCabData, resetAirportCabData } from "../../../../store/provider/addCabs/AddAirportCabProvider";
import AddAirportCabStep1 from "../../add/airport/steps/AddAirportCabStep1";
import AddAirportCabStep2 from "../../add/airport/steps/AddAirportCabStep2";
import AddAirportCabStep3 from "../../add/airport/steps/AddAirportCabStep3";
import AddAirportCabStep4 from "../../add/airport/steps/AddAirportCabStep4";
import AddAirportCabStep5 from "../../add/airport/steps/AddAirportCabStep5";
import AddAirportCabStep6 from "../../add/airport/steps/AddAirportCabStep6";
import { useNavigate, useParams } from "react-router-dom";
import { apiRequest, withErrorHandling } from "../../../../helper/apiRequest";
import SaveAirportCab from "./SaveAirportCabUpdate";
import Loader from "../../../../pages/error/Loader";

function UpdateAirportCab() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    const { id } = useParams();

    const loadCab = async () => {
        setLoading(true)
        const data = await apiRequest<any>({ path: "/api/admin/managecabs/airport/" + id, isAdmin: true })
        setLoading(false)
        console.log(data.data);


        dispatch(initAirportCabData({ step: 0, ...data.data }));


    }

    const onError = () => {
        // setLoading(false);
        navigate(-1)
    };

    const initLoad = withErrorHandling(loadCab, onError)


    const data = useSelector((state: RootState) => state.addairportcab);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetAirportCabData());
        initLoad();
    }, [])

    return (
        <>
            <AdminNavbar />
            <AdminTabWrapper>
                <h1 className="font-bold text-xl text-gray-700">Update Airport Cab</h1>
                {loading ? <div className="flex justify-center items-center mt-36"><Loader /></div> :
                    <>
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
                            <SaveAirportCab />
                        </>
                            : null}
                    </>}
            </AdminTabWrapper>
        </>
    )
}
export default UpdateAirportCab