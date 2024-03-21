import { AiFillStar } from "react-icons/ai";

interface StarRatingFilterProps {
    selectedStars: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StarRatingFilter = ({ selectedStars, onChange }: StarRatingFilterProps) => {
    return (
        <div className="border-t border-slate-300 pb-5">
            <h4 className="text-md font-semibold mb-2">Property Rating</h4>
            {["5", "4", "3", "2", "1"].map((item, i) => {
                return (
                    <label key={i} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            className="rounded"
                            value={item}
                            checked={selectedStars.includes(item)}
                            onChange={onChange}
                        />
                        <span className="flex">
                            {Array.from({ length: parseInt(item) }).map(
                                (_, i) => {
                                    return (
                                        <AiFillStar
                                            key={i}
                                            className="fill-yellow-400"
                                        />
                                    );
                                }
                            )}
                        </span>
                    </label>
                );
            })}
        </div>
    );
};

export default StarRatingFilter;
