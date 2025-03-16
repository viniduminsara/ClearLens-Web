import {useNavigate} from "react-router-dom";
import {MdCancel} from "react-icons/md";

const PaymentFail = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center pt-36 pb-20 bg-base-200 text-center">
            <div className="p-8 rounded-2xl shadow-lg flex flex-col items-center max-w-md">
                <MdCancel className="text-red-500 w-20 h-20 mb-4"/>
                <h1 className="text-3xl font-bold text-error">Payment Failed!</h1>
                <p className="text-gray-600 mt-2">Something went wrong. Please try again.</p>
                {/*<p className="text-gray-600">Something went wrong. Please try again.</p>*/}
                <button className="mt-6 btn btn-primary" onClick={() => navigate('/')}>Return to Home</button>
            </div>
        </div>
    );
}

export default PaymentFail;
