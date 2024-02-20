import { useDispatch, useSelector } from "react-redux";
import { Label } from "../../../../../components/Cabs/CabBox"
import AutoComplete, { InputBox } from "../../../../../components/Inputbox/GoogleInputBoc"
import { cityOptions } from "../../../../../utils/mapOptons"
import { AppDispatch, RootState } from "../../../../../store/stote";
import { MdClose } from "react-icons/md";
import Button from "../../../../../components/Inputbox/Button";
import { IOneWayPricingKey } from "../../../../../interface/cabs/distancePricing";
import { addNewOneWayPricing, removeOneWayPricing, setNewOneWayPricing } from "../../../../../store/provider/addCabs/pricing/oneWayPricingProvider";
import { useEffect } from "react";
import { setNewOneWayCabData } from "../../../../../store/provider/addCabs/AddOneWayCabProvider";

function OneWayCabAddStep6() {
    const data = useSelector((state: RootState) => state.onewaypricing);
    const cabData = useSelector((state: RootState) => state.addonewaycab);

    const dispatch = useDispatch<AppDispatch>();
    const setData = (index: number, key: IOneWayPricingKey, value: any) => {
        dispatch(setNewOneWayPricing({ index, key, value }));
    };
    const addMore = () => {
        dispatch(addNewOneWayPricing({ discount: cabData.discount }));
    };
    const remove = (index: number) => {
        dispatch(removeOneWayPricing({ index }));
    };

    useEffect(() => {
        if (data.pricing[0].price == 0) {
            dispatch(setNewOneWayPricing({ index: 0, "key": "discount", value: cabData.discount }));
        }
    }, []);

    const goBack = () => {
        dispatch(setNewOneWayCabData({ name: "step", value: cabData.step - 1 }))
    };


    return (
        <div className="mt-5 grid grid-col-3 gap-5">
            <Label className="mb-2 text-xl">Add Pricing Data</Label>

            {
                data.pricing.map((e, i) => {
                    return <div className="">
                        <div className="grid grid-cols-4 gap-5">

                            <div className="">
                                <Label>From</Label>
                                <AutoComplete options={cityOptions} value={e.from} onPlaceSelect={(e) => setData(i, "from", e?.formatted_address)} />
                            </div>
                            <div className="">
                                <Label>TO</Label>
                                <AutoComplete options={cityOptions} value={e.to} onPlaceSelect={(e) => setData(i, "to", e?.formatted_address)} />
                            </div>
                            <div className="">
                                <Label>Price</Label>
                                <InputBox value={e.price} onChange={(e) => setData(i, "price", +e)} />
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
export default OneWayCabAddStep6