export interface WeatherRawResponse {
    latitude:              number;
    longitude:             number;
    generationtime_ms:     number;
    utc_offset_seconds:    number;
    timezone:              string;
    timezone_abbreviation: string;
    elevation:             number;
    current_units:         CurrentUnits;
    current:               Current;
    hourly_units:          HourlyUnits;
    hourly:                Hourly;
    daily_units:           DailyUnits;
    daily:                 Daily;
}

export interface Current {
    time:            string;
    interval:        number;
    temperature_2m:  number;
    weather_code:    number;
    wind_speed_10m:  number;
}

export interface CurrentUnits {
    time:           string;
    interval:       string;
    temperature_2m: string;
}

export interface Daily {
    time:               Date[];
    weather_code:       number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    wind_speed_10m_max: number[];
}

export interface DailyUnits {
    time:               string;
    weather_code:       string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    wind_speed_10m_max: string;
}

export interface Hourly {
    time:           string[];
    temperature_2m: number[];
    weather_code:   number[];
    wind_speed_10m: number[];
    is_day:         number[];
}

export interface HourlyUnits {
    time:           string;
    temperature_2m: string;
    weather_code:   string;
    wind_speed_10m: string;
    is_day:         string;
}
