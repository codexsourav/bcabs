import { Link } from "react-router-dom"
import Button from "../../components/Inputbox/Button"
import AdminNavbar from "../../components/admin/AdminNavbar"
import AdminTabWrapper from "../../components/admin/AdminTabWrapper"
import { adminRoutePath } from "../../routes/AdminRoutes"

function ShowBlogs() {
    return (
        <>
            <AdminNavbar />
            <AdminTabWrapper>
                <div className="flex flex-col gap-4">

                    <div className="w-full h-40 border flex  p-5 gap-10 items-center ">
                        <img src="https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHx8&w=1000&q=80" className="h-32 w-32 object-cover" />
                        <div className="flex flex-col gap-3">
                            <h1 className="font-bold line-clamp-2 text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit unde minima mollitia aperiam veritatis quae quam, omnis quo soluta adipisci autem commodi? Magni doloribus beatae minima fugit esse ducimus voluptatem.</h1>
                            <p>Date: 02-11-2001</p>
                        </div>
                        <div className=" flex flex-col gap-5">
                            <Button>Update</Button>
                            <Button variant="danger">Delete</Button>
                        </div>
                    </div>


                    <div className="w-full h-40 border flex  p-5 gap-10 items-center ">
                        <img src="https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHx8&w=1000&q=80" className="h-32 w-32 object-cover" />
                        <div className="flex flex-col gap-3">
                            <h1 className="font-bold line-clamp-2 text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit unde minima mollitia aperiam veritatis quae quam, omnis quo soluta adipisci autem commodi? Magni doloribus beatae minima fugit esse ducimus voluptatem.</h1>
                            <p>Date: 02-11-2001</p>
                        </div>
                        <div className=" flex flex-col gap-5">
                            <Button>Update</Button>
                            <Button variant="danger">Delete</Button>
                        </div>
                    </div>

                </div>
                <div className="fixed bottom-10 right-10">
                    <Link to={adminRoutePath + "/blogs/add"}><Button>Add New Blog</Button></Link>
                </div>
            </AdminTabWrapper>
        </>
    )
}
export default ShowBlogs