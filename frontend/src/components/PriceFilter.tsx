interface PriceFilterProps {
    selectedPrice?: number;
    onChange: (value?: number) => void;
}

const PriceFilter = ({ selectedPrice, onChange }: PriceFilterProps) => {
    return (
        <div className="border-t border-slate-300 pb-5">
            <h4 className="text-md font-semibold mb-2">Max Price</h4>
            <select
                className="p-2 border rounded-md w-full"
                value={selectedPrice}
                onChange={(e) =>
                    onChange(
                        e.target.value ? parseInt(e.target.value) : undefined
                    )
                }
            >
                <option value="" defaultChecked>
                    Select Max Price
                </option>
                {[1000, 2000, 3000, 4000, 5000, 6000].map((item, i) => {
                    return (
                        <option key={i} value={item}>
                            {item}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default PriceFilter;
