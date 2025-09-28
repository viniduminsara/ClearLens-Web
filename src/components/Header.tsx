import {IoCartOutline} from "react-icons/io5";
import {BiHeart} from "react-icons/bi";
import {MdSearch} from "react-icons/md";
import {NavLink, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {searchProductService} from "../services/apiServices.ts";
import {Product} from "../interfaces/user.ts";
import {FiLogOut} from "react-icons/fi";
import LogoutConfirmationModal from "./modals/LogoutConfirmationModal.tsx";
import SearchResultItem from "./SearchResultItem.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../store.ts";
import {currentAuthState} from "../features/auth/authTypes.ts";

const Header = () => {
    const user = useSelector((state: RootState)=> state.auth.user);
    const isAuthenticated = useSelector((state: RootState)=> state.auth.isAuthenticated);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<Product[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const delayDebounce = setTimeout(async () => {
            if (searchTerm.trim()) {
                const res = await searchProductService(searchTerm);
                if (res.success){
                    setResults(res.body as Product[])
                }
            } else {
                setResults([]);
            }
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    const viewOrdersHandler = () => {
        navigate('/orders');
    }

    return (
        <div className="navbar fixed bg-base-100 z-50 py-4 px-3 md:px-6 lg:px-10 xl:px-12">
            <NavLink to='/' className="navbar-start">
                <img src='/logo.png' alt='logo' className='w-32 h-16 lg:w-36 lg:h-16'/>
            </NavLink>
            <div className="navbar-center hidden lg:flex relative">
                <div className="w-96">
                    <label className="input input-bordered flex items-center gap-2 w-full">
                        <input
                            type="text"
                            className="grow"
                            placeholder="Search Products"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <MdSearch size={20}/>
                    </label>

                    {results.length > 0 && (
                        <ul className="absolute z-20 mt-1 w-full bg-base-100 rounded shadow-lg max-h-60 overflow-y-auto">
                            {results.map((product) => (
                                <SearchResultItem product={product} setSearchTerm={setSearchTerm}/>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <div className="navbar-end gap-x-2">
                <NavLink to='/products' className='btn btn-sm btn-primary hidden lg:flex'>Explore</NavLink>
                {isAuthenticated == currentAuthState.SUCCESS && user ?
                    <>
                        <NavLink to='/wishlist' className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <BiHeart size={22}/>
                                {user?.wishlist.length > 0 ?
                                    <span
                                        className="badge badge-sm badge-secondary indicator-item">{user?.wishlist.length}</span> : ''
                                }
                            </div>
                        </NavLink>
                        <NavLink to='/cart' className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <IoCartOutline size={24}/>
                                {user?.cart.length > 0 ?
                                    <span
                                        className="badge badge-sm badge-secondary indicator-item">{user?.cart.length}</span> : ''
                                }
                            </div>
                        </NavLink>
                        <div className="dropdown dropdown-end ml-2">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar placeholder">
                                <div className="bg-neutral text-neutral-content w-10 rounded-full">
                                    <span className="text-lg">{user?.username.toUpperCase().slice(0, 1)}</span>
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li onClick={() => navigate('/profile')}>
                                    <a className='text-[16px] py-4'>
                                        <div className="avatar placeholder">
                                            <div className="bg-neutral text-neutral-content w-10 rounded-full">
                                                <span className="text-lg">{user?.username.toUpperCase().slice(0, 1)}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className='font-bold'>{user.username}</h3>
                                            <p className='text-xs text-gray-500'>{user.email}</p>
                                        </div>
                                    </a>
                                </li>
                                <li onClick={viewOrdersHandler}><a className='text-[16px] py-2'><IoCartOutline/> Orders</a>
                                </li>
                                <li onClick={() =>
                                    // @ts-expect-error showModal() comes with daisyUI and not recognized by TypeScript
                                    document.getElementById("logout_confirmation_modal")?.showModal()
                                }><a className='text-[16px] text-error py-2'><FiLogOut /> Logout</a></li>
                            </ul>
                        </div>

                        <LogoutConfirmationModal/>
                    </>
                    :
                    <>
                        <NavLink to='/signin' className="btn btn-sm btn-neutral btn-outline">
                            Sign in
                        </NavLink>
                        <NavLink to='/signup' className="btn btn-sm btn-neutral">
                            Create Account
                        </NavLink>
                    </>
                }


            </div>
        </div>
    )
}

export default Header;
