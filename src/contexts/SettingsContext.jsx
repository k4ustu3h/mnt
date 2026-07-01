import { useMemo, useState } from "react";

import useLocalStorage from "@/hooks/useLocalStorage";

import { SettingsContextObj } from "@/hooks/useSettings";

export default function SettingsContext({ children }) {
	const [iconShape, setIconShape] = useLocalStorage(
		"newTabIconShape",
		"square",
	);

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

	const [themeContrast, setThemeContrast] = useLocalStorage(
		"themeContrast",
		"standard",
	);

	const [wallpaperSource, setWallpaperSource] = useLocalStorage(
		"wallpaperSource",
		"random",
	);

	const [wallpaperRefreshRate, setWallpaperRefreshRate] = useLocalStorage(
		"wallpaperRefreshRate",
		"newTab",
	);

	const value = useMemo(
		() => ({
			iconShape,
			isAppsOpen,
			setIconShape,
			setIsAppsOpen,
			setShowGoogleApps,
			setShowGreeting,
			setShowScallop,
			setShowWeather,
			setThemeContrast,
			setThemeScheme,
			setWallpaperRefreshRate,
			setWallpaperSource,
			showGoogleApps,
			showGreeting,
			showScallop,
			showWeather,
			themeContrast,
			themeScheme,
			wallpaperRefreshRate,
			wallpaperSource,
		}),
		[
			iconShape,
			isAppsOpen,
			setIconShape,
			setIsAppsOpen,
			setShowGoogleApps,
			setShowGreeting,
			setShowScallop,
			setShowWeather,
			setThemeContrast,
			setThemeScheme,
			setWallpaperRefreshRate,
			setWallpaperSource,
			showGoogleApps,
			showGreeting,
			showScallop,
			showWeather,
			themeContrast,
			themeScheme,
			wallpaperRefreshRate,
			wallpaperSource,
		],
	);

	return (
		<SettingsContextObj.Provider value={value}>
			{children}
		</SettingsContextObj.Provider>
	);
}
