import { useEffect, useState } from "react";

import {
	getWallpaperData,
	getWallpaperSource,
	setWallpaperData,
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
		window.addEventListener("wallpaper-data-updated", handleStorageChange);
		const timer = setTimeout(handleStorageChange, 500);

		handleStorageChange();

		const savedData = getWallpaperData();
		const wallpaperSource = getWallpaperSource();
		if (
			savedData?.source === "random" &&
			wallpaperSource === "random" &&
			savedData.seed &&
			savedData.info?.author === "Material New Tab"
		) {
			fetch(`https://picsum.photos/seed/${savedData.seed}/info`)
				.then((res) => (res.ok ? res.json() : null))
				.then((data) => {
					if (data?.author) {
						const updatedInfo = {
							...savedData.info,
							author: data.author.trim(),
							url:
								data.url?.trim() ||
								`https://picsum.photos/id/${data.id}`,
							title: `Photo by ${data.author.trim()}`,
							explanation:
								"A randomly generated high-resolution image from Lorem Picsum.",
						};
						setWallpaperData({
							...savedData,
							info: updatedInfo,
						});
					}
				})
				.catch(() => {});
		}

		return () => {
			window.removeEventListener("storage", handleStorageChange);
			window.removeEventListener(
				"wallpaper-data-updated",
				handleStorageChange,
			);
			clearTimeout(timer);
		};
	}, []);

	return info;
}
