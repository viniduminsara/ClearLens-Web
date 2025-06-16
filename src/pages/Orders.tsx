import {getUserOrderService} from "../services/apiServices.ts";
import {useEffect, useState} from "react";
import {PaginatedOrderResponse} from "../interfaces/api.ts";
import {PlacedOrder} from "../interfaces/user.ts";
import {useToast} from "../context/ToastContext.tsx";
import {Link} from "react-router-dom";
import PaginateFooter from "../components/PaginateFooter.tsx";

const Orders = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [orders, setOrders] = useState<PlacedOrder[]>([]);
    const {showToast} = useToast();

    const fetchUserOrders = async () => {
        const res = await getUserOrderService(currentPage);
        if (res.success) {
            setOrders((res.body as PaginatedOrderResponse).docs);
            setTotalPages((res.body as PaginatedOrderResponse).totalPages);
        } else {
            showToast({ type: "error", message: res.message });
        }
    }

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    useEffect(() => {
        fetchUserOrders();
    }, [currentPage]);

    return (
        <div className="px-6 md:px-24 pt-20">
            <h2 className='text-3xl mt-8'>Orders</h2>

            {
                orders.length > 0 ? (
                    <div className='py-8'>
                        {orders.map((order) => (
                            <Link to={`/order/${order._id}`} key={order._id} className='w-full p-4 rounded-lg shadow-2xl mb-4'>
                                <div
                                    className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                                    <div>
                                        <h3 className="text-xl font-semibold">Order #{order._id}</h3>
                                        <p className="text-sm text-gray-500">Placed on {
                                            new Date(order.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })
                                        }</p>
                                    </div>
                                    <div className="badge badge-lg mt-2 md:mt-0"
                                         data-theme={order.paymentStatus === 'SUCCESS' ? 'success' : 'error'}>
                                        {order.paymentStatus}
                                    </div>
                                </div>
                                {order.orderItems.map(item => (
                                    <div key={item._id}
                                         className="flex items-center bg-base-100 shadow rounded-lg p-4 gap-4">
                                        <img src={item.image} alt={item.name}
                                             className="w-20 h-20 object-cover rounded"/>
                                        <div className="flex-1">
                                            <p className="text-lg font-medium">{item.name}</p>
                                            <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="line-through text-sm text-gray-400">Rs. {item.price}</p>
                                            <p className="text-lg font-bold text-primary">Rs. {item.newPrice}</p>
                                        </div>
                                    </div>
                                ))}
                            </Link>
                        ))}
                        <PaginateFooter handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />
                    </div>
                ) : (
                    <>
                        <div className='flex justify-center items-center min-h-screen'>
                            <div className='flex flex-col justify-center items-center'>
                                <img src='/empty-wishlist.png' className='w-64 h-64 mb-4' alt='cart image'/>
                                <h3 className='text-xl font-bold mb-2'>Nothing to Show!</h3>
                                <p className='font-thin text-center'>Unlock Your Shopping Desires: Place orders to appear here</p>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default Orders;
