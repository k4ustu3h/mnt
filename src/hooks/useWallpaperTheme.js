import { useEffect, useState } from "react";

import dispatchError from "@/utils/dispatchError";

import getWallpaperUrl from "@/utils/wallpaper/getWallpaperUrl";

import monet from "@/utils/monet";

export default function useWallpaperTheme() {
	const [bgUrl, setBgUrl] = useState(null);
	const [themeColor, setThemeColor] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;
		let currentBlobUrl = null;

		const initializeTheme = async () => {
			if (isMounted) setIsLoading(true);

			try {
				const url = await getWallpaperUrl();
				if (!isMounted) return;

				if (currentBlobUrl && currentBlobUrl.startsWith("blob:")) {
					URL.revokeObjectURL(currentBlobUrl);
				}

				currentBlobUrl = url;
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

		const handleStorageChange = (e) => {
			if (
				e.key === "wallpaperSource" ||
				e.key === "wallpaperRefreshRate" ||
				e.key === "MNTwallpaperData"
			) {
				initializeTheme();
			}
		};
		window.addEventListener("storage", handleStorageChange);

		return () => {
			isMounted = false;
			window.removeEventListener("storage", handleStorageChange);

			if (currentBlobUrl && currentBlobUrl.startsWith("blob:")) {
				URL.revokeObjectURL(currentBlobUrl);
			}
		};
	}, []);

	return { bgUrl, themeColor, isLoading };
}
