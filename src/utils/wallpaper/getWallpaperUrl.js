import dispatchError from "@/utils/dispatchError";

import {
	saveWallpaperToCache,
	getFallbackWallpaper,
} from "@/utils/wallpaper/cacheManager";
import evaluateRefreshLogic from "@/utils/wallpaper/evaluateRefreshLogic";
import streamDownload from "@/utils/wallpaper/streamDownload";

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

	const needsNewFetch = evaluateRefreshLogic(
		wallpaperSource,
		savedData,
		refreshRate,
		now,
	);

	try {
		const cache = await caches.open("MNTwallpaperCache");
		let response = null;

		if (needsNewFetch) {
			let targetImageUrl = "";
			let imageInfo = null;
			let seed = null;

			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 30000);

			const cancelHandler = () => controller.abort();
			window.addEventListener("cancel-wallpaper-download", cancelHandler);

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
						window.removeEventListener(
							"cancel-wallpaper-download",
							cancelHandler,
						);
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

				response = await streamDownload(fetchUrl, controller);

				clearTimeout(timeoutId);
				await saveWallpaperToCache(
					cache,
					targetImageUrl,
					response,
					wallpaperSource,
					imageInfo,
					seed,
					now,
				);
				window.removeEventListener(
					"cancel-wallpaper-download",
					cancelHandler,
				);
			} catch (error) {
				window.removeEventListener(
					"cancel-wallpaper-download",
					cancelHandler,
				);
				clearTimeout(timeoutId);

				dispatchError(
					`${wallpaperSource} fetch failed. Attempting fallback.`,
					error,
				);

				response = await getFallbackWallpaper(cache);

				if (!response && wallpaperSource === "apod") {
					try {
						dispatchError(
							"No fallback cache found. Fetching temporary Lorem Picsum wallpaper for today.",
						);

						const randomData = getRandom();
						const fallbackUrl = randomData.targetImageUrl;
						const fallbackController = new AbortController();

						response = await streamDownload(
							fallbackUrl,
							fallbackController,
						);

						await saveWallpaperToCache(
							cache,
							fallbackUrl,
							response,
							"apod",
							{
								title: "Temporary Fallback Wallpaper",
								explanation:
									"The NASA APOD download was cancelled or failed, and no previous wallpaper was found. This random image is being used for today.",
							},
							randomData.seed,
							now,
						);
					} catch (fallbackError) {
						dispatchError(
							"Temporary Picsum fallback also failed:",
							fallbackError,
						);
						response = null;
					}
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
