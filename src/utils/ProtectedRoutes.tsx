import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../store.ts";

const ProtectedRoutes = () => {
    const isAuthenticated = useSelector((state: RootState)=> state.auth.isAuthenticated);

    return  isAuthenticated ? <Outlet/> : <Navigate to='/signin' replace/>;
}

export default ProtectedRoutes;


