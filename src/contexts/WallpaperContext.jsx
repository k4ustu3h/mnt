import { WallpaperContextObj } from "@/hooks/context/useWallpaper";

import useLocalStorage from "@/hooks/useLocalStorage";

export default function WallpaperContext({ children }) {
	const [apodIncludeVideo, setApodIncludeVideo] = useLocalStorage(
		"apodIncludeVideo",
		false,
	);
	const [wallpaperRefreshRate, setWallpaperRefreshRate] = useLocalStorage(
		"wallpaperRefreshRate",
		"newTab",
	);
	const [wallpaperSource, setWallpaperSource] = useLocalStorage(
		"wallpaperSource",
		"random",
	);

	const value = {
		apodIncludeVideo,
		setApodIncludeVideo,
		setWallpaperRefreshRate,
		setWallpaperSource,
		wallpaperRefreshRate,
		wallpaperSource,
	};

	return (
		<WallpaperContextObj.Provider value={value}>
			{children}
		</WallpaperContextObj.Provider>
	);
}
