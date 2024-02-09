import { MyComponentProps } from "../wrapper/UserWrapper"
import AdminMenu from "./AdminMenu"

function AdminTabWrapper({ children, className }: MyComponentProps) {
    return (
        <div className="grid grid-cols-10 w-full gap-6">
            <div className="col-span-2">
                <AdminMenu />
            </div>
            <div className={"col-span-8 p-6 " + className}>
                {children}
            </div>
        </div>
    )
}
export default AdminTabWrapper