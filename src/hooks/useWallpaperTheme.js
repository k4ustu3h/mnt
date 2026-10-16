import { useEffect, useRef, useState } from "react";

import dispatchError from "@/utils/dispatchError";

import getWallpaperUrl from "@/utils/wallpaper/getWallpaperUrl";

import monet from "@/utils/monet";

import useWallpaper from "@/hooks/context/useWallpaper";

export default function useWallpaperTheme() {
	const [bgUrl, setBgUrl] = useState(null);
	const [isVideo, setIsVideo] = useState(false);
	const [themeColor, setThemeColor] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	const { wallpaperSource, wallpaperRefreshRate } = useWallpaper();
	const activeBlobUrlRef = useRef(null);

	useEffect(() => {
		let isMounted = true;

		const initializeTheme = async () => {
			if (isMounted) setIsLoading(true);

			try {
				const result = await getWallpaperUrl(
					wallpaperSource,
					wallpaperRefreshRate,
				);
				if (!isMounted) {
					if (result?.url?.startsWith("blob:")) {
						URL.revokeObjectURL(result.url);
					}
					return;
				}

				const nextUrl =
					typeof result === "string" ? result : result?.url ?? null;
				const nextIsVideo = Boolean(result?.isVideo);

				if (
					activeBlobUrlRef.current &&
					activeBlobUrlRef.current.startsWith("blob:") &&
					activeBlobUrlRef.current !== nextUrl
				) {
					URL.revokeObjectURL(activeBlobUrlRef.current);
				}

				activeBlobUrlRef.current = nextUrl;
				setBgUrl(nextUrl);
				setIsVideo(nextIsVideo);

				if (nextUrl) {
					try {
						const colorHex = await monet(nextUrl, nextIsVideo);
						if (!isMounted) return;
						setThemeColor(colorHex);
					} catch (monetErr) {
						console.warn(
							"Monet failed to extract color from media, using fallback:",
							monetErr,
						);
						if (!isMounted) return;
						setThemeColor("#6750A4");
					}
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
			if (e.key === "MNTwallpaperData") {
				initializeTheme();
			}
		};

		window.addEventListener("storage", handleStorageChange);

		return () => {
			isMounted = false;
			window.removeEventListener("storage", handleStorageChange);
		};
	}, [wallpaperSource, wallpaperRefreshRate]);

	return { bgUrl, isVideo, themeColor, isLoading };
}
