import AccountTabWrapper from "../../../components/account/AccountTabWrapper";
import AccountTabview from "../../../components/account/AccountTabview";
import { UserWrapper } from "../../../components/wrapper/UserWrapper";
import { ContainerWrapper } from "../../../components/wrapper/Wrappers";

function AccountSetting() {
    return (
        <UserWrapper>
            <ContainerWrapper className="grid grid-col-1 md:grid-cols-10 mt-10">
                <AccountTabview />
                <AccountTabWrapper className="md:px-4">
                    Account

                </AccountTabWrapper>
            </ContainerWrapper>
        </UserWrapper >
    );
}

export default AccountSetting;
