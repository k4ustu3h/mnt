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

import {
	clearWallpaperData,
	getWallpaperData,
	getWallpaperRefreshRate,
	getWallpaperSource,
} from "@/utils/wallpaper/storageManager";

async function fetchFromCache(cache, wallpaperSource, savedData) {
	if (wallpaperSource === "apod") {
		return await cache.match(savedData.url);
	}

	const height = Math.round(window.innerHeight * 1.1);
	const width = Math.round(window.innerWidth * 1.1);
	const targetImageUrl = `https://picsum.photos/seed/${savedData.seed}/${width}/${height}`;

	return await cache.match(targetImageUrl);
}

async function handleFailedFetch(cache, wallpaperSource, now, originalError) {
	dispatchError(
		`${wallpaperSource} fetch failed. Attempting fallback.`,
		originalError,
	);

	let response = await getFallbackWallpaper(cache);

	if (!response && wallpaperSource === "apod") {
		try {
			dispatchError(
				"No fallback cache found. Fetching temporary Lorem Picsum wallpaper for today.",
			);

			const randomData = getRandom();
			const fallbackUrl = randomData.targetImageUrl;
			const fallbackController = new AbortController();

			response = await streamDownload(fallbackController, fallbackUrl);

			const fallbackCacheResponse = response.clone();
			saveWallpaperToCache(
				cache,
				fallbackUrl,
				fallbackCacheResponse,
				"apod",
				{
					title: "Temporary Fallback Wallpaper",
					explanation:
						"The NASA APOD download was cancelled or failed, and no previous wallpaper was found. This random image is being used for today.",
				},
				randomData.seed,
				now,
			).catch((err) =>
				console.error("Background fallback caching failed:", err),
			);
		} catch (fallbackError) {
			dispatchError(
				"Temporary Picsum fallback also failed:",
				fallbackError,
			);
			return null;
		}
	}

	return response;
}

async function fetchPrimaryWallpaper(cache, wallpaperSource, savedData, now) {
	let targetImageUrl;
	let imageInfo = null;
	let seed = null;

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 30000);
	const cancelHandler = () => controller.abort();

	window.addEventListener("cancel-wallpaper-download", cancelHandler);

	try {
		if (wallpaperSource === "apod") {
			const apodData = await getAPOD(controller, savedData, now, cache);

			if (apodData.cachedBlobUrl) {
				return { blobUrl: apodData.cachedBlobUrl };
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

		const response = await streamDownload(controller, fetchUrl, timeoutId);
		const cacheResponse = response.clone();

		saveWallpaperToCache(
			cache,
			targetImageUrl,
			cacheResponse,
			wallpaperSource,
			imageInfo,
			seed,
			now,
		).catch((err) => console.error("Background caching failed:", err));

		return { response };
	} finally {
		window.removeEventListener("cancel-wallpaper-download", cancelHandler);
		clearTimeout(timeoutId);
	}
}

export default async function getWallpaperUrl(activeSource, activeRefreshRate) {
	let wallpaperSource = activeSource ?? getWallpaperSource();

	if (wallpaperSource === "custom") {
		const customUrl = await getCustom();
		if (customUrl) return customUrl;
		wallpaperSource = "random";
	}

	const now = Date.now();
	const savedData = getWallpaperData();
	const refreshRate = activeRefreshRate ?? getWallpaperRefreshRate();

	const needsNewFetch = evaluateRefreshLogic(
		wallpaperSource,
		savedData,
		refreshRate,
		now,
	);

	try {
		const cache = await caches.open("MNTwallpaperCache");
		let response;

		if (needsNewFetch) {
			try {
				const result = await fetchPrimaryWallpaper(
					cache,
					wallpaperSource,
					savedData,
					now,
				);

				if (result.blobUrl) return result.blobUrl;
				response = result.response;
			} catch (error) {
				response = await handleFailedFetch(
					cache,
					wallpaperSource,
					now,
					error,
				);
			}
		} else {
			response = await fetchFromCache(cache, wallpaperSource, savedData);

			if (!response) {
				clearWallpaperData();
				return getWallpaperUrl(activeSource, activeRefreshRate);
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
