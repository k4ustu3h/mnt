import { useState } from "react";

import { M3eTheme } from "@m3e/react/theme";

import useTheme from "@/hooks/context/useTheme";
import useWallpaperTheme from "@/hooks/useWallpaperTheme";

import {
	getWallpaperData,
	getWallpaperRefreshRate,
} from "@/utils/wallpaper/storageManager";

import LoadingScreen from "@/components/loading/LoadingScreen";
import Wallpaper from "@/components/layout/Wallpaper";

export default function ThemeWrapper({ children }) {
	const { themeScheme, themeContrast } = useTheme();
	const { bgUrl, themeColor, isLoading } = useWallpaperTheme();

	const [animateZoom] = useState(() => {
		const refreshRate = getWallpaperRefreshRate();
		if (refreshRate === "newTab") return true;

		const savedData = getWallpaperData();
		return Boolean(
			savedData?.timestamp && Date.now() - savedData.timestamp < 2000,
		);
	});

	const finalThemeColor = themeColor || "#2962ff";

	return (
		<M3eTheme
			color={finalThemeColor}
			contrast={themeContrast}
			motion="expressive"
			scheme={themeScheme}
		>
			{isLoading ? (
				<LoadingScreen bgUrl={bgUrl} />
			) : (
				<Wallpaper animateZoom={animateZoom} bgUrl={bgUrl}>
					{children}
				</Wallpaper>
			)}
		</M3eTheme>
	);
}
