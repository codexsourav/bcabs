import AdminNavbar from "../../components/admin/AdminNavbar"
import AdminTabWrapper from "../../components/admin/AdminTabWrapper"
import ManageCabTab from "../../components/admin/cabs/ManageCabTab";
import { useContext } from "react";
import OneWayCabsView from "./view/OneWayCabsView";
import LocalCabsView from "./view/LocalCabsView";
import RoundTripCabsView from "./view/RoundTripCabsView";
import AirportCabsView from "./view/AirportCabsView";
import { AdminTabContext } from "../../context/InitContext";

function ManageCabs() {
    const { adminTabIndex, setAdminTabIndex } = useContext(AdminTabContext);

    return (
        <>
            <AdminNavbar />
            <AdminTabWrapper>
                <ManageCabTab index={adminTabIndex} onChange={(e) => setAdminTabIndex(e)} />
                {[<OneWayCabsView />, <LocalCabsView />, <RoundTripCabsView />, <AirportCabsView />][adminTabIndex]}
            </AdminTabWrapper>
        </>
    )
}

export default ManageCabs;