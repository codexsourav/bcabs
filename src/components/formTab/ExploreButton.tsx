import { FaCar } from "react-icons/fa"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState } from "../../store/stote"
import { validateAirportError, validateLocalError, validateOneWayError, validateRoundTripError } from "../../store/validater/TripValidate";
import { toast } from "react-toastify";


function ExploreButton({ className }: { className?: string, }) {
    const data = useSelector((state: RootState) => state);
    const navigate = useNavigate();

    const navigateMe = () => {
        switch (data.tripIndex.value) {
            case 0:
                const linkOneWayGet = validateOneWayError(data.oneway);
                if (linkOneWayGet != false) {
                    navigate(linkOneWayGet.toString());
                }
                break;
            case 1:
                const linkRoindTripGet = validateRoundTripError(data.roundtrip);
                if (linkRoindTripGet != false) {
                    navigate(linkRoindTripGet.toString());
                }
                break;
            case 2:
                const linkLocalGet = validateLocalError(data.local);
                if (linkLocalGet != false) {
                    navigate(linkLocalGet.toString());
                }
                break;
            case 3:
                const linkAirportGet = validateAirportError(data.airport);
                if (linkAirportGet != false) {
                    navigate(linkAirportGet.toString());
                }
                break;
            default:
                toast.error("Unknown Trip Type");
                break;
        }
    }

    return (
        <div onClick={navigateMe} className={"h-14 cursor-pointer md:h-12 m-auto md:rounded text-lg md:shadow-md font-bold w-full md:w-48  bg-orange-600 hover:bg-gray-950 transition-all flex justify-center items-center text-white rounded-br rounded-bl gap-5 uppercase md:capitalize " + className}><FaCar size={30} className="block md:hidden " />  Explore Cabs</div>
    )
}
export default ExploreButton