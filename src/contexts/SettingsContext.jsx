import { useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

import { SettingsContextObj } from "@/hooks/useSettings";

export default function SettingsContext({ children }) {
	const [isAppsOpen, setIsAppsOpen] = useState(false);

	const [showGoogleApps, setShowGoogleApps] = useLocalStorage(
		"showGoogleApps",
		true,
	);
	const [showGreeting, setShowGreeting] = useLocalStorage(
		"showGreeting",
		true,
	);
	const [showScallop, setShowScallop] = useLocalStorage("showScallop", true);
	const [showWeather, setShowWeather] = useLocalStorage("showWeather", true);
	const [themeScheme, setThemeScheme] = useLocalStorage(
		"themeScheme",
		"auto",
	);
	const [wallpaperRefreshRate, setWallpaperRefreshRate] = useLocalStorage(
		"wallpaperRefreshRate",
		"newTab",
	);

	const value = {
		isAppsOpen,
		setIsAppsOpen,
		showGoogleApps,
		setShowGoogleApps,
		showGreeting,
		setShowGreeting,
		showScallop,
		setShowScallop,
		showWeather,
		setShowWeather,
		themeScheme,
		setThemeScheme,
		wallpaperRefreshRate,
		setWallpaperRefreshRate,
	};

	return (
		<SettingsContextObj.Provider value={value}>
			{children}
		</SettingsContextObj.Provider>
	);
}
