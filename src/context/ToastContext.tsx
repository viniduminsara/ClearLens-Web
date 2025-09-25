import { createContext, ReactNode, useContext, useState } from "react";
import {IToast} from "../interfaces/toast.ts";

interface ToastContextType {
    showToast: (toast: IToast) => void;
    toasts: IToast[];
}

const defaultContext: ToastContextType = {
    showToast: () => {},
    toasts: []
};

const ToastContext = createContext<ToastContextType>(defaultContext);

interface ToastProviderProps {
    children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [toasts, setToasts] = useState<IToast[]>([]);

    const showToast = (toast: IToast) => {
        setToasts(prevState => [...prevState, toast]);

        //remove toast after 3 seconds
        setTimeout(() => {
            setToasts(prev => prev.slice(1));
        }, 3000);
    };

    return (
        <ToastContext.Provider value={{ showToast, toasts }}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = (): ToastContextType => {
    return useContext(ToastContext);
};
