import { useEffect, useState } from "react";

import { M3eTheme } from "@m3e/react/theme";

import useSettings from "@/hooks/useSettings";

import dispatchError from "@/utils/dispatchError";
import getWallpaperUrl from "@/utils/getWallpaperUrl";
import monet from "@/utils/monet";

import LoadingScreen from "@/components/loading/LoadingScreen";
import Wallpaper from "@/components/layout/Wallpaper";

export default function ThemeWrapper({ children }) {
	const { themeScheme } = useSettings();

	const [bgUrl, setBgUrl] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [themeColor, setThemeColor] = useState("");

	const [animateZoom] = useState(() => {
		const refreshRate =
			JSON.parse(localStorage.getItem("wallpaperRefreshRate")) ??
			"newTab";

		if (refreshRate === "newTab") return true;

		const savedData = JSON.parse(localStorage.getItem("MNTwallpaperData"));
		if (savedData && Date.now() - savedData.timestamp < 2000) {
			return true;
		}

		return false;
	});

	useEffect(() => {
		let isMounted = true;

		const initializeTheme = async () => {
			try {
				const url = await getWallpaperUrl();
				if (!isMounted) return;
				setBgUrl(url);

				if (url) {
					const colorHex = await monet(url);
					if (!isMounted) return;
					setThemeColor(colorHex);
				}
			} catch (err) {
				dispatchError("Theme initialization failed:", err);
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		};

		initializeTheme();

		return () => {
			isMounted = false;
		};
	}, []);

	const finalThemeColor = themeColor || "#2962ff";

	return (
		<M3eTheme
			color={finalThemeColor}
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
