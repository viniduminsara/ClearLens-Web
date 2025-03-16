import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {BiHeart} from "react-icons/bi";
import {FaHeart, FaRegTrashAlt} from "react-icons/fa";
import {useApp} from "../../context/AppContext.tsx";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Product} from "../../interfaces/user.ts";

interface CartItemCardProps{
    product: Product;
    qty: number;
}

const CartItemCard = ({ product, qty }: CartItemCardProps) => {
    const {user, addWishlistItem, deleteCartItem, deleteWishlistItem, updateQtyOfCart} = useApp();

    const [isWishlistItem, setIsWishlistItem] = useState(false);

    useEffect(() => {
        if (user) {
            setIsWishlistItem(user?.wishlist.some((item) => item._id === product._id))
        }
    }, [product._id, user]);

    return (
        <div className='w-full p-6 shadow-xl rounded-3xl mb-4'>
            <div className='flex justify-between'>
                <div className='flex gap-x-6'>
                    <Link to={`/product/${product.name.toLowerCase().replace(/\s+/g, '-')}-${product._id}`} className='bg-black/[0.075] rounded-md flex items-center h-16 w-16 md:h-28 md:w-28'>
                        <img src={product.image}
                             alt="image" className='object-fit w-full'/>
                    </Link>
                    <div>
                        <h3 className='lg:text-xl py-3 font-semibold'>{product.name}</h3>
                        <div>
                            <span className='text-gray-700 mb-6'>Quantity: </span>
                            <div className='flex my-3'>
                                <button onClick={() => {
                                    if (qty > 1) {
                                        updateQtyOfCart(product._id, qty-1);
                                    }
                                }}
                                    className='btn btn-neutral btn-xs disabled:cursor-not-allowed'>
                                    <AiOutlineMinus/>
                                </button>
                                <span
                                    className='h-full w-10 bg-black/[0.075]  rounded-sm flex items-center justify-center'>
                                    {qty}
                                </span>
                                <button onClick={() => {
                                    if (qty >= 1) {
                                        updateQtyOfCart(product._id, qty+1);
                                    }
                                }}
                                    className='btn btn-neutral btn-xs rounded-md text-xs disabled:cursor-not-allowed'>
                                    <AiOutlinePlus/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-around flex-col">
                    <div className='flex sm:gap-3 mt-2 self-end'>
                        {!isWishlistItem ?
                            <button className='btn btn-ghost btn-circle cursor-pointer disabled:cursor-not-allowed'
                                    onClick={() => addWishlistItem(product._id)}
                            >
                                <BiHeart size={24} className='text-primary'/>
                            </button>
                            :
                            <button className='btn btn-ghost btn-circle cursor-pointer disabled:cursor-not-allowed'
                                    onClick={() => deleteWishlistItem(product._id)}
                            >
                                <FaHeart size={24} className='text-primary'/>
                            </button>
                        }
                        <button
                            className='btn btn-ghost btn-circle cursor-pointer disabled:cursor-not-allowed'
                            onClick={() => deleteCartItem(product._id)}
                        >
                            <FaRegTrashAlt size={20} className='text-primary'/>
                        </button>
                    </div>
                    <div className='self-end'>
                        <span className='text-lg md:text-2xl mr-2'>Rs.{product.newPrice}</span>
                        <span className='text-xs line-through text-gray-600 hidden md:inline'>Rs.{product.price}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItemCard;
