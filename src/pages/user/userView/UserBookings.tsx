import AccountTabWrapper, { CabBookingView } from "../../../components/account/AccountTabWrapper";
import AccountTabview from "../../../components/account/AccountTabview";
import { UserWrapper } from "../../../components/wrapper/UserWrapper";
import { ContainerWrapper } from "../../../components/wrapper/Wrappers";



function UserBookings() {
    return (
        <UserWrapper>
            <ContainerWrapper className="grid grid-col-1 md:grid-cols-10 mt-10">
                <AccountTabview />
                <AccountTabWrapper>
                    <CabBookingView />
                    <CabBookingView />
                    <CabBookingView />
                    <CabBookingView />
                    <CabBookingView />

                </AccountTabWrapper>
            </ContainerWrapper>
        </UserWrapper >
    );
}

export default UserBookings;