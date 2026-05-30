export const getWeatherDetails = (code, isDay) => {
	let iconName = "mostly_sunny";
	let label = "Weather";

	switch (code) {
		case 0: // Clear sky
			iconName = isDay ? "sunny" : "clear_night";
			label = isDay ? "Sunny" : "Clear Night";
			break;
		case 1: // Mainly clear
			iconName = isDay ? "mostly_sunny" : "mostly_clear_night";
			label = isDay ? "Mostly Sunny" : "Mostly Clear Night";
			break;
		case 2: // Partly cloudy
			iconName = isDay ? "partly_cloudy" : "partly_cloudy_night";
			label = isDay ? "Partly Cloudy" : "Partly Cloudy Night";
			break;
		case 3: // Overcast / Cloudy
			iconName = "cloudy";
			label = "Cloudy";
			break;
		case 45:
		case 48: // Fog
			iconName = "windy";
			label = "Windy / Haze";
			break;
		case 51:
		case 53:
		case 55: // Drizzle
		case 61:
		case 63: // Rain
			iconName = "drizzle";
			label = "Rain";
			break;
		case 65:
		case 80:
		case 81:
		case 82: // Heavy Rain / Showers
			iconName = "heavy_rain";
			label = "Heavy Rain";
			break;
		case 71:
		case 73:
		case 75:
		case 85:
		case 86: // Snow
			iconName = "heavy_snow";
			label = "Snow";
			break;
		case 77: // Snow grains
			iconName = "flurries";
			label = "Snow Flurries";
			break;
		case 95: // Thunderstorm
			iconName = "thunderstorms";
			label = "Thunderstorms";
			break;
		case 96:
		case 99: // Thunderstorm with hail
			iconName = "strong_thunderstorms";
			label = "Strong Thunderstorms";
			break;
	}

	return { iconName, label };
};

export const getIconUrl = (iconName, theme) => {
	return new URL(
		`../assets/icons/weather/${theme}/${iconName}.svg`,
		import.meta.url,
	).href;
};
