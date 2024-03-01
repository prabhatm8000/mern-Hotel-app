import { hotelTypes } from "../config/hotel-options-config";

interface HotelTypesFilterProps {
    selectedHotelTypes: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const HotelTypesFilter = ({ selectedHotelTypes, onChange }: HotelTypesFilterProps) => {
    return (
        <div className="border-b border-slate-300 pb-5">
            <h4 className="text-md font-semibold mb-2">Hotel Type</h4>
            {hotelTypes.map((item, i) => {
                return (
                    <label key={i} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            className="rounded"
                            value={item}
                            checked={selectedHotelTypes.includes(item)}
                            onChange={onChange}
                        />
                        <span>{item}</span>
                    </label>
                );
            })}
        </div>
    );
};

export default HotelTypesFilter;
