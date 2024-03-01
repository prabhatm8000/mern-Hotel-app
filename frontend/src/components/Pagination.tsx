export interface PaginationProps {
    page: number;
    pages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ page, pages, onPageChange }: PaginationProps) => {
    const pageNumbers = [];
    for(let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
    }
    return <div className="flex justify-center">
        <ul className="flex border border-slate-300">
            {pageNumbers.map((item) => {
                return (
                    <li onClick={() => onPageChange(item)} key={item} className={`cursor-pointer px-2 ${page === item ? "bg-amber-600 text-white" : ""}`}>
                        {item}
                    </li>
                );
            })}
        </ul>
    </div>;
};

export default Pagination;
