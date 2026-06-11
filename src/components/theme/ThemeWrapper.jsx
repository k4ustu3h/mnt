import { useEffect, useState } from "react";

import { M3eTheme } from "@m3e/react/theme";

import useSettings from "@/hooks/useSettings";

import { extractThemeColor } from "@/utils/monet";
import getWallpaperUrl from "@/utils/wallpaper";

import Wallpaper from "@/components/layout/Wallpaper";
import LoadingScreen from "@/components/loading/LoadingScreen";

export default function ThemeWrapper({ children }) {
	const { themeScheme } = useSettings();

	const [bgUrl] = useState(() => getWallpaperUrl());

	const [animateZoom] = useState(() => {
		const refreshRate =
			JSON.parse(localStorage.getItem("wallpaperRefreshRate")) ??
			"newTab";

		if (refreshRate === "newTab") return true;

		const savedData = JSON.parse(localStorage.getItem("wallpaperData"));
		if (savedData && Date.now() - savedData.timestamp < 2000) {
			return true;
		}

		return false;
	});

	const [themeColor, setThemeColor] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;

		extractThemeColor(bgUrl)
			.then((colorHex) => {
				if (isMounted) {
					setThemeColor(colorHex);
					setIsLoading(false);
				}
			})
			.catch((err) => {
				console.error("Failed to extract theme color:", err);
				if (isMounted) {
					setIsLoading(false);
				}
			});

		return () => {
			isMounted = false;
		};
	}, [bgUrl]);

	if (isLoading) return <LoadingScreen bgUrl={bgUrl} />;

	return (
		<M3eTheme color={themeColor} motion="expressive" scheme={themeScheme}>
			<Wallpaper animateZoom={animateZoom} bgUrl={bgUrl}>
				{children}
			</Wallpaper>
		</M3eTheme>
	);
}
