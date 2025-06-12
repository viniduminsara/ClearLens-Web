import ProductCard from "../components/ProductCard.tsx";
import {useEffect, useState} from "react";
import {useToast} from "../context/ToastContext.tsx";
import {productsService} from "../services/apiServices.ts";
import {Product} from "../interfaces/user.ts";
import {PaginatedProductResponse} from "../interfaces/api.ts";
import {IoFilter} from "react-icons/io5";
import {useApp} from "../context/AppContext.tsx";
import PaginateFooter from "../components/PaginateFooter.tsx";

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const {showToast} = useToast();
    const {filters} = useApp();

    const getProducts = async () => {

        const obj = {
            sort: filters.sort || 'ASC',
            gender: filters.gender || 'ALL',
            categories: filters.categories || [],
            minPrice: filters.minPrice || 0,
            maxPrice: filters.maxPrice || 10000
        }

        const res = await productsService(currentPage, obj);
        if (res.success) {
            setProducts((res.body as PaginatedProductResponse).docs);
            setTotalPages((res.body as PaginatedProductResponse).totalPages);
        } else {
            showToast({ type: "error", message: res.message });
        }
    };

    useEffect(() => {
        getProducts();
        window.scrollTo(0, 0);
    }, [currentPage, filters]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className='px-6 md:px-24 pt-28'>
            <img
                src='/products_banner.jpg'
                alt='bannerImg'
                className='rounded-2xl h-full min-h-[10rem] object-cover'
            />
            <section>
                <div className='flex justify-between items-end'>
                    <h2 className='text-3xl mt-8'>Glasses for you!</h2>
                    <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
                        <IoFilter />Filters
                    </label>
                </div>
                {products.length > 0 ? (
                    <>
                        <div className='flex flex-wrap justify-center my-8'>
                            {products.map((product, index) => (
                                <ProductCard key={index} data={product}/>
                            ))}
                        </div>
                        <PaginateFooter handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages}/>
                    </>
                ) : (
                    <div className='flex flex-col justify-center items-center py-20'>
                        <img src="/search_not_found.png" alt="search not found image"/>
                        <p className='text-lg text-[#767C9C] text-center'>Products not found</p>
                    </div>
                )}
            </section>
        </div>
    )
}

export default Products;
