import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../store.ts";
import {currentAuthState} from "../features/auth/authTypes.ts";
import NotFound from "../pages/NotFound.tsx";

const ProtectedRoutes = () => {
    const isAuthenticated = useSelector((state: RootState)=> state.auth.isAuthenticated);

    return  isAuthenticated == currentAuthState.SUCCESS ? <Outlet/> : isAuthenticated == currentAuthState.PENDING ? <NotFound/> : <Navigate to='/signin' replace/>;
}

export default ProtectedRoutes;


