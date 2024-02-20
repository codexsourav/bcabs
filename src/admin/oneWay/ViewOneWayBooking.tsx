import { Link } from "react-router-dom"
import Button from "../../components/Inputbox/Button"
import AdminNavbar from "../../components/admin/AdminNavbar"
import AdminTabWrapper from "../../components/admin/AdminTabWrapper"
import ViewBookingWrapper from "../../components/admin/ViewBookingWrapper"

function ViewOneWayBooking() {
    return (
        <>
            <AdminNavbar />
            <AdminTabWrapper>

                <ViewBookingWrapper bookingID="BABA4543KH">
                    <div className="p-10">
                        <ul className="flex flex-col gap-4">
                            <li><span className="font-bold">Pick Address</span>	:	Krishna Nagar</li>
                            <li><span className="font-bold">Pick Up Time</span>	:	05 Feb 2024, 02:00 AM</li>
                            <li><span className="font-bold">Drop Address</span>	:	Mohali, Sector 70, Sahibzada Ajit Singh Nagar</li>
                            <li><span className="font-bold">Trip Type</span>	:	Delhi (New Delhi) → Mohali (Chandigarh) [Outstation (One way Drop)]</li>
                            <li><span className="font-bold">Car Type</span>	:	Toyota Etios or Equivalent</li>
                            <li><span className="font-bold">Distance</span>	:	260 Kms</li>
                        </ul>
                        <h1 className="font-bold mt-8 text-green-700 mb-4">Inclusions, Exclusions And T&Cs for this trip</h1>
                        <p>Inclusions: <b>Not to be charged from customer</b></p>
                        <div className="mt-2 ml-5">
                            <li>Fuel Charges</li>
                            <li>Driver Allowance</li>
                            <li>Toll / State tax</li>
                            <li>GST (5%)</li>
                            <li>Parking</li>
                            <li>Night Allowance</li>
                        </div>
                        <p className="mt-5">Exclusions: <b>To be charge from customer as per the actual.</b></p>
                        <div className="mt-2 ml-5">
                            <li>Pay ₹ 13.50/km after 260 km</li>
                        </div>
                        <p className="mt-6"><b>T&C for Vendor/Driver</b></p>
                        <div className="mt-2 ml-5">
                            <li>Do not collect State tax, Toll tax, Parking and Night Allowance.</li>
                            <li>Always use driver APP and turn ON Mobile Internet and Location throughout the trip.</li>
                            <li>Car should be neat and clean. Car seat belts, Ac/heater and music system should be in working condition.</li>
                            <li>This Trip has a KM limit. If the usage exceeds this limit, customer will be charged for the excess KM used.</li>
                            <li>The KM will be calculated from customer Pickup location to the drop location. Do not charge Garage to Garage.</li>
                            <li>Do not stop for fuel for first 02 hours of the trip. Always take guest permission for CNG refueling and tea/meal breaks. Do not take another route to fill CNG.</li>
                        </div>
                    </div>
                    <div className="flex gap-6 px-10 pb-10 w-full justify-between">
                        <Button variant="danger">Cancel Trip</Button>
                        {<Link to="/admin/oneway/confirm/id">
                            <Button>Confirm Booking</Button>
                        </Link>
                        }
                    </div>
                </ViewBookingWrapper>

            </AdminTabWrapper></>
    )
}
export default ViewOneWayBooking