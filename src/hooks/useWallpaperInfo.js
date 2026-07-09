import { useEffect, useState } from "react";

import dispatchError from "@/utils/dispatchError";

export default function useWallpaperInfo() {
	const [info, setInfo] = useState(() => {
		const wallpaperSource =
			JSON.parse(localStorage.getItem("wallpaperSource")) ?? "random";
		const savedData = JSON.parse(localStorage.getItem("MNTwallpaperData"));

		if (wallpaperSource === "custom") return null;

		if (wallpaperSource === "apod" && savedData?.source === "apod") {
			return savedData.info;
		}

		return null;
	});

	useEffect(() => {
		const wallpaperSource =
			JSON.parse(localStorage.getItem("wallpaperSource")) ?? "random";
		const savedData = JSON.parse(localStorage.getItem("MNTwallpaperData"));

		if (wallpaperSource === "custom" || wallpaperSource === "apod") {
			return;
		}

		if (savedData && savedData.seed) {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 5000);

			fetch(`https://picsum.photos/seed/${savedData.seed}/info`, {
				signal: controller.signal,
			})
				.then(async (res) => {
					clearTimeout(timeoutId);
					if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
					return res.json();
				})
				.then((data) => setInfo(data))
				.catch((err) => {
					clearTimeout(timeoutId);
					dispatchError("Failed to fetch wallpaper info:", err);
				});
		}
	}, []);

	return info;
}
