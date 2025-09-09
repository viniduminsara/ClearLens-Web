import {useEffect, useState} from "react";
import {PlacedOrder} from "../interfaces/user.ts";
import {useParams} from "react-router-dom";
import {getUserOrderDetailsService} from "../services/apiServices.ts";
import {useToast} from "../context/ToastContext.tsx";

const OrderDetails = () => {
    const {orderId} = useParams();
    const [order, setOrder] = useState<PlacedOrder | null>(null);
    const {showToast} = useToast();

    const fetchOrderDetails = async () => {
        if (orderId) {
            const res = await getUserOrderDetailsService(orderId);
            if (res.success){
                setOrder(res.body as PlacedOrder);
            } else {
                showToast({type: 'error', message: res.message})
            }
        }
    }

    useEffect(() => {
        fetchOrderDetails();
    }, [orderId]);

    if (!order) {
        return (
            <div className="px-6 md:px-24 pt-20">
                <div className="flex justify-center items-center h-64">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            </div>
        )
    }

    // Define order status steps
    const orderSteps = [
        { name: 'Order Placed', status: 'PLACED' },
        { name: 'Processing', status: 'PROCESS' },
        { name: 'Shipped', status: 'DELIVER' },
        { name: 'Delivered', status: 'COMPLETED' }
    ];

    // Find current step index
    const currentStepIndex = orderSteps.findIndex(step =>
        step.status === order.status
    );

    // Format date
    const formattedDate = new Date(order.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="px-6 md:px-24 pt-20 pb-10">

            {/* Order Summary Card */}
            <div className="card bg-base-100 shadow-lg mb-8">
                <div className="card-body">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div>
                            <h3 className="text-xl font-semibold">Order #{order._id}</h3>
                            <p className="text-sm text-gray-500">Placed on {formattedDate}</p>
                        </div>
                        <div className="badge badge-lg mt-2 md:mt-0">
                            {order.paymentStatus}
                        </div>
                    </div>

                    {/* Order Status Steps */}
                    <div className="mb-8">
                        <ul className="steps steps-vertical md:steps-horizontal w-full">
                            {orderSteps.map((step, index) => (
                                <li
                                    key={step.name}
                                    className={`step ${index <= currentStepIndex ? 'step-primary' : ''}`}
                                    data-content={index <= currentStepIndex ? '✓' : ''}
                                >
                                    {step.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="divider"></div>

                    {/* Order Items */}
                    <h4 className="text-lg font-semibold mb-4">Items</h4>
                    <div className="space-y-4">
                        {order.orderItems.map(item => (
                            <div key={item._id} className="flex items-start gap-4">
                                <div className="avatar">
                                    <div className="w-16 h-16 rounded">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h5 className="font-medium">{item.name}</h5>
                                    <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">
                                        Rs.{(item.newPrice || item.price).toFixed(2)}
                                    </p>
                                    {item.newPrice && item.newPrice !== item.price && (
                                        <p className="text-sm line-through text-gray-500">
                                            Rs.{item.price.toFixed(2)}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="divider"></div>

                    {/* Order Summary */}
                    <div className="flex justify-end">
                        <div className="w-full md:w-1/3 space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span>Rs.{order.amount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping:</span>
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total:</span>
                                <span>Rs.{order.amount.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Shipping and Payment Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <h3 className="card-title">Shipping Information</h3>
                        <p>Standard Shipping</p>
                        <p>Estimated delivery: 3-5 business days</p>
                    </div>
                </div>
                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <h3 className="card-title">Payment Method</h3>
                        <p>Card Payment via PayHere</p>
                        <p className="text-sm text-gray-500">Paid on {formattedDate}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails;
