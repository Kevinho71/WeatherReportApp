import type { JSX } from "react";
import type { Daily } from "../../types/mapped/weatherMapped.types";
import { getWeatherIcon } from "../../utils/iconMapper";
import "../../styles/components/DailyForecast.css";

interface Props {
    daily: Daily;
}

export const DailyForecast = ({ daily }: Props): JSX.Element => {
    const formatDate = (dateString: Date): string => {
        const date = new Date(`${dateString}T00:00:00`);
        const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        
        return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
    };

    return (
        <div className="daily-forecast">
            <h3 className="daily-forecast__title">
                 Pronóstico de 7 Días
            </h3>

            <div className="daily-forecast__grid">
                {daily.date.slice(1).map((date, index) => {
                    const actualIndex = index + 1; // Saltar el primer elemento (índice 0)
                    return (
                        <div 
                            key={index}
                            className="daily-forecast__item"
                            style={{ animationDelay: `${index * 0.08}s` }}
                        >
                            <div className="daily-forecast__date">
                                {formatDate(date)}
                            </div>
                            
                            <img 
                                src={getWeatherIcon(daily.weather_code[actualIndex], 1)}
                                alt="Weather icon"
                                className="daily-forecast__icon"
                            />
                            
                            <div className="daily-forecast__temps">
                                <div className="daily-forecast__temp-max">
                                    {Math.round(daily.max_temperature[actualIndex])}°
                                </div>
                                <div className="daily-forecast__temp-min">
                                    {Math.round(daily.min_temperature[actualIndex])}°
                                </div>
                            </div>
                            
                            <div className="daily-forecast__wind">
                                💨 {Math.round(daily.wind_speed[actualIndex])} km/h
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
