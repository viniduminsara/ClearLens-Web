import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store.ts";
import {setFilters} from "../features/filter/filterSlice.ts";

interface CategoryCardProps {
    title: string;
    image: string;
}

const CategoryCard = ({ title, image } : CategoryCardProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleCategoryToggle = (category: string) => {
        dispatch(setFilters({categories: [category]}));
    };

    return (
        <div
            className="card bg-base-100 image-full w-full mb-4 lg:w-96 shadow-xl cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-lg"
            onClick={() => {
                handleCategoryToggle(title);
                navigate('/products');
            }}
        >
            <figure>
                <img
                    src={image}
                    className='h-28'
                    alt="Shoes"/>
            </figure>
            <div className="card-body flex justify-center items-center">
                <h1 className='text-2xl font-bold'>{title}</h1>
            </div>
        </div>
    )
}

export default CategoryCard;
