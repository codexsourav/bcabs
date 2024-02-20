import { Link, useParams } from "react-router-dom"
import { UserWrapper } from "../../components/wrapper/UserWrapper"
import { ContainerWrapper } from "../../components/wrapper/Wrappers"
import { useEffect, useState } from "react"
import { apiRequest, withErrorHandling } from "../../helper/apiRequest";
import { toast } from "react-toastify";
import Loader from "../error/Loader";

function VerifyAccount() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const sendRequest = async () => {
        const res = await apiRequest<any>({ path: "/api/auth/verify/" + id, 'method': "POST" })
        toast.success(res.data.message);
        setLoading(false);
    };
    const onError = () => {
        setLoading(false);
        setError(true);
    }
    const request = withErrorHandling(sendRequest, onError)

    useEffect(() => {
        request();
    }, [])


    return (
        <UserWrapper>
            <div className="text-center flex justify-center items-center flex-col h-[80vh]">
                <ContainerWrapper className="flex justify-center items-center flex-col">
                    {
                        loading ? <Loader /> : error ?
                            <>
                                <img src="/assets/error.webp" alt="success" className="w-36 h-36 -mt-20 mb-10" />
                                <h1 className="text-3xl font-bold mb-6">Error Verifying Account!</h1>
                                <p className="text-lg mb-8">There was an error verifying your account. Please try again later or contact support for assistance.</p>
                                <p className="text-lg">
                                    <Link to="/" className="text-orange-600 hover:underline">Back to Home</Link>
                                </p>
                            </>

                            : <>
                                <img src="/assets/success.png" alt="success" className="w-36 h-36 -mt-20" />
                                <h1 className="text-3xl font-bold mb-6">Account Successfully Verified!</h1>
                                <p className="text-lg mb-8">Your account has been successfully verified. You can now enjoy full access to all features.</p>
                                <p className="text-lg">
                                    <Link to="/" className="text-orange-600 hover:underline">Back to Home</Link>
                                </p>
                            </>
                    }
                </ContainerWrapper>
            </div>
        </UserWrapper>
    )
}
export default VerifyAccount