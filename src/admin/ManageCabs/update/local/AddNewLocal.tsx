import { Stepper } from "react-form-stepper"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/stote";
import { stepsStyle } from "../oneWay/UpdateOneWayCab";
import { useEffect, useState } from "react";
import { initLocalCabData, resetLocalCabData } from "../../../../store/provider/addCabs/AddLocalCabProvider";
import AddLocalStep1 from "../../add/local/steps/AddLocalStep1";
import AddLocalStep2 from "../../add/local/steps/AddLocalStep2";
import AddLocalStep3 from "../../add/local/steps/AddLocalStep3";
import AddLocalStep4 from "../../add/local/steps/AddLocalStep4";
import AddLocalStep5 from "../../add/local/steps/AddLocalStep5";
import AddLocalStep6 from "../../add/local/steps/AddLocalStep6";
import { useNavigate, useParams } from "react-router-dom";
import { apiRequest, withErrorHandling } from "../../../../helper/apiRequest";
import Loader from "../../../../pages/error/Loader";
import SaveLocalData from "./SaveLocalData";

function AddNewLocal() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const { id } = useParams();

  const loadCab = async () => {
    setLoading(true)
    const data = await apiRequest<any>({ path: "/api/admin/managecabs/local/" + id, isAdmin: true })
    setLoading(false)
    console.log(data.data);

    dispatch(initLocalCabData({ step: 0, ...data.data }));
  }

  const onError = () => {
    // setLoading(false);
    navigate(-1)
  };

  const initLoad = withErrorHandling(loadCab, onError)


  const data = useSelector((state: RootState) => state.addlocalcab);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetLocalCabData());
    initLoad();
  }, [])

  return (
    <>

      <h1 className="font-bold text-xl text-gray-700">Update Local Cab</h1>
      {loading ? <div className="flex justify-center items-center mt-36"><Loader /></div> :
        <>
          <Stepper
            steps={[{ label: 'Cab Info' }, { label: 'Inclusions' }, { label: 'Exclusions' }, { label: 'Facilities' }, { label: 'T&Q' }, { label: 'Pricing' }]}
            activeStep={data.step}
            styleConfig={stepsStyle}
          />
          {data.step == 0 ? <AddLocalStep1 /> : null}
          {data.step == 1 ? <AddLocalStep2 /> : null}
          {data.step == 2 ? <AddLocalStep3 /> : null}
          {data.step == 3 ? <AddLocalStep4 /> : null}
          {data.step == 4 ? <AddLocalStep5 /> : null}
          {data.step == 5 ? <><AddLocalStep6 /> <SaveLocalData /></> : null}
        </>
      }
    </>
  )
}
export default AddNewLocal