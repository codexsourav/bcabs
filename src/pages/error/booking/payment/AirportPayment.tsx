import { useState } from "react";
import Button from "../../../../components/Inputbox/Button"
import { InputBox } from "../../../../components/Inputbox/GoogleInputBoc";
import { Label } from "../../../../components/Cabs/CabBox";
import PaymentWrapper from "./Wrapper/PaymentWrapper";


function AirportPayment() {
    const [parcent, setParcent] = useState(0);
    const [haveAGst, setHaveAGst] = useState(false)

    return (
        <PaymentWrapper parcent={parcent} setParcent={setParcent} onBack={() => { }} >
            <div className="flex justify-start col-span-2 mb-2 mt-3  items-center gap-2 font-semibold" ><input checked={haveAGst} onChange={() => setHaveAGst(!haveAGst)} type="checkbox" className="font-xl select-none text-gray-900" id="ckeck" /> <label htmlFor="ckeck" className="select-none" >I have a GST Number <span className="text-gray-600">(Optional)</span></label></div>
            {
                haveAGst ? <div className="col-span-2 w-full grid grid-cols-2 gap-4">
                    <div className="">
                        <Label>Company Name</Label>
                        <InputBox value={""} onChange={(e) => { }} />
                    </div>
                    <div className="">
                        <Label>Registration No.</Label>
                        <InputBox value={""} onChange={(e) => { }} />
                    </div>
                </div> : null
            }
            <Button variant="primary" className="md:col-span-2 mt-7 uppercase">Proceed</Button>

        </PaymentWrapper>
    )
}
export default AirportPayment

