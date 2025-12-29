import type { JSX } from "react";
import type { Current, Daily } from "../../types/mapped/weatherMapped.types";
import { getWeatherIcon } from "../../utils/iconMapper";
import { getWeatherDescription } from "../../utils/weatherDescription";
import "../../styles/components/CurrentWeather.css";

interface Props {
    current: Current;
    daily: Daily;
    cityName: string;
}

export const CurrentWeather = ({ current, daily, cityName }: Props): JSX.Element => {
    return (
        <div className="current-weather">
            <h2 className="current-weather__city">
                 {cityName}
            </h2>

            <div className="current-weather__main">
                <div className="current-weather__icon">
                    <img 
                        src={getWeatherIcon(current.weather_code, 1)} 
                        alt="Weather icon"
                    />
                </div>
                <div className="current-weather__temp-info">
                    <div className="current-weather__temp">
                        {Math.round(current.temperature)}°
                    </div>
                    <div className="current-weather__description">
                        {getWeatherDescription(current.weather_code)}
                    </div>
                </div>
            </div>

            <div className="current-weather__stats">
                <div className="current-weather__stat">
                    <div className="current-weather__stat-label">
                        🔺 MÁXIMA
                    </div>
                    <div className="current-weather__stat-value">
                        {Math.round(daily.max_temperature[0])}°
                    </div>
                </div>
                <div className="current-weather__stat">
                    <div className="current-weather__stat-label">
                        🔻 MÍNIMA
                    </div>
                    <div className="current-weather__stat-value">
                        {Math.round(daily.min_temperature[0])}°
                    </div>
                </div>
                <div className="current-weather__stat">
                    <div className="current-weather__stat-label">
                        💨 VIENTO
                    </div>
                    <div className="current-weather__stat-value">
                        {Math.round(current.wind_speed)}
                    </div>
                    <div style={{ fontSize: "12px", color: "#B0C4DE", marginTop: "4px" }}>
                        km/h
                    </div>
                </div>
            </div>
        </div>
    );
};
