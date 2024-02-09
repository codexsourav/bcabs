import { Link } from "react-router-dom"
import Button from "../../../components/Inputbox/Button"
import ManagecabView, { cabViewData } from "../../../components/admin/cabs/ManagecabView"
import { adminRoutePath } from "../../../routes/AdminRoutes"
import { useEffect, useState } from "react"
import { IOneWayCab } from "../../../interface/cabs/cab"
import { apiRequest, withErrorHandling } from "../../../helper/apiRequest"
import Loader from "../../../pages/error/Loader"

function OneWayCabsView() {
    const [data, setData] = useState<IOneWayCab[] | null>(null)
    const loadCab = async () => {
        setData(null)
        const res = await apiRequest<IOneWayCab[]>({ "path": "/api/admin/cabs/oneway", isAdmin: true });
        setData(res.data);
    }

    const onError = () => {
        setData([]);
    }
    const request = withErrorHandling(loadCab, onError);

    useEffect(() => {
        request();
    }, []);


    const onDelete = async (e: string) => {
        const isConfirm = confirm("Are You Sure To Delete?");
        if (isConfirm) {
            await apiRequest<any>({ "path": "/api/admin/managecabs/oneway/" + e, method: "DELETE", isAdmin: true });
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
                                            updateLink: adminRoutePath + "/managecabs/oneway/edit/" + e._id,
                                            onDelete: onDelete,
                                        }
                                        return <ManagecabView data={view} key={"cab-" + i} />
                                    })
                                }
                            </div>
                }
            </div>
            <div className="">
                <Link to={adminRoutePath + "/managecabs/oneway/add"}><Button className="fixed bottom-8 right-8 z-50 shadow-xl">Add OneWay Cab</Button></Link>
            </div>
        </div>
    )
}
export default OneWayCabsView