import { WeatherData, ForecastData } from "@/types/weather";

let API_KEY = "895284fb2d2c50a520ea537456963d9c"; // Demo key - users should replace
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const setApiKey = (key: string) => {
  API_KEY = key;
};

async function request<T>(url: string): Promise<T> {
  const res = await fetch(url);
  const text = await res.text();
  let data: any;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = text;
  }

  if (!res.ok) {
    // OpenWeather returns { cod: "404", message: "city not found" } on errors
    const msg = data?.message || `${res.status} ${res.statusText}`;
    throw new Error(msg);
  }

  return data as T;
}

export const fetchWeatherByCity = async (city: string): Promise<WeatherData> => {
  const q = encodeURIComponent(city.trim());
  const url = `${BASE_URL}/weather?q=${q}&units=metric&appid=${API_KEY}`;
  return request<WeatherData>(url);
};

export const fetchForecast = async (city: string): Promise<ForecastData> => {
  const q = encodeURIComponent(city.trim());
  const url = `${BASE_URL}/forecast?q=${q}&units=metric&appid=${API_KEY}`;
  return request<ForecastData>(url);
};

export const fetchWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  return request<WeatherData>(url);
};
