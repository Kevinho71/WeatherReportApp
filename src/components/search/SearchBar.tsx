import type { JSX } from "react";
import { useCitySearch } from "../../hooks/useCitySearch";
import type { Result } from "../../types/mapped/geocodingMapped.type";
import "../../styles/components/SearchBar.css";

interface Props {
    onCitySelect: (city: Result) => void;
}

export const SearchBar = (props: Props): JSX.Element => {
    const { searchTerm, setSearchTerm, cities, loading, error } = useCitySearch();

    const handleCityClick = (city: Result) => {
        props.onCitySelect(city);
        setSearchTerm("");
    };

    return (
        <div className="search-bar">
            <div className="search-bar__container">
                <div className="search-bar__input-wrapper">
                    <span className="search-bar__icon">🔍</span>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar ciudad..."
                        className="search-bar__input"
                    />
                </div>
            </div>

            {loading && (
                <div className="search-bar__loading">
                    <div className="search-bar__spinner" />
                    Buscando ciudades...
                </div>
            )}
            
            {error && (
                <p className="search-bar__error">{error}</p>
            )}

            {cities.length > 0 && (
                <div className="search-bar__results">
                    {cities.map((city, index) => (
                        <div
                            key={index}
                            onClick={() => handleCityClick(city)}
                            className="search-bar__result-item"
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <div className="search-bar__result-city">
                                📍 {city.city}, {city.country}
                            </div>
                            <div className="search-bar__result-details">
                                {city.detail} • {city.latitude.toFixed(2)}°, {city.longitude.toFixed(2)}°
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};