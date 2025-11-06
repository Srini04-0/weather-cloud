import { WeatherData, ForecastData } from "@/types/weather";

const BASE_URL = "https://cloud-weather-api.onrender.com"; // your Flask backend URL

// Generic fetch helper
async function request<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    let msg = "";
    try {
      const data = JSON.parse(text);
      msg = data?.message || `${res.status} ${res.statusText}`;
    } catch {
      msg = text;
    }
    throw new Error(msg);
  }
  return res.json() as Promise<T>;
}

// Fetch current weather by city
export const fetchWeatherByCity = async (city: string): Promise<WeatherData> => {
  const q = encodeURIComponent(city.trim());
  const url = `${BASE_URL}/weather?city=${q}`;
  return request<WeatherData>(url);
};

// Fetch 5-day forecast (if your backend supports it)
export const fetchForecast = async (city: string): Promise<ForecastData> => {
  const q = encodeURIComponent(city.trim());
  const url = `${BASE_URL}/forecast?city=${q}`;
  return request<ForecastData>(url);
};

// Fetch weather by coordinates (lat/lon)
export const fetchWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}`;
  return request<WeatherData>(url);
};
