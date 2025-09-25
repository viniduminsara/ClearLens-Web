import {useToast} from "../context/ToastContext.tsx";
import Toast from "./Toast.tsx";

const ToastContainer = () => {
    const {toasts} = useToast();

    return (
        <div id="toast" className="toast toast-top toast-end mt-24 z-50">
            {toasts.map((value, index) => (
                <Toast key={index} data={value}/>
            ))}
        </div>
    )
}

export default ToastContainer;
