export interface GeocodingMappedResponse {
    result: Result[];
}

export interface Result {
    city: string;
    country: string;
    detail: string;
    latitude: number;
    longitude: number;
}