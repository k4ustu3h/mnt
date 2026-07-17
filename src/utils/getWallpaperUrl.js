import dispatchError from "@/utils/dispatchError";

export default async function getWallpaperUrl() {
	const wallpaperSource =
		JSON.parse(localStorage.getItem("wallpaperSource")) ?? "random";

	if (wallpaperSource === "custom") {
		try {
			const cache = await caches.open("MNTwallpaperCache");
			const response = await cache.match("custom-wallpaper");
			if (response) {
				const blob = await response.blob();
				return URL.createObjectURL(blob);
			}
		} catch (error) {
			dispatchError(
				"Failed to load custom wallpaper, falling back to random.",
				error,
			);
		}
	}

	const now = Date.now();
	const savedData =
		JSON.parse(localStorage.getItem("MNTwallpaperData")) || {};
	const refreshRate =
		JSON.parse(localStorage.getItem("wallpaperRefreshRate")) ?? "newTab";
	const previousSource = savedData.source || "random";

	let needsNewFetch = false;

	if (!savedData.timestamp || wallpaperSource !== previousSource) {
		needsNewFetch = true;
	} else if (wallpaperSource === "random") {
		if (refreshRate === "newTab") needsNewFetch = true;
		else if (
			refreshRate === "hourly" &&
			now - savedData.timestamp > 3600000
		)
			needsNewFetch = true;
		else if (
			refreshRate === "daily" &&
			now - savedData.timestamp > 86400000
		)
			needsNewFetch = true;
	} else if (wallpaperSource === "apod") {
		if (now - savedData.timestamp > 43200000) needsNewFetch = true;
	}

	try {
		const cache = await caches.open("MNTwallpaperCache");
		let response = null;

		if (needsNewFetch) {
			let targetImageUrl = "";
			let imageInfo = null;
			let seed = null;

			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 8000);

			try {
				if (wallpaperSource === "apod") {
					const apiKey = import.meta.env.VITE_APOD_API_KEY;
					const res = await fetch(
						`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`,
						{ signal: controller.signal },
					);

					if (!res.ok)
						throw new Error(`NASA API Error: ${res.status}`);
					const data = await res.json();
					if (data.media_type !== "image")
						throw new Error("NASA APOD is not an image today.");

					targetImageUrl = data.hdurl || data.url;
					imageInfo = {
						author: data.copyright,
						url: "https://apod.nasa.gov/apod/astropix.html",
					};
				} else {
					const height = Math.round(window.innerHeight * 1.1);
					const width = Math.round(window.innerWidth * 1.1);
					seed = Math.random().toString(36).substring(2, 10);
					targetImageUrl = `https://picsum.photos/seed/${seed}/${width}/${height}`;
				}

				// Route through Vite proxy if running locally to avoid CORS
				let fetchUrl = targetImageUrl;
				const isLocalhost =
					window.location.hostname === "localhost" ||
					window.location.hostname === "127.0.0.1";

				if (isLocalhost && targetImageUrl.includes("apod.nasa.gov")) {
					fetchUrl = targetImageUrl.replace(
						"https://apod.nasa.gov",
						"/apod-proxy",
					);
				}

				response = await fetch(fetchUrl, {
					signal: controller.signal,
				});
				clearTimeout(timeoutId);

				if (response.ok) {
					const keys = await cache.keys();
					for (const request of keys) {
						if (request.url.includes("custom-wallpaper")) continue;
						await cache.delete(request);
					}

					await cache.put(targetImageUrl, response.clone());

					const newSaveData = {
						source: wallpaperSource,
						timestamp: now,
					};
					if (wallpaperSource === "apod") {
						newSaveData.url = targetImageUrl;
						newSaveData.info = imageInfo;
					} else {
						newSaveData.seed = seed;
					}
					localStorage.setItem(
						"MNTwallpaperData",
						JSON.stringify(newSaveData),
					);
				} else {
					throw new Error(
						`HTTP Error fetching image blob: ${response.status}`,
					);
				}
			} catch (error) {
				clearTimeout(timeoutId);
				dispatchError(
					`${wallpaperSource} fetch failed. Attempting fallback.`,
					error,
				);

				const keys = await cache.keys();
				const validKeys = keys.filter(
					(k) => !k.url.includes("custom-wallpaper"),
				);
				if (validKeys.length > 0) {
					response = await cache.match(validKeys[0]);
				}
			}
		} else {
			if (wallpaperSource === "apod") {
				response = await cache.match(savedData.url);
			} else {
				const height = Math.round(window.innerHeight * 1.1);
				const width = Math.round(window.innerWidth * 1.1);
				const targetImageUrl = `https://picsum.photos/seed/${savedData.seed}/${width}/${height}`;
				response = await cache.match(targetImageUrl);
			}

			if (!response) {
				localStorage.removeItem("MNTwallpaperData");
				return getWallpaperUrl();
			}
		}

		if (!response) {
			dispatchError("No cache blob found. Skipping wallpaper loading.");
			return null;
		}

		const blob = await response.blob();
		return URL.createObjectURL(blob);
	} catch (error) {
		dispatchError("Critical error caching wallpaper:", error);
		return null;
	}
}
