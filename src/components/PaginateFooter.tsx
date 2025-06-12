import {FaAnglesLeft, FaAnglesRight} from "react-icons/fa6";

interface PaginateFooterProps {
    handlePageChange: (newPage: number) => void;
    currentPage: number;
    totalPages: number;
}

const PaginateFooter = ({handlePageChange, currentPage, totalPages}: PaginateFooterProps) => {

    return (
        <div className='flex justify-center items-center mb-8'>
            <div className="join">
                <button className='join-item btn' onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}>
                    <FaAnglesLeft/>
                </button>
                {Array.from({length: totalPages}, (_, i) => i + 1).map(i => (
                    <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={`join-item btn ${currentPage === i ? 'btn-primary' : ''}`}
                    >
                        {i}
                    </button>
                ))}
                <button className='join-item btn' onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}>
                    <FaAnglesRight/>
                </button>
            </div>
        </div>
    )
}

export default PaginateFooter;
