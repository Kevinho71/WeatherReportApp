import axios from "axios";
import type { Current, Daily, Hourly, WeatherMappedResponse } from "../types/mapped/weatherMapped.types";
import {type WeatherRawResponse } from "../types/raw/weatherRaw.types";

export const getWeatherByCoordinates = async (latitude: number, longitude: number): Promise<WeatherMappedResponse> => {
    const rawDataResponse = await axios.get<WeatherRawResponse>(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code,wind_speed_10m,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max&timezone=auto&forecast_days=8`
    );

    const rawData = rawDataResponse.data;

    const mappedCurrentData: Current = {
        temperature: rawData.current.temperature_2m,
        weather_code: rawData.current.weather_code,
        wind_speed: rawData.current.wind_speed_10m
    };

    const mappedHourlyData: Hourly = {
        hour: rawData.hourly.time.slice(0, 24).map((timestamp: string) => timestamp.split('T')[1]),
        temperature: rawData.hourly.temperature_2m.slice(0, 24),
        weather_code: rawData.hourly.weather_code.slice(0, 24),
        wind_speed: rawData.hourly.wind_speed_10m.slice(0, 24),
        is_day: rawData.hourly.is_day.slice(0, 24)
    };

    const mappedDailyData: Daily = {
        date: rawData.daily.time,
        weather_code: rawData.daily.weather_code,
        max_temperature: rawData.daily.temperature_2m_max,
        min_temperature: rawData.daily.temperature_2m_min,
        wind_speed: rawData.daily.wind_speed_10m_max
    };

    return {
        current_data: mappedCurrentData,
        hourly_data: mappedHourlyData,
        daily_data: mappedDailyData
    };
};