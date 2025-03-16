import { useApp } from "../context/AppContext.tsx";
import { useEffect, useState } from "react";
import {
    completeOrderPaymentService,
    getUserAddressesService,
    initializeNewOrderService
} from "../services/apiServices.ts";
import {Address, UserObject} from "../interfaces/user.ts";
import { useToast } from "../context/ToastContext.tsx";
import {ApiResponse, OrderWithHash} from "../interfaces/api.ts";
import { MdShoppingCart } from "react-icons/md";
import NewAddressModal from "../components/NewAddressModal.tsx";
import {useNavigate} from "react-router-dom";

const Checkout = () => {
    const { cartItems, updateUser, user } = useApp();
    const { showToast } = useToast();
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [total, setTotal] = useState(0);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const navigate = useNavigate();

    useEffect(() => {

        const newTotal = cartItems.reduce((acc, item) => acc + item.product.newPrice * item.qty, 0);
        setTotal(newTotal);
    }, [cartItems]);

    const getUserAddresses = async () => {
        const res = await getUserAddressesService();
        if (res) {
            setAddresses(res.body as Address[]);
            (res.body as Address[]).length > 0 && setSelectedAddress((res.body as Address[])[0]);
        } else {
            showToast({ type: "error", message: (res as ApiResponse).message });
        }
    };

    useEffect(() => {
        if (user && user?.cart.length === 0){
            navigate('/')
            return
        }

        getUserAddresses();
    }, [user]);

    const updateAddress = async (addressData: Address[]) => {
        setAddresses(addressData);
    };

    const handleAddressSelection = (address: Address) => {
        setSelectedAddress(address);
    };

    const loadScript = async (url: string) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = url;

            script.onload = () => {
                resolve(true);
            };

            script.onerror = () => {
                resolve(false);
            };

            document.body.appendChild(script);
        });
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            showToast({ type: "error", message: "Please select an address before placing an order!" });
            return;
        }
        console.log("Order placed with address:", selectedAddress);

        const obj = {
            amount: total,
            orderItems: cartItems
        }

        const res = await initializeNewOrderService(obj);
        if (res.success){
            const orderId = (res.body as OrderWithHash).order._id;
            const hash = (res.body as OrderWithHash).hash;

            const scriptLoad = await loadScript('https://www.payhere.lk/lib/payhere.js')

            if (!scriptLoad) {
                showToast({ type: "error", message: 'Payhere SDK failed to load, check you connection' });
                return;
            }

            // @ts-expect-error PayHere SDK is loaded dynamically and not recognized by TypeScript
            payhere.onCompleted = async function (orderId) {
                const obj = {
                    _id: orderId,
                    paymentStatus: 'SUCCESS'
                }

                const res = await completeOrderPaymentService(obj)
                if (res.success) {
                    updateUser(res.body as UserObject)
                    navigate('/paymentSuccess');
                } else {
                    navigate('/paymentFailure');
                    showToast({ type: "error", message: (res as ApiResponse).message });
                }
            };

            // @ts-expect-error PayHere SDK is loaded dynamically and not recognized by TypeScript
            payhere.onDismissed = async function () {
                const obj = {
                    _id: orderId,
                    paymentStatus: 'FAILED'
                }

                const res = await completeOrderPaymentService(obj)
                if (res.success) {
                    navigate('/paymentFailure');
                } else {
                    navigate('/paymentFailure');
                    showToast({ type: "error", message: (res as ApiResponse).message });
                }
            };

            // @ts-expect-error PayHere SDK is loaded dynamically and not recognized by TypeScript
            payhere.onError = async function () {
                 const obj = {
                    _id: orderId,
                    paymentStatus: 'FAILED'
                }

                const res = await completeOrderPaymentService(obj)
                if (res.success) {
                    navigate('/paymentFailure');
                } else {
                    navigate('/paymentFailure');
                    showToast({ type: "error", message: (res as ApiResponse).message });
                }
            };

            const payment = {
                "sandbox": true,
                "merchant_id": "1229800",
                "return_url": undefined,
                "cancel_url": undefined,
                "notify_url": undefined,
                "order_id": orderId,
                "items": "Product Purchase",
                "amount": parseFloat(String(total)),
                "currency": "LKR",
                "hash": hash,
                "first_name": "Saman",
                "last_name": "Perera",
                "email": "samanp@gmail.com",
                "phone": "0771234567",
                "address": "No.1, Galle Road",
                "city": "Colombo",
                "country": "Sri Lanka",
                "delivery_address": `${selectedAddress.houseNo}, ${selectedAddress.street}`,
                "delivery_city": selectedAddress.city,
                "delivery_country": "Sri Lanka",
                "custom_1": "",
                "custom_2": ""
            };

            // @ts-expect-error PayHere SDK is loaded dynamically and not recognized by TypeScript
            payhere.startPayment(payment);
        } else {
            navigate('/paymentFailure');
            showToast({ type: "error", message: (res as ApiResponse).message });
        }
    };

    return (
        <div className="px-6 pt-20 md:px-24">
            <div className="md:flex md:space-x-6">
                <div className="md:w-1/2">
                    <div className="flex justify-between my-6">
                        <h2 className="text-2xl">Address</h2>
                        <button
                            // @ts-expect-error showModal() comes with daisyUI and not recognized by TypeScript
                            onClick={() => document.getElementById("my_modal_5")?.showModal()}
                            className="btn btn-sm btn-primary"
                        >
                            + Add new Address
                        </button>
                    </div>
                    {addresses.length > 0 &&
                        addresses.map((address, index) => (
                            <div
                                key={index}
                                className={`p-4 mb-4 flex gap-4 border ${
                                    selectedAddress?._id === address._id ? "border-primary" : "border-gray-600"
                                } rounded-lg`}
                            >
                                <input
                                    type="radio"
                                    name="address"
                                    className="radio radio-sm radio-primary mt-1"
                                    checked={selectedAddress?._id === address._id}
                                    onChange={() => handleAddressSelection(address)}
                                />
                                <div>
                                    <p className="font-semibold">{address.fullName}</p>
                                    <p className="text-gray-600">
                                        {address.houseNo}, {address.street}
                                    </p>
                                    <p className="text-gray-600">
                                        {address.city}, {address.postalCode}
                                    </p>
                                    <p className="text-gray-600">
                                        Mobile: <span className="font-semibold">{address.mobileNumber}</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>

                {/* Order Summary Section */}
                <div className="md:w-1/2">
                    <h2 className="text-2xl my-6">Order Summary</h2>
                    {cartItems.length > 0 &&
                        cartItems.map((item, index) => (
                            <div key={index} className="flex justify-between items-center mb-4">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-black/[0.075] rounded-2xl flex items-center h-12 w-12 md:h-20 md:w-20">
                                        <img src={item.product.image} alt="image" className="object-fit w-full" />
                                    </div>
                                    <div>
                                        <p className="mb-1">{item.product.name}</p>
                                        <div className="flex items-end space-x-2">
                                            <p className="text-sm">Rs.{item.product.newPrice}</p>
                                            <p className="text-xs text-gray-600 line-through">Rs.{item.product.price}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-lg">× {item.qty}</div>
                            </div>
                        ))}
                    <div className="divider"></div>

                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span>Total Products</span>
                            <span>{cartItems.length}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>Rs.{total.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Delivery Charges</span>
                            <span>Free</span>
                        </div>
                    </div>

                    <div className="divider"></div>

                    <div className="flex justify-between items-center mb-6">
                        <span className="text-xl font-semibold">Total</span>
                        <span className="text-xl font-semibold">Rs.{total.toLocaleString()}/=</span>
                    </div>

                    <button onClick={handlePlaceOrder} className="w-full btn btn-primary my-6">
                        <MdShoppingCart size={18} /> Place Order
                    </button>
                </div>
            </div>

            {/*New Address modal*/}
            <NewAddressModal updateAddressHandler={updateAddress} />
        </div>
    );
};

export default Checkout;
