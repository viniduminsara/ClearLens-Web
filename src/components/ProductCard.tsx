import {GiRoundStar} from "react-icons/gi";
import {BiHeart} from "react-icons/bi";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {FaHeart} from "react-icons/fa";
import {Product} from "../interfaces/user.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store.ts";
import {addCartItem, deleteCartItem} from "../features/cart/cartThunks.ts";
import {useToast} from "../context/ToastContext.tsx";
import {addWishlistItem, deleteWishlistItem} from "../features/auth/authThunks.ts";

interface ProductCardProps {
    data: Product
}

const ProductCard = ({ data }: ProductCardProps) => {
    const user = useSelector((state: RootState)=> state.auth.user);
    const isAuthenticated = useSelector((state: RootState)=> state.auth.isAuthenticated);
    const dispatch = useDispatch<AppDispatch>();
    const {showToast} = useToast();
    const [isCartItem, setIsCartItem] = useState(false);
    const [isWishlistItem, setIsWishlistItem] = useState(false);

    useEffect(() => {
        if (user){
            setIsCartItem(user?.cart.some((item) => item._id === data._id))
            setIsWishlistItem(user?.wishlist.some((item) => item._id === data._id))
        }
    }, [data._id, user]);

    const handleAddCartItem = async () => {
        try {
            await dispatch(addCartItem(data._id)).unwrap();
            showToast({ type: "success", message: "Added to cart successfully" });
        } catch (err) {
            showToast({ type: "error", message: String(err) });
        }
    }

    const handleDeleteCartItem = async () => {
        try {
            await dispatch(deleteCartItem(data._id)).unwrap();
            showToast({ type: "success", message: "Removed from cart successfully" });
        } catch (err) {
            showToast({ type: "error", message: String(err) });
        }
    }

    const handleAddWishlistItem = async () => {
        try {
            await dispatch(addWishlistItem(data._id)).unwrap();
            showToast({ type: "success", message: "Added to wishlist successfully" });
        } catch (err) {
            showToast({ type: "error", message: String(err) });
        }
    }

    const handleDeleteWishlistItem = async () => {
        try {
            await dispatch(deleteWishlistItem(data._id)).unwrap();
            showToast({ type: "success", message: "Removed from wishlist successfully" });
        } catch (err) {
            showToast({ type: "error", message: String(err) });
        }
    }

    return (
        <div className="card card-compact bg-base-100 w-96 shadow-xl mb-6 lg:m-4 transition-transform hover:scale-[1.02] hover:shadow-lg">
            <Link to={`/product/${data.name.toLowerCase().replace(/\s+/g, '-')}-${data._id}`}
                className='flex items-center justify-center py-4 bg-black/[0.075] rounded-t-2xl xs:w-1/2 w-full sm:w-full'>
                <figure>
                    <img
                        src={data.image}
                        alt="Shoes"
                        className='w-full object-cover xs:object-contain sm:object-cover h-36'
                    />
                </figure>
            </Link>
            <div className="card-body">
                <Link to={`/product/${data.name.toLowerCase().replace(/\s+/g, '-')}-${data._id}`} className=" flex justify-between">
                    <div className="flex flex-col">
                        <span className="text-xl font-medium mb-2">{data.name}</span>
                        <span className="flex items-center gap-1.5">
                            <span>{data.rating}</span>
                            <GiRoundStar className=" text-yellow-400 mb-1"/>
                            <span className="text-xs text-gray-400">Rating</span>
                        </span>
                    </div>

                    <div className="flex flex-col items-end">
                        <span className="text-xl">Rs. {data.newPrice}</span>
                        <span className="text-lg text-gray-600 line-through">
                            Rs. {data.price}
                        </span>
                    </div>
                </Link>
                {isAuthenticated ?
                    <div className="card-actions justify-between items-center mt-4">
                        {!isCartItem ?
                            <div className="btn btn-primary btn-outline" onClick={handleAddCartItem}>
                                Add to Cart
                            </div>
                            :
                            <div className="btn btn-primary btn-outline" onClick={handleDeleteCartItem}>
                                Remove from Cart
                            </div>
                        }
                        {!isWishlistItem ?
                            <div className='btn btn-ghost btn-circle cursor-pointer'
                                 onClick={handleAddWishlistItem}>
                                <BiHeart size={28} className='text-primary'/>
                            </div>

                            :

                            <div className='btn btn-ghost btn-circle cursor-pointer'
                                 onClick={handleDeleteWishlistItem}>
                                <FaHeart size={28} className='text-primary'/>
                            </div>
                        }
                    </div>

                    :

                    <></>
                }
            </div>
        </div>
    )
}

export default ProductCard;
