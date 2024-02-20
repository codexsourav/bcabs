import { RiEditCircleFill } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { baseUrl } from "../../../helper/apiRequest";


export interface cabViewData {
    id: string;
    image: string;
    name: string;
    packagers: string,
    perKm: string,
    onDelete: ((e: string) => void),
    updateLink: string
}

function ManagecabView({ data }: { data: cabViewData }) {


    return (
        <div className="h-36 border p-3 flex relative gap-3">
            <img src={baseUrl + "/uploads/" + data.image} className="w-36 h-28 object-contain " />
            <div className="flex flex-col justify-center gap-2 items-start text-gray-800">
                <p className="text-3xl">{data.name}</p>
                <p>{data.perKm}</p>
                <p>Max Passenger : {data.packagers}</p>
            </div>
            <div className=" flex gap-4 text-2xl absolute bottom-3 right-3">
                <Link to={data.updateLink} className="text-gray-500 hover:text-gray-700 transition-all"><RiEditCircleFill /></Link>
                <p onClick={() => data.onDelete(data.id)} className="text-gray-500 hover:text-red-500 transition-all"><RiDeleteBin6Line /></p>
            </div>
        </div>
    )
}
export default ManagecabView