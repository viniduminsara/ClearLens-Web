import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout.tsx";
import Home from "./pages/Home.tsx";
import Products from "./pages/Products.tsx";
import ProductDetails from "./pages/ProductDetails.tsx";
import Wishlist from "./pages/Wishlist.tsx";
import Cart from "./pages/Cart.tsx";
import {AppContextProvider} from "./context/AppContext.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import {ToastProvider} from "./context/ToastContext.tsx";
import ToastContainer from "./components/ToastContainer.tsx";
import ProtectedRoutes from "./utils/ProtectedRoutes.tsx";
import Checkout from "./pages/Checkout.tsx";
import PaymentSuccess from "./pages/PaymentSuccess.tsx";
import PaymentFail from "./pages/PaymentFail.tsx";
import Orders from "./pages/Orders.tsx";
import OrderDetails from "./pages/OrderDetails.tsx";

function App() {

    return (
        <ToastProvider>
            <AppContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route element={<Layout/>}>
                            <Route path='/' element={<Home/>}/>
                            <Route path='/signin' element={<SignIn/>}/>
                            <Route path='/signup' element={<SignUp/>}/>
                            <Route path='/products' element={<Products/>}/>
                            <Route path='/product/:productId' element={<ProductDetails/>}/>
                            <Route element={<ProtectedRoutes/>}>
                                <Route path='/wishlist' element={<Wishlist/>}/>
                                <Route path='/cart' element={<Cart/>}/>
                                <Route path='/checkout' element={<Checkout/>}/>
                                <Route path='/paymentSuccess' element={<PaymentSuccess/>}/>
                                <Route path='/paymentFailure' element={<PaymentFail/>}/>
                                <Route path='/orders' element={<Orders/>}/>
                                <Route path='/order/:orderId' element={<OrderDetails/>}/>
                            </Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
                <ToastContainer/>
            </AppContextProvider>
        </ToastProvider>
    )
}

export default App
