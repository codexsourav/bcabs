import { Route } from "react-router-dom"
import OneWayExplore from "../pages/explore/OneWayExplore"
import RoundTripExplore from "../pages/explore/RoundTripExplore"
import LocalExplore from "../pages/explore/LocalExplore"
import AirportExplore from "../pages/explore/AirportExplore"

function ExploreRoutes() {
    return (
        <>
            <Route path="/explore/oneway" Component={OneWayExplore} />
            <Route path="/explore/roundtrip" Component={RoundTripExplore} />
            <Route path="/explore/local" Component={LocalExplore} />
            <Route path="/explore/airport" Component={AirportExplore} />
        </>
    )
}
export default ExploreRoutes