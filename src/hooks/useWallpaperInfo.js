import { useEffect, useState } from "react";

import {
	getWallpaperData,
	getWallpaperSource,
} from "@/utils/wallpaper/storageManager";

export default function useWallpaperInfo() {
	const getInfoFromStorage = () => {
		const savedData = getWallpaperData();
		const wallpaperSource = getWallpaperSource();

		if (savedData?.source === wallpaperSource && savedData?.info) {
			return savedData.info;
		}

		return null;
	};

	const [info, setInfo] = useState(getInfoFromStorage);

	useEffect(() => {
		const handleStorageChange = () => {
			setInfo(getInfoFromStorage());
		};

		window.addEventListener("storage", handleStorageChange);
		const timer = setTimeout(handleStorageChange, 500);

		handleStorageChange();

		return () => {
			window.removeEventListener("storage", handleStorageChange);
			clearTimeout(timer);
		};
	}, []);

	return info;
}
