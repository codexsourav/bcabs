import { Link } from "react-router-dom"
import Button from "../../../components/Inputbox/Button"
import ManagecabView, { cabViewData } from "../../../components/admin/cabs/ManagecabView"
import { adminRoutePath } from "../../../routes/AdminRoutes"
import { apiRequest, withErrorHandling } from "../../../helper/apiRequest"
import { useEffect, useState } from "react"
import { IAirportCab } from "../../../interface/cabs/cab"
import Loader from "../../../pages/error/Loader"

function AirportCabsView() {

    const [data, setData] = useState<IAirportCab[] | null>(null)
    const loadCab = async () => {
        const res = await apiRequest<IAirportCab[]>({ "path": "/api/admin/cabs/airport", isAdmin: true });
        setData(res.data);
    }

    const onError = () => {
        setData([]);
    }
    const request = withErrorHandling(loadCab, onError);



    useEffect(() => {
        request();
    }, [])

    const onDelete = async (e: string) => {
        const isConfirm = confirm("Are You Sure To Delete?");
        if (isConfirm) {
            await apiRequest<any>({ "path": "/api/admin/managecabs/airport/" + e, method: "DELETE", isAdmin: true });
            request();
        }
    };

    return (
        <div>
            <div className="mt-5">
                {
                    data == null ? <div className="flex justify-center items-center mt-60"><Loader /></div> :
                        data.length == 0 ? <div className="flex justify-center items-center mt-20 "><p>No Cabs Found</p></div> :
                            <div className="grid grid-cols-2 gap-5 ">
                                {
                                    data.map((e, i) => {
                                        const view: cabViewData = {
                                            id: e._id!,
                                            image: e.image,
                                            name: e.cabName,
                                            packagers: e.maxPassengers,
                                            perKm: e.pricePerKm + " rs/KM",
                                            updateLink: adminRoutePath + "/managecabs/airport/edit/" + e._id,
                                            onDelete: onDelete,
                                        }
                                        return <ManagecabView data={view} key={"cab-" + i} />
                                    })
                                }
                            </div>
                }
            </div>
            <div className="">
                <Link to={adminRoutePath + "/managecabs/airport/add"} ><Button className="fixed bottom-8 right-8 z-50 shadow-xl">Add Airport Cab</Button></Link>
            </div>
        </div>
    )
}
export default AirportCabsView