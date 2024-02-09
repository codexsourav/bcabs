import { Label } from "../../components/Cabs/CabBox"
import Button from "../../components/Inputbox/Button"
import { InputBox } from "../../components/Inputbox/GoogleInputBoc"
import AdminTabWrapper from "../../components/admin/AdminTabWrapper"
import Navbar from "../../components/basic/Navbar"

function OneWayConfirm() {
    return (
        <>
            <Navbar />
            <AdminTabWrapper>
                <div className="p-5">
                    <h1 className="font-bold uppercase text-gray-800 text-xl">Confirm Booking #BABA543594kg</h1>
                    <div className="mt-3 text-sm">
                        <ul className="flex flex-col gap-4">
                            <li><span className="font-bold">Pick Address</span>	:	Krishna Nagar</li>
                            <li><span className="font-bold">Pick Up Time</span>	:	05 Feb 2024, 02:00 AM</li>
                            <li><span className="font-bold">Drop Address</span>	:	Mohali, Sector 70, Sahibzada Ajit Singh Nagar</li>
                            <li><span className="font-bold">Trip Type</span>	:	Delhi (New Delhi) → Mohali (Chandigarh) [Outstation (One way Drop)]</li>
                            <li><span className="font-bold">Car Type</span>	:	Toyota Etios or Equivalent</li>
                            <li><span className="font-bold">Distance</span>	:	260 Kms</li>
                        </ul>
                    </div>
                    <div className=" grid grid-cols-2 gap-5 mt-10">
                        <div className="">
                            <Label>Driver Name</Label>
                            <InputBox onChange={(e) => { }} value={"fgf"} placeholder="Enter name" />
                        </div>
                        <div className="">
                            <Label>Driver Contact Number</Label>
                            <InputBox onChange={(e) => { }} value={""} placeholder="Enter Mobile" />
                        </div>
                        <div className="">
                            <Label>Car NO</Label>
                            <InputBox onChange={(e) => { }} value={""} placeholder="XX-XX-X-XXXX" />
                        </div>
                    </div>
                    <Button className="mt-10">Confirm Booking</Button>
                </div>


            </AdminTabWrapper>
        </>
    )
}
export default OneWayConfirm