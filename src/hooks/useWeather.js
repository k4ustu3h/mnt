import { useEffect, useState } from "react";

import useSettings from "@/hooks/useSettings";

import { getIconUrl, getWeatherDetails } from "@/utils/weather";

export default function useWeather() {
	const { themeScheme } = useSettings();

	const [weatherData, setWeatherData] = useState({
		temperature: "--",
		iconName: "mostly_sunny",
		label: "Loading...",
	});

	const [systemTheme, setSystemTheme] = useState(
		window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light",
	);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handleChange = (e) =>
			setSystemTheme(e.matches ? "dark" : "light");

		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, []);

	useEffect(() => {
		const cachedWeatherStr = localStorage.getItem("MNTweatherCache");
		if (cachedWeatherStr) {
			const cachedWeather = JSON.parse(cachedWeatherStr);
			const now = Date.now();

			if (now - cachedWeather.timestamp < 1800000) {
				setWeatherData(cachedWeather.data);
				return;
			}
		}

		const defaultLat = 51.5036;
		const defaultLon = -0.2272;

		const fetchWeather = async (lat, lon) => {
			try {
				const response = await fetch(
					`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,is_day,weather_code&temperature_unit=celsius`,
				);
				const data = await response.json();

				if (data.current) {
					const temp = Math.round(data.current.temperature_2m);
					const code = data.current.weather_code;
					const isDay = data.current.is_day === 1;

					const details = getWeatherDetails(code, isDay);

					const newWeatherData = {
						temperature: temp,
						iconName: details.iconName,
						label: details.label,
					};

					setWeatherData(newWeatherData);

					localStorage.setItem(
						"MNTweatherCache",
						JSON.stringify({
							timestamp: Date.now(),
							data: newWeatherData,
						}),
					);
				}
			} catch (error) {
				console.error("Error fetching weather data:", error);
				setWeatherData((prev) => ({ ...prev, label: "Error loading" }));
			}
		};

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) =>
					fetchWeather(
						position.coords.latitude,
						position.coords.longitude,
					),
				() => fetchWeather(defaultLat, defaultLon),
			);
		} else {
			fetchWeather(defaultLat, defaultLon);
		}
	}, []);

	const activeTheme = themeScheme === "auto" ? systemTheme : themeScheme;
	const iconSrc = getIconUrl(weatherData.iconName, activeTheme);

	return {
		temperature: weatherData.temperature,
		label: weatherData.label,
		iconSrc,
	};
}
