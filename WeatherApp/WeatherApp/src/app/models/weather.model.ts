export interface WeatherDetails {
    latitude:              number;
    longitude:             number;
    generationtime_ms:     number;
    utc_offset_seconds:    number;
    timezone:              string;
    timezone_abbreviation: string;
    elevation:             number;
    hourly_units:          HourlyUnits;
    hourly:                Hourly;
}

export interface Hourly {
    time:                 string[];
    temperature_2m:       number[];
    relativehumidity_2m:  number[];
    windspeed_10m:        number[];
    apparent_temperature: number[];
    snowfall:             number[];
}

export interface HourlyUnits {
    time:                 string;
    temperature_2m:       string;
    relativehumidity_2m:  string;
    windspeed_10m:        string;
    apparent_temperature: string;
    snowfall:             string;
}


export interface CityDetails {
    results:           Result[];
    generationtime_ms: number;
}

export interface Result {
    id:           number;
    name:         Name;
    latitude:     number;
    longitude:    number;
    elevation:    number;
    feature_code: FeatureCode;
    country_code: string;
    admin1_id:    number;
    timezone:     string;
    population?:  number;
    country_id:   number;
    country:      string;
    admin1:       string;
    admin2_id?:   number;
    admin2?:      string;
    admin3_id?:   number;
    admin3?:      string;
}

export enum FeatureCode {
    Ppl = "PPL",
}

export enum Name {
    Ko = "Ko",
    Kô = "Kô",
    Kō = "Kō",
}