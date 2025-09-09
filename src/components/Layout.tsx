import Header from "./Header.tsx";
import {Outlet} from "react-router-dom";
import Footer from "./Footer.tsx";
import FilterModal from "./modals/FilterModal.tsx";

const Layout = () => {

    return (
        <>
            <Header/>

            <div className="drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle"/>
                <div className="drawer-content">

                    <main>
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
