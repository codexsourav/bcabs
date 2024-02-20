import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/stote";
import { IRoundTripPricingKey } from "../../../../../interface/cabs/distancePricing";
import { addNewRoundTripPricing, removeRoundTripPricing, setNewRoundTripPricing } from "../../../../../store/provider/addCabs/pricing/roundTripPricingProvider";
import { useEffect } from "react";
import { setNewRoundTripCabData } from "../../../../../store/provider/addCabs/AddRoundTripCabProvider";
import { Label } from "../../../../../components/Cabs/CabBox";
import AutoComplete, { InputBox } from "../../../../../components/Inputbox/GoogleInputBoc";
import { cityOptions } from "../../../../../utils/mapOptons";
import { MdClose } from "react-icons/md";
import Button from "../../../../../components/Inputbox/Button";

function AddRoundTripStep6() {
    const data = useSelector((state: RootState) => state.roundtrippricing);
    const cabData = useSelector((state: RootState) => state.addroundtripcab);

    const dispatch = useDispatch<AppDispatch>();

    const setData = (index: number, key: IRoundTripPricingKey, value: any) => {
        dispatch(setNewRoundTripPricing({ index, key, value }));
    };
    const addMore = () => {
        dispatch(addNewRoundTripPricing({ discount: cabData.discount }));
    };
    const remove = (index: number) => {
        dispatch(removeRoundTripPricing({ index }));
    };

    useEffect(() => {
        if (data.pricing[0].discount == 0) {
            dispatch(setNewRoundTripPricing({ index: 0, "key": "discount", value: cabData.discount }));
        }
    }, []);

    const goBack = () => {
        dispatch(setNewRoundTripCabData({ name: "step", value: cabData.step - 1 }))
    };

    return (
        <div className="mt-5 grid grid-col-3 gap-5">
            <Label className="mb-2 text-xl">Add Pricing Data</Label>

            {
                data.pricing.map((e, i) => {
                    return <div className="">
                        <div className="grid grid-cols-3 gap-5">

                            <div className="">
                                <Label>From</Label>
                                <AutoComplete options={cityOptions} value={e.from} onPlaceSelect={(e) => setData(i, "from", e?.formatted_address)} />
                            </div>

                            <div className="">
                                <Label>Price / KM</Label>
                                <InputBox value={e.pricePerKm} onChange={(e) => setData(i, "pricePerKm", +e)} />
                            </div>
                            <div className="flex justify-center items-center">
                                <div className="">
                                    <Label>Discount %</Label>
                                    <InputBox value={e.discount} onChange={(e) => setData(i, "discount", +e)} />
                                </div>
                                {i == 0 ? null : <div onClick={() => remove(i)} className="w-11 cursor-pointer text-red-500  h-full flex justify-center items-center flex-col">
                                    <div className="mt-6 "></div>
                                    <MdClose />
                                </div>}
                            </div>
                        </div>
                    </div>
                })
            }
            <div className="">
                <Button className="mt-5" variant="secondary" onClick={addMore}>Add More</Button>
            </div>
            <div className="w-full clear-both mb-5 flex justify-end items-end gap-5"> <Button className="mt-5" variant="secondary" onClick={goBack}>Back</Button></div>


        </div>
    )
}
export default AddRoundTripStep6