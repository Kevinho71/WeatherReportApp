import { useState } from "react";
import { getWeatherByCoordinates } from "../services/weatherApi";
import type { WeatherMappedResponse } from "../types/mapped/weatherMapped.types";

export const useWeather = () => {
    const [weatherData, setWeatherData] = useState<WeatherMappedResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchWeather = async (latitude: number, longitude: number) => {
        try {
            setLoading(true);
            setError(null);
            
            const data = await getWeatherByCoordinates(latitude, longitude);
            setWeatherData(data);
            
        } catch {
            setError("Error al obtener el clima");
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    };

    return {
        weatherData,
        loading,
        error,
        fetchWeather
    };
};