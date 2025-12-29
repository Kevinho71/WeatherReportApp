import type { JSX } from "react";
import type { Result } from "../../types/mapped/geocodingMapped.type";
import "../../styles/components/SearchHistory.css";

interface Props {
    history: Result[];
    onCitySelect: (city: Result) => void;
    onRemove: (latitude: number, longitude: number) => void;
}

export const SearchHistory = ({ history, onCitySelect, onRemove }: Props): JSX.Element => {
    if (history.length === 0) {
        return <></>;
    }

    return (
        <div className="search-history">
            <h3 className="search-history__title">
                BÚSQUEDAS RECIENTES
            </h3>
            <div className="search-history__list">
                {history.map((city, index) => (
                    <div
                        key={`${city.latitude}-${city.longitude}`}
                        className="search-history__item"
                        style={{ animationDelay: `${index * 0.1}s` }}
                        onClick={() => onCitySelect(city)}
                    >
                        
                        <span className="search-history__city">
                            {city.city}, {city.country}
                        </span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemove(city.latitude, city.longitude);
                            }}
                            className="search-history__remove"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
