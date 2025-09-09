import {Navigate, Outlet} from "react-router-dom";
import {useApp} from "../context/AppContext.tsx";

const ProtectedRoutes = () => {
    const {isAuthenticated} = useApp();

    return  isAuthenticated ? <Outlet/> : <Navigate to='/signin' replace/>;
}

export default ProtectedRoutes;


