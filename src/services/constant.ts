import { MetricTemp } from './model';

// Keys for storage
export const CONFIG = {	
	HOME_LOCATION: 'homeLocation',
	METRICS_PREFERENCES: 'metricsPrefs',
	WEATHER_DATA: 'weatherData',
	WEATHER_UPDATE_AND_CITY: 'weatherUpdateCity',
};

export const DEFAULT_METRICS = {
	temp: MetricTemp.C,
}

// Number of hours the weather data remains valid
export const VALID_WEATHER_DURATION = 8;