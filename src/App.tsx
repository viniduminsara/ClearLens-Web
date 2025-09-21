import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout.tsx";
import Home from "./pages/Home.tsx";
import Products from "./pages/Products.tsx";
import ProductDetails from "./pages/ProductDetails.tsx";
import Wishlist from "./pages/Wishlist.tsx";
import Cart from "./pages/Cart.tsx";
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
import {GoogleOAuthProvider} from "@react-oauth/google";
import Profile from "./pages/Profile.tsx";
import NotFound from "./pages/NotFound.tsx";

function App() {

    return (
        <GoogleOAuthProvider clientId={`${import.meta.env.VITE_GOOGLE_0AUTH_CLIENT_ID}`}>
            <ToastProvider>
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
                                    <Route path='/profile' element={<Profile/>}/>
                                </Route>
                                <Route path="*" element={<NotFound />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                    <ToastContainer/>
            </ToastProvider>
        </GoogleOAuthProvider>
    )
}

export default App
