import { useApp } from "../../context/AppContext.tsx";
import { useEffect, useState } from "react";

const FilterModal = () => {
    const { filters, setFilters } = useApp();

    // Local states for debouncing
    const [min, setMin] = useState(filters.minPrice);
    const [max, setMax] = useState(filters.maxPrice);

    // Debounce effect
    useEffect(() => {
        const timeout = setTimeout(() => {
            setFilters(prev => ({
                ...prev,
                minPrice: min,
                maxPrice: max,
            }));
        }, 500);

        return () => clearTimeout(timeout);
    }, [min, max]);

    const handleSortChange = (newSort: 'ASC' | 'DESC') => {
        setFilters(prev => ({ ...prev, sort: newSort }));
    };

    const handleGenderChange = (newGender: string) => {
        setFilters(prev => ({ ...prev, gender: newGender }));
    };

    const handleCategoryToggle = (category: string) => {
        setFilters(prev => {
            const exists = prev.categories.includes(category);
            const newCategories = exists
                ? prev.categories.filter(cat => cat !== category)
                : [...prev.categories, category];
            return { ...prev, categories: newCategories };
        });
    };

    return (
        <div className="drawer-side">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

            <ul className="menu bg-base-200 text-base-content min-h-full w-88 p-4 pt-28">
                <h1 className='text-lg font-bold text-primary mb-6'>Filters</h1>

                {/* Sort */}
                <div className='space-y-3 mb-6'>
                    <div className='text-lg'>Sort By Price</div>
                    <div className="join">
                        <input
                            className="join-item btn"
                            type="radio"
                            name="sort"
                            checked={filters.sort === 'ASC'}
                            onChange={() => handleSortChange('ASC')}
                            aria-label="Low to High"
                        />
                        <input
                            className="join-item btn"
                            type="radio"
                            name="sort"
                            checked={filters.sort === 'DESC'}
                            onChange={() => handleSortChange('DESC')}
                            aria-label="High to Low"
                        />
                    </div>
                </div>

                {/* Gender */}
                <div className='space-y-3 mb-6'>
                    <div className='text-lg'>Gender</div>
                    <div className="join">
                        {['All', 'Men', 'Women', 'Unisex'].map(option => (
                            <input
                                key={option}
                                className="join-item btn"
                                type="radio"
                                name="gender"
                                checked={filters.gender === option}
                                onChange={() => handleGenderChange(option)}
                                aria-label={option}
                            />
                        ))}
                    </div>
                </div>

                {/* Category */}
                <div className='space-y-3 mb-6'>
                    <div className='text-lg'>Category</div>
                    <div className='w-3/4'>
                        {['Sports', 'Vision', 'Sunglasses'].map((cat) => (
                            <div key={cat} className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text capitalize">{cat}</span>
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-primary checkbox-sm"
                                        checked={filters.categories.includes(cat)}
                                        onChange={() => handleCategoryToggle(cat)}
                                    />
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div className='space-y-3 mb-6'>
                    <div className='text-lg'>Price Range</div>
                    <div className='flex gap-2 w-full'>
                        <div>
                            <label className='text-xs'>Min</label>
                            <label className="input input-bordered flex items-center gap-2 text-sm w-32">
                                <input
                                    type="number"
                                    min={0}
                                    className="grow"
                                    value={min}
                                    onChange={(e) => setMin(parseInt(e.target.value) || 0)}
                                />
                            </label>
                        </div>
                        <div>
                            <label className='text-xs'>Max</label>
                            <label className="input input-bordered flex items-center gap-2 text-sm w-32">
                                <input
                                    type="number"
                                    min={0}
                                    className="grow"
                                    value={max}
                                    onChange={(e) => setMax(parseInt(e.target.value) || 0)}
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </ul>
        </div>
    );
};

export default FilterModal;
