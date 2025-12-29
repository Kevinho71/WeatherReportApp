import type { JSX } from "react";
import type { Hourly } from "../../types/mapped/weatherMapped.types";
import { getWeatherIcon } from "../../utils/iconMapper";
import "../../styles/components/HourlyForecast.css";

interface Props {
    hourly: Hourly;
}

export const HourlyForecast = ({ hourly }: Props): JSX.Element => {
    return (
        <div className="hourly-forecast">
            <h3 className="hourly-forecast__title">
                 Pronóstico por Hora (Hoy)
            </h3>

            <div className="hourly-forecast__list">
                {hourly.hour.map((hour, index) => (
                    <div 
                        key={index}
                        className="hourly-forecast__item"
                        style={{ animationDelay: `${index * 0.05}s` }}
                    >
                        <div className="hourly-forecast__hour">
                            {hour}
                        </div>
                        
                        <img 
                            src={getWeatherIcon(hourly.weather_code[index], hourly.is_day[index])}
                            alt="Weather icon"
                            className="hourly-forecast__icon"
                        />
                        
                        <div className="hourly-forecast__temp">
                            {Math.round(hourly.temperature[index])}°
                        </div>
                        
                        <div className="hourly-forecast__wind">
                            💨 {Math.round(hourly.wind_speed[index])} km/h
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
