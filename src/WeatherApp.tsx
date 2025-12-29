import type { JSX } from "react";
import { useState } from "react";
import { Layout } from "./components/layout/Layout";
import { SearchBar } from "./components/search/SearchBar";
import { SearchHistory } from "./components/search/SearchHistory";
import { CurrentWeather } from "./components/weather/CurrentWeather";
import { HourlyForecast } from "./components/weather/HourlyForecast";
import { DailyForecast } from "./components/weather/DailyForecast";
import { LoadingSpinner } from "./components/common/LoadingSpinner";
import { ErrorMessage } from "./components/common/ErrorMessage";
import { useWeather } from "./hooks/useWeather";
import { useSearchHistory } from "./hooks/useSearchHistory";
import { useGeolocation } from "./hooks/useGeolocation";
import type { Result } from "./types/mapped/geocodingMapped.type";
import "./styles/components/WeatherApp.css";

export const WeatherApp = (): JSX.Element => {
    const [selectedCity, setSelectedCity] = useState<Result | null>(null);
    const { weatherData, loading, error, fetchWeather } = useWeather();
    const { history, addToHistory, removeFromHistory } = useSearchHistory();
    const { loading: geoLoading, error: geoError, getCurrentLocation } = useGeolocation();

    const handleCitySelect = async (city: Result) => {
        setSelectedCity(city);
        addToHistory(city);
        await fetchWeather(city.latitude, city.longitude);
    };

    const handleLocationClick = async () => {
        const location = await getCurrentLocation();
        if (location) {
            await handleCitySelect(location);
        }
    };

    return (
        <Layout>
            <div className="weather-app__search-container">
                <div className="weather-app__search-wrapper">
                    <SearchBar onCitySelect={handleCitySelect} />
                </div>
                
                <button
                    onClick={handleLocationClick}
                    disabled={geoLoading}
                    className="weather-app__location-btn"
                    title="Usar mi ubicación actual"
                >
                    <span className="weather-app__location-icon">
                        {geoLoading ? "⏳" : "🎯"}
                    </span>
                    <span>
                        {geoLoading ? "Obteniendo..." : "Mi ubicación"}
                    </span>
                </button>
            </div>

            {geoError && <ErrorMessage message={geoError} />}

            <div className="weather-app__history-container">
                <div className="weather-app__history-wrapper">
                    <SearchHistory 
                        history={history}
                        onCitySelect={handleCitySelect}
                        onRemove={removeFromHistory}
                    />
                </div>
            </div>

            {loading && <LoadingSpinner />}

            {error && <ErrorMessage message={error} />}

            {weatherData && selectedCity && !loading && (
                <div>
                    <div className="weather-app__grid">
                        <CurrentWeather 
                            current={weatherData.current_data}
                            daily={weatherData.daily_data}
                            cityName={`${selectedCity.city}, ${selectedCity.country}`}
                        />
                        <HourlyForecast hourly={weatherData.hourly_data} />
                    </div>

                    <DailyForecast daily={weatherData.daily_data} />
                </div>
            )}

            {!selectedCity && !loading && (
                <div className="weather-app__empty-state">
                    <div className="weather-app__empty-icon">
                        🌤️
                    </div>
                    <p className="weather-app__empty-title">
                        Busca una ciudad para ver el pronóstico del tiempo
                    </p>
                </div>
            )}
        </Layout>
    );
};