import axios from "axios"
import  { type GeocodingMappedResponse } from "../types/mapped/geocodingMapped.type";
import { type GeocodingRawResponse } from "../types/raw/geocodingRaw.type";
import type { ReverseGeocodingMappedResponse } from "../types/mapped/reverseGeocodingMapped.type";
import type { ReverseGeocodingRawResponse } from "../types/raw/reverseGeocodingRaw.type";

export const getCoordinatesByCityName = async (name: string): Promise<GeocodingMappedResponse> => {
    const rawDataResponse = await axios.get<GeocodingRawResponse>(
        `https://geocoding-api.open-meteo.com/v1/search?name=${name}`
    );

    const rawData = rawDataResponse.data;

    if (!rawData.results || rawData.results.length === 0) {
        return { result: [] };
    }

    return {
        result: rawData.results.map((g) => ({
            city: g.name,
            country: g.country,
            detail: g.admin1,
            latitude: g.latitude,
            longitude: g.longitude
        }))
    };
};

export const getCityNameByCoordinates = async (latitude: number, longitude: number): Promise<ReverseGeocodingMappedResponse> => {
    const apikey = import.meta.env.VITE_OPEN_WEATHER_GEOCODING_API_KEY;
    const rawDataResponse = await axios.get<ReverseGeocodingRawResponse[]>(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apikey}`
    );

    const rawData = rawDataResponse.data;

    if (!rawData || rawData.length === 0) {
        throw new Error("No se pudo obtener la ubicación");
    }

    const location = rawData[0];

    return {
        city: location.name,
        country: location.country,
        latitude: location.lat,
        longitude: location.lon
    };
};