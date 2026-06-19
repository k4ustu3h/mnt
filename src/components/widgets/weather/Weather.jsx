import { useEffect, useState } from "react";

import { M3eHeading } from "@m3e/react/heading";
import { M3eShape } from "@m3e/react/shape";

import useBreakpoint from "@/hooks/useBreakpoint";
import useSettings from "@/hooks/useSettings";

import { getWeatherDetails, getIconUrl } from "@/utils/weather";

import { weatherDimensions } from "@/styles/dimensions";

export default function Weather() {
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

	const breakpoint = useBreakpoint();
	const {
		containerSize,
		fontSize,
		iconSize,
		padding,
		paddingLeft,
		paddingTop,
	} = weatherDimensions[breakpoint];

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handleChange = (e) =>
			setSystemTheme(e.matches ? "dark" : "light");

		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, []);

	useEffect(() => {
		const cachedWeatherStr = localStorage.getItem("weatherCache");
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

	return (
		<div>
			<div
				style={{
					flexShrink: 0,
					height: containerSize,
					position: "relative",
					width: containerSize,
				}}
			>
				<M3eShape
					name="pill"
					style={{
						"--m3e-shape-container-color":
							"var(--md-sys-color-surface)",
						height: "100%",
						position: "absolute",
						width: "100%",
					}}
				/>

				<div
					style={{
						display: "flex",
						flexDirection: "column",
						inset: 0,
						justifyContent: "center",
						padding: padding,
						position: "absolute",
					}}
				>
					<M3eHeading
						size="large"
						style={{
							color: "var(--md-sys-color-primary)",
							fontSize: fontSize,
							fontVariationSettings: '"ROND" 100',
							fontWeight: 500,
							letterSpacing: "-0.02em",
							paddingLeft: paddingLeft,
							paddingTop: paddingTop,
							textAlign: "center",
						}}
						variant="display"
					>
						{weatherData.temperature}°
					</M3eHeading>

					<div
						style={{
							height: iconSize,
							width: iconSize,
						}}
					>
						<img
							alt={weatherData.label}
							src={iconSrc}
							style={{
								width: "100%",
								height: "100%",
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
