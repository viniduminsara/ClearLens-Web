import {IoCartOutline} from "react-icons/io5";
import {BiHeart} from "react-icons/bi";
import {MdSearch} from "react-icons/md";
import {NavLink} from "react-router-dom";
import {useApp} from "../context/AppContext.tsx";
import {useEffect, useState} from "react";
import {searchProductService} from "../services/apiServices.ts";
import {Product} from "../interfaces/user.ts";

const Header = () => {
    const {isAuthenticated, user, logout} = useApp();
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<Product[]>([]);

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
                                <li key={product._id}>
                                    <NavLink
                                        to={`/product/${product.name.toLowerCase().replace(/\s+/g, '-')}-${product._id}`}
                                        className="block px-4 py-2 hover:bg-base-200 cursor-pointer"
                                        onClick={() => setSearchTerm('')} // clear search after selection
                                    >
                                        <div className='flex justify-between items-center'>
                                            <div className='flex items-center gap-2'>
                                                <section
                                                    className="relative p-2 bg-black/[0.075]  flex items-center justify-center rounded-lg">
                                                    <img
                                                        src={product.image}
                                                        alt="image"
                                                        className="object-contain w-12 h-12"
                                                    />
                                                </section>
                                                <div>{product.name}</div>
                                            </div>
                                            <div className=''>
                                                <div className='text-lg'>Rs.{product.newPrice}</div>
                                                <div className='line-through'>Rs.{product.price}</div>
                                            </div>
                                        </div>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <div className="navbar-end gap-x-2">
                <NavLink to='/products' className='btn btn-sm btn-primary hidden lg:flex'>Explore</NavLink>
                {isAuthenticated && user ?
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
                                <li>
                                    <a className="justify-between">
                                        {user?.username}
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li onClick={logout}><a>Logout</a></li>
                            </ul>
                        </div>
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
