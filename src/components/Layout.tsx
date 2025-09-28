import Header from "./Header.tsx";
import {Outlet} from "react-router-dom";
import Footer from "./Footer.tsx";
import FilterModal from "./modals/FilterModal.tsx";
import {AppDispatch} from "../store.ts";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {fetchUserDetails} from "../features/auth/authThunks.ts";
import {useToast} from "../context/ToastContext.tsx";

const Layout = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { showToast } = useToast();

    useEffect(() => {
        handleFetchUserDetails();
    }, []);

    const handleFetchUserDetails = async () => {
        try {
            await dispatch(fetchUserDetails());
        } catch (err) {
            showToast({ type: "error", message: String(err) });
        }
    }

    return (
        <>
            <Header/>

            <div className="drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle"/>
                <div className="drawer-content">

                    <main className='min-h-[76vh]'>
                        <Outlet/>
                    </main>

                    <Footer/>

                </div>
                <FilterModal/>
            </div>
        </>
    )
}

export default Layout;
