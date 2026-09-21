export interface LocationItem {
  id: number;
  name: string;
  country: string;
  admin1?: string; // Tỉnh/Thành bang
  latitude: number;
  longitude: number;
}

export interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  weatherCode: number;
  isDay: number;
  time: string;
}

export interface HourlyForecastItem {
  time: string; // ISO or formatted hour (e.g. "14:00")
  temperature: number;
  weatherCode: number;
  isDay: number;
}

export interface DailyForecastItem {
  date: string; // YYYY-MM-DD
  dayOfWeek: string; // "Th 2", "Hôm nay", etc.
  temperatureMax: number;
  temperatureMin: number;
  weatherCode: number;
  sunrise: string;
  sunset: string;
}

export interface WeatherData {
  location: LocationItem;
  current: CurrentWeather;
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
}
