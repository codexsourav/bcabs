import { Stepper } from "react-form-stepper"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/stote";
import { stepsStyle } from "../oneWay/AddOneWayCab";
import AddLocalStep1 from "./steps/AddLocalStep1";
import AddLocalStep2 from "./steps/AddLocalStep2";
import AddLocalStep3 from "./steps/AddLocalStep3";
import AddLocalStep4 from "./steps/AddLocalStep4";
import AddLocalStep5 from "./steps/AddLocalStep5";
import AddLocalStep6 from "./steps/AddLocalStep6";
import { useEffect } from "react";
import { resetLocalCabData } from "../../../../store/provider/addCabs/AddLocalCabProvider";
import SaveLocalData from "./SaveLocalData";

function AddNewLocal() {
  const data = useSelector((state: RootState) => state.addlocalcab);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetLocalCabData());
  }, [])

  return (
    <>

      <h1 className="font-bold text-xl text-gray-700">Add New Local Cab</h1>
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
      {data.step == 5 ? <>
        <AddLocalStep6 />
        <SaveLocalData />
      </> : null}
    </>
  )
}
export default AddNewLocal