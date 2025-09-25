import {FaRegCheckCircle} from "react-icons/fa";
import {MdErrorOutline} from "react-icons/md";
import {IoWarningOutline} from "react-icons/io5";
import {IoMdInformationCircleOutline} from "react-icons/io";
import {IToast} from "../interfaces/toast.ts";

interface ToastProps {
    data: IToast;
}

const Toast = ({ data }: ToastProps) => {

    const getIcon = () => {
        if (data.type === 'success'){
            return <FaRegCheckCircle />
        }else if (data.type === 'error'){
            return <MdErrorOutline />
        }else if (data.type === 'warning'){
            return <IoWarningOutline />
        }else if (data.type === 'info'){
            return <IoMdInformationCircleOutline />
        }
    }

    return (
        <div role="alert" className={`alert bg-neutral text-${data.type} justify-start`}>
            <div className='flex items-center gap-2'>
                {getIcon()}
                <span>{data.message}</span>
            </div>
        </div>
    )
}

export default Toast;
