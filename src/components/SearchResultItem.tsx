import {NavLink} from "react-router-dom";
import {Product} from "../interfaces/user.ts";

interface SearchResultItemProps {
    product: Product;
    setSearchTerm: (searchTerm: string) => void;
}

const SearchResultItem = ({product,setSearchTerm}: SearchResultItemProps) => {

    return (
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
    )
}

export default SearchResultItem;
