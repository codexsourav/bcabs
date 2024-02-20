import { Link } from "react-router-dom"
import Button from "../../components/Inputbox/Button"
import AdminNavbar from "../../components/admin/AdminNavbar"
import AdminTabWrapper from "../../components/admin/AdminTabWrapper"
import { adminRoutePath } from "../../routes/AdminRoutes"
import { apiRequest, baseUrl, withErrorHandling } from "../../helper/apiRequest"
import { useEffect, useState } from "react"
import Loader from "../../pages/error/Loader"
import { toast } from "react-toastify"
import { formatDate } from "../../utils/helper"

function ShowBlogs() {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<any>([]);


    const sendRequest = async () => {
        setLoading(true)
        const res = await apiRequest<any>({
            path: "/api/admin/blogs", 'method': "GET",
            isAdmin: true
        });
        setLoading(false);
        setData(res.data);
    };

    const onError = () => {
        setLoading(false);
        setData([]);
    }
    const handleLoadBlog = withErrorHandling(sendRequest, onError)

    useEffect(() => {
        handleLoadBlog()
    }, [])


    const deleteRequest = async (id: string) => {
        console.log("ok");

        const isConfirm = confirm("Are Your Sure To Delete?");
        if (isConfirm) {
            try {
                const res = await apiRequest<any>({
                    path: "/api/admin/blog/" + id, 'method': "DELETE",
                    isAdmin: true
                });
                toast.success(res.data.message);
                handleLoadBlog();
            } catch (error) {
                onError();
            }
        }
    };

    return (
        <>
            <AdminNavbar />
            <AdminTabWrapper>
                {loading ? <div className="flex justify-center items-center w-full h-96">
                    <Loader />
                </div> : <div className="flex flex-col gap-4">

                    {
                        data.map((e: any) => {
                            return <div key={e._id} className="w-full h-40 border flex  p-5 gap-10 items-center justify-between">
                                <div className="flex flex-row gap-5">
                                    <img src={baseUrl + "/uploads/" + e.image} className="h-32 w-32 object-cover border" />
                                    <div className="flex flex-col gap-3">
                                        <h1 className="font-bold line-clamp-2 text-xl">{e.title}</h1>
                                        <p>Date: {formatDate(e.date)}</p>
                                    </div>
                                </div>
                                <div className=" flex flex-col gap-5">
                                    <Link to={adminRoutePath + "/blogs/update/" + e._id}><Button>Update</Button></Link>
                                    <Button onClick={() => deleteRequest(e._id)} variant="danger">Delete</Button>
                                </div>
                            </div>

                        })
                    }

                </div>}
                <div className="fixed bottom-10 right-10">
                    <Link to={adminRoutePath + "/blogs/add"}><Button>Add New Blog</Button></Link>
                </div>
            </AdminTabWrapper>
        </>
    )
}
export default ShowBlogs