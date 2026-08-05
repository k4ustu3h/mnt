import dispatchError from "@/utils/dispatchError";

import getAPOD from "@/utils/wallpaper/getAPOD";
import getCustom from "@/utils/wallpaper/getCustom";
import getRandom from "@/utils/wallpaper/getRandom";

export default async function getWallpaperUrl() {
	let wallpaperSource =
		JSON.parse(localStorage.getItem("wallpaperSource")) ?? "random";

	if (wallpaperSource === "custom") {
		const customUrl = await getCustom();
		if (customUrl) return customUrl;

		wallpaperSource = "random";
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
			const timeoutId = setTimeout(() => controller.abort(), 30000);

			try {
				if (wallpaperSource === "apod") {
					const apodData = await getAPOD(
						controller,
						savedData,
						now,
						cache,
					);

					if (apodData.cachedBlobUrl) {
						clearTimeout(timeoutId);
						return apodData.cachedBlobUrl;
					}

					targetImageUrl = apodData.targetImageUrl;
					imageInfo = apodData.imageInfo;
				} else {
					const randomData = getRandom();
					targetImageUrl = randomData.targetImageUrl;
					seed = randomData.seed;
				}

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

				const rawResponse = await fetch(fetchUrl, {
					signal: controller.signal,
				});
				clearTimeout(timeoutId);

				if (rawResponse.ok) {
					const contentLength =
						rawResponse.headers.get("content-length");
					const total = contentLength
						? parseInt(contentLength, 10)
						: 0;
					let loaded = 0;

					const reader = rawResponse.body.getReader();
					const chunks = [];

					while (true) {
						const { done, value } = await reader.read();
						if (done) break;

						chunks.push(value);
						loaded += value.length;

						window.dispatchEvent(
							new CustomEvent("wallpaper-download-progress", {
								detail: { loaded, total },
							}),
						);
					}
					const blob = new Blob(chunks, {
						type: rawResponse.headers.get("content-type"),
					});
					response = new Response(blob, {
						headers: rawResponse.headers,
						status: rawResponse.status,
						statusText: rawResponse.statusText,
					});
				} else {
					throw new Error(
						`HTTP Error fetching image blob: ${rawResponse.status}`,
					);
				}

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
