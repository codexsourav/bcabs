import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Label } from "../../components/Cabs/CabBox";
import Button from "../../components/Inputbox/Button";

import { UserWrapper } from "../../components/wrapper/UserWrapper";
import { ContainerWrapper } from "../../components/wrapper/Wrappers";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PassInputBox } from "../../components/Inputbox/GoogleInputBoc";
import { apiRequest, withErrorHandling } from "../../helper/apiRequest";
import { clearLocalStorageData } from "../../helper/storageKeys";

interface ResetPasswordState {
    newPassword: string;
    confirmNewPassword: string;
}

function ResetPassword() {
    const [loading, setLoading] = useState(false)
    const { id } = useParams();
    const navigate = useNavigate();
    const [resetPasswordState, setResetPasswordState] = useState<ResetPasswordState>({
        newPassword: "",
        confirmNewPassword: "",
    });

    const handleInputChange = (
        e: string,
        field: keyof ResetPasswordState
    ) => {
        setResetPasswordState({
            ...resetPasswordState,
            [field]: e,
        });
    };

    const validateResetPassword = () => {


        const { newPassword, confirmNewPassword } = resetPasswordState;

        if (!newPassword || !confirmNewPassword) {
            toast.error('Please Enter New & Confirm Password');
            return false;
        }

        if (newPassword !== confirmNewPassword) {
            toast.error('Passwords do not match');
            return false;
        }

        return true;
    };

    const sendRequest = async () => {
        setLoading(true)
        const res = await apiRequest<any>({ path: "/api/auth/resetpass/" + id, 'method': "POST", data: { password: resetPasswordState.newPassword } })
        toast.success(res.data.message);
        setLoading(false);
        setResetPasswordState({
            newPassword: "",
            confirmNewPassword: "",
        })
        clearLocalStorageData();
        navigate("/login", { replace: true });
    };
    const onError = () => {
        setLoading(false)
    }
    const request = withErrorHandling(sendRequest, onError)

    const handleResetPassword = () => {
        if (validateResetPassword()) {
            request();
        }
    };

    return (
        <UserWrapper>
            <ContainerWrapper>
                <div className="grid md:grid-cols-2 my-20 h-[600px] relative">
                    <div className="relative md:block hidden">
                        <div
                            className="bg-orange-400 h-full w-full border-orange-100 relative bg-cover bg-center bg-[url('/images/auth.jpg')] rounded-3xl shadow-2xl"
                        ></div>
                    </div>

                    <div className="relative px-8 md:px-14">
                        <div className="">
                            <h1 className="font-bold text-4xl text-orange-600 uppercase">
                                Reset Your Password
                            </h1>
                            <p className="text-gray-950/80 mt-6 md:text-lg text-sm leading-7">
                                No worries – resetting your password is a straightforward process. Follow these simple steps to regain control of your account and continue your seamless travel experience with us.
                            </p>
                        </div>
                        <div className="mt-8">
                            <Label>New Password</Label>
                            <PassInputBox
                                value={resetPasswordState.newPassword}
                                onChange={(e) => handleInputChange(e, "newPassword")}
                            />
                        </div>
                        <div className="mt-8">
                            <Label>Confirm New Password</Label>
                            <PassInputBox
                                value={resetPasswordState.confirmNewPassword}
                                onChange={(e) => handleInputChange(e, "confirmNewPassword")}
                            />
                        </div>
                        <div className="mt-8 md:mt-5 w-full">
                            <Button disabled={loading} className="w-full md:w-auto" onClick={handleResetPassword}>
                                {loading ? "Loading..." : "Reset Password"}
                            </Button>
                        </div>
                        <Link
                            to="/login"
                            className="mt-24 block text-center text-sm text-orange-600 font-bold"
                        >
                            Login Now
                        </Link>
                    </div>
                </div>
            </ContainerWrapper>
        </UserWrapper>
    );
}

export default ResetPassword;
