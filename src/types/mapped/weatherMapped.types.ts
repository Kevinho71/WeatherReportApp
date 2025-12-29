export interface WeatherMappedResponse{
    current_data: Current;
    hourly_data: Hourly;
    daily_data: Daily;

}

export interface Daily{
    weather_code:number[];
    date: Date[];
    max_temperature: number[];
    min_temperature: number[];
    wind_speed: number[];

}


export interface Hourly{
    hour: string[];
    temperature: number[];
    weather_code: number[];
    wind_speed: number[];
    is_day: number[];

}

export interface Current {
    temperature: number;
    weather_code: number;
    wind_speed: number;
}