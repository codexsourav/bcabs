import CabBox, { TripBoxContent, TripBoxWrapper } from "../../components/Cabs/CabBox";
import { CabExploreWrapper, CabViewWrapper, ExploreWrapper, TripInfoWrapper } from "../../components/Cabs/Explore";
import { UserWrapper } from "../../components/wrapper/UserWrapper"



function OneWayExplore() {
    return (
        <UserWrapper>
            <ExploreWrapper>
                <TripInfoWrapper >
                    <TripBoxWrapper >
                        <TripBoxContent title="Hello" value="testing ok" />
                    </TripBoxWrapper>
                </TripInfoWrapper>
                <CabExploreWrapper>
                    <CabViewWrapper>
                        <CabBox />
                        <CabBox />
                        <CabBox />
                        <CabBox />

                    </CabViewWrapper>
                    <CabViewWrapper>
                        <CabBox />
                        <CabBox />
                        <CabBox />
                        <CabBox />

                    </CabViewWrapper>
                </CabExploreWrapper>
            </ExploreWrapper>
        </UserWrapper >
    )
}
export default OneWayExplore;

