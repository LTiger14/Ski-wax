export interface HomeLocation {
  name?: string,
  lat: number,
  lon: number,
}

export interface DateCity {
  city: string,
  date: Date,
}

export interface Kv {
  key: string,
  value: string
}

export interface Forecast {
  latitude: number;
  longitude: number;
  //IANA timezone
  timezone: string;
  currently?: DataPoint;
  hourly?: {
    data: Array<DataPoint>
  };
  daily?: {
    data: Array<DataPoint>
  };
  timestamp: Date,
}

export interface DataPoint {
  //Fahrenheit or Celsius
  apparentTemperature?: number;
  apparentTemperatureMax?: number;
  apparentTemperatureMin?: number;
  //The percentage of sky occluded by clouds, between 0 and 1, inclusive
  cloudCover?: number;
  //Fahrenheit or Celsius
  dewPoint?: number;
  //The relative humidity, between 0 and 1, inclusive.
  humidity?: number;
  icon?: string;
  //Dobson(DU)
  ozone?: number;
  //inches
  precipAccumulation?: number;
  //inches/h
  precipIntensity?: number;
  //The probability of precipitation occurring, between 0 and 1, inclusive.
  precipProbability?: number;
  // "rain", "snow", or "sleet"
  precipType?: string;
  //millibars
  pressure?: number;
  summary?: string;
  sunriseTime?: number;
  sunsetTime?: number;
  //Fahrenheit
  temperature?: number;
  temperatureMax?: number;
  temperatureMin?: number;
  time?: number;
  //miles
  visibility?: number;
  //degree
  windBearing?: number;
  //miles per hour
  windSpeed?: number;
}

export interface Metrics {
  temp: MetricTemp;
}

export interface Wax {
  name: string;
  ref?: string;
  uri: string;
  newSnow: { min: number, max: number };
  oldSnow: { min: number, max: number };
}

export interface WaxesModel {
  waxes: Array<Wax>;
  sprays: Array<Wax>;
  performanceWaxes?: Array<Wax>;
  highPerformanceWaxes?: Array<Wax>;
}

export enum ActivityLevel {
  ACTIVE, SPORT, RACING
}

export enum MetricTemp {
  F = 'F',
  C = 'C'
}

export enum SnowType {
  NEW_SNOW, OLD_SNOW, MANMADE
}