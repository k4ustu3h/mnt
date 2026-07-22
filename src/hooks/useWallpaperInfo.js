import { useEffect, useState } from "react";

import dispatchError from "@/utils/dispatchError";

export default function useWallpaperInfo() {
	const getInfoFromStorage = () => {
		const savedData = JSON.parse(localStorage.getItem("MNTwallpaperData"));
		const wallpaperSource =
			JSON.parse(localStorage.getItem("wallpaperSource")) ?? "random";

		if (wallpaperSource === "custom") return null;

		if (savedData?.source === wallpaperSource && savedData?.info) {
			return savedData.info;
		}

		return null;
	};

	const [info, setInfo] = useState(getInfoFromStorage);

	useEffect(() => {
		let abortController = null;

		const handleStorageChange = () => {
			const storedInfo = getInfoFromStorage();

			if (storedInfo) {
				setInfo(storedInfo);
				return;
			}

			const wallpaperSource =
				JSON.parse(localStorage.getItem("wallpaperSource")) ?? "random";
			const savedData = JSON.parse(
				localStorage.getItem("MNTwallpaperData"),
			);

			if (wallpaperSource === "random" && savedData?.seed) {
				if (abortController) abortController.abort();
				abortController = new AbortController();

				const timeoutId = setTimeout(
					() => abortController.abort(),
					5000,
				);

				fetch(`https://picsum.photos/seed/${savedData.seed}/info`, {
					signal: abortController.signal,
				})
					.then(async (res) => {
						clearTimeout(timeoutId);
						if (!res.ok)
							throw new Error(`HTTP Error: ${res.status}`);
						return res.json();
					})
					.then((data) => setInfo(data))
					.catch((err) => {
						clearTimeout(timeoutId);
						if (err.name !== "AbortError") {
							dispatchError(
								"Failed to fetch wallpaper info:",
								err,
							);
						}
					});
			} else {
				setInfo(null);
			}
		};

		window.addEventListener("storage", handleStorageChange);

		const timer = setTimeout(handleStorageChange, 500);

		handleStorageChange();

		return () => {
			window.removeEventListener("storage", handleStorageChange);
			clearTimeout(timer);
			if (abortController) abortController.abort();
		};
	}, []);

	return info;
}
