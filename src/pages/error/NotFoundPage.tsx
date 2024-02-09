
import { Link } from 'react-router-dom';
import { ContainerWrapper } from '../../components/wrapper/Wrappers';
import { UserWrapper } from '../../components/wrapper/UserWrapper';

const NotFoundPage = () => {
    return (
        <UserWrapper>
            <div className="text-center flex justify-center items-center flex-col h-[80vh]">
                <ContainerWrapper>
                    <h1 className="text-5xl font-bold mb-6">404 - Not Found</h1>
                    <p className="text-lg mb-8">Oops! The page you're looking for might be under construction or doesn't exist.</p>
                    <p className="text-lg">
                        <Link to="/" className="text-orange-600 hover:underline">Back to Home</Link>
                    </p>
                </ContainerWrapper>
            </div>
        </UserWrapper>
    );
};

export default NotFoundPage;
