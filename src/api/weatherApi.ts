import { LocationItem, WeatherData, HourlyForecastItem, DailyForecastItem } from '../types/weather';

const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';

export const DEFAULT_LOCATION: LocationItem = {
  id: 1581130,
  name: 'Hà Nội',
  country: 'Việt Nam',
  admin1: 'Thủ đô Hà Nội',
  latitude: 21.0285,
  longitude: 105.8542,
};

export const POPULAR_LOCATIONS: LocationItem[] = [
  { id: 1581130, name: 'Hà Nội', country: 'Việt Nam', latitude: 21.0285, longitude: 105.8542 },
  { id: 1566083, name: 'TP. Hồ Chí Minh', country: 'Việt Nam', latitude: 10.8231, longitude: 106.6297 },
  { id: 1583992, name: 'Đà Nẵng', country: 'Việt Nam', latitude: 16.0544, longitude: 108.2022 },
  { id: 1586203, name: 'Cần Thơ', country: 'Việt Nam', latitude: 10.0452, longitude: 105.7469 },
  { id: 1581298, name: 'Hải Phòng', country: 'Việt Nam', latitude: 20.8449, longitude: 106.6881 },
  { id: 1584166, name: 'Đà Lạt', country: 'Việt Nam', latitude: 11.9404, longitude: 108.4583 },
  { id: 1850147, name: 'Tokyo', country: 'Nhật Bản', latitude: 35.6895, longitude: 139.6917 },
  { id: 2988507, name: 'Paris', country: 'Pháp', latitude: 48.8566, longitude: 2.3522 },
  { id: 5128581, name: 'New York', country: 'Mỹ', latitude: 40.7128, longitude: -74.0060 },
];

function getDayOfWeekLabel(dateStr: string, index: number): string {
  if (index === 0) return 'Hôm nay';
  const date = new Date(dateStr);
  const days = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
  return days[date.getDay()];
}

export async function fetchWeatherData(location: LocationItem): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: location.latitude.toString(),
    longitude: location.longitude.toString(),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m',
    hourly: 'temperature_2m,weather_code,is_day',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset',
    timezone: 'auto',
    forecast_days: '7',
  });

  const response = await fetch(`${FORECAST_URL}?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Lỗi kết nối Open-Meteo: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  // Xử lý dữ liệu thời tiết hiện tại
  const current = {
    temperature: Math.round(data.current.temperature_2m),
    apparentTemperature: Math.round(data.current.apparent_temperature),
    humidity: data.current.relative_humidity_2m,
    windSpeed: Math.round(data.current.wind_speed_10m),
    precipitation: data.current.precipitation,
    weatherCode: data.current.weather_code,
    isDay: data.current.is_day,
    time: data.current.time,
  };

  // Lọc 24 mốc giờ kế tiếp từ thời điểm hiện tại
  const currentTime = data.current.time;
  let startIndex = data.hourly.time.findIndex((t: string) => t >= currentTime);
  if (startIndex === -1) startIndex = 0;

  const hourly: HourlyForecastItem[] = [];
  const hourlyCount = Math.min(24, data.hourly.time.length - startIndex);
  for (let i = 0; i < hourlyCount; i++) {
    const idx = startIndex + i;
    const timeIso = data.hourly.time[idx];
    const hourLabel = i === 0 ? 'Hiện tại' : timeIso.substring(11, 16); // "HH:MM"
    hourly.push({
      time: hourLabel,
      temperature: Math.round(data.hourly.temperature_2m[idx]),
      weatherCode: data.hourly.weather_code[idx],
      isDay: data.hourly.is_day[idx],
    });
  }

  // Xử lý 7 ngày dự báo
  const daily: DailyForecastItem[] = [];
  for (let i = 0; i < data.daily.time.length; i++) {
    daily.push({
      date: data.daily.time[i],
      dayOfWeek: getDayOfWeekLabel(data.daily.time[i], i),
      temperatureMax: Math.round(data.daily.temperature_2m_max[i]),
      temperatureMin: Math.round(data.daily.temperature_2m_min[i]),
      weatherCode: data.daily.weather_code[i],
      sunrise: data.daily.sunrise[i].substring(11, 16),
      sunset: data.daily.sunset[i].substring(11, 16),
    });
  }

  return {
    location,
    current,
    hourly,
    daily,
  };
}

export async function searchLocations(query: string): Promise<LocationItem[]> {
  if (!query.trim()) return [];
  const params = new URLSearchParams({
    name: query.trim(),
    count: '6',
    language: 'vi',
    format: 'json',
  });

  const response = await fetch(`${GEOCODING_URL}?${params.toString()}`);
  if (!response.ok) {
    return [];
  }

  const data = await response.json();
  if (!data.results) return [];

  return data.results.map((item: any) => ({
    id: item.id,
    name: item.name,
    country: item.country || '',
    admin1: item.admin1 || '',
    latitude: item.latitude,
    longitude: item.longitude,
  }));
}
