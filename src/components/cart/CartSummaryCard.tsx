import PriceCard from "./PriceCard.tsx";
import {CartItem} from "../../interfaces/cart.ts";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

interface CartSummaryCardProps {
    cart: CartItem[] | undefined;
}

const CartSummaryCard = ({ cart }: CartSummaryCardProps) => {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (!cart) return;

        const newTotal = cart.reduce((acc, item) => acc + item.product.newPrice * item.qty, 0);
        setTotal(newTotal);
    }, [cart]);

    return (
        <section className='md:col-span-1 py-7 px-7 rounded-md shadow-sm flex flex-col gap-6 w-full h-min'>
            <h1 className='text-xl'>Price Details</h1>
            { cart?.map((item, index) => (
                <PriceCard key={index} data={item} />
            ))}

            <div className='flex justify-between items-center'>
                <div className='text-2xl'>Total</div>
                <div className='text-2xl'>Rs. {total.toLocaleString()}</div>
            </div>

            <Link to='/checkout' className='w-full py-2 flex gap-4 items-center'>
                <div className='btn btn-primary'>Proceed to Checkout</div>
            </Link>
        </section>
    )
}

export default CartSummaryCard;
