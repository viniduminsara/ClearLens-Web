import {CartItem} from "../../interfaces/cart.ts";

interface PriceCardProps{
    data: CartItem;
}

const PriceCard = ({ data }: PriceCardProps) => {

    return (
        <div className='flex justify-between'>
            <div className='text-gray-600 flex-1'>
                {data.product.name} × {data.qty}
            </div>
            <div className='text-gray-600 text-lg'>
                Rs. {data.product.newPrice * data.qty}
            </div>
        </div>
    )
}

export default PriceCard;
