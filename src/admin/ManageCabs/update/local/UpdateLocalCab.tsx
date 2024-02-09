import AdminNavbar from "../../../../components/admin/AdminNavbar"
import AdminTabWrapper from "../../../../components/admin/AdminTabWrapper"
import AddNewLocal from "./AddNewLocal"

function UpdateLocalCab() {
    return (
        <>
            <AdminNavbar />
            <AdminTabWrapper>
                <AddNewLocal />
            </AdminTabWrapper>
        </>
    )
}
export default UpdateLocalCab