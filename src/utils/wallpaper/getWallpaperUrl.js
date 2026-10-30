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
	setWallpaperData,
} from "@/utils/wallpaper/storageManager";

async function fetchFromCache(cache, wallpaperSource, savedData) {
	if (wallpaperSource === "apod") {
		return cache.match(savedData.url);
	}

	const height = Math.round(window.innerHeight * 1.1);
	const width = Math.round(window.innerWidth * 1.1);
	const targetImageUrl = `https://picsum.photos/seed/${savedData.seed}/${width}/${height}`;

	return cache.match(targetImageUrl);
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

			const fallbackController = new AbortController();
			const randomData = getRandom(fallbackController);
			const fallbackUrl = randomData.targetImageUrl;

			response = await streamDownload(fallbackController, fallbackUrl);

			const fallbackCacheResponse = response.clone();
			const fallbackInfo = await randomData.infoPromise;

			saveWallpaperToCache(
				cache,
				fallbackUrl,
				fallbackCacheResponse,
				"apod",
				{
					title: "Temporary Fallback Wallpaper",
					author: fallbackInfo?.author || "Lorem Picsum",
					url: fallbackInfo?.url || "https://picsum.photos",
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
	let infoPromise = null;

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 30000);
	const cancelHandler = () => controller.abort();

	window.addEventListener("cancel-wallpaper-download", cancelHandler);

	try {
		if (wallpaperSource === "apod") {
			const apodData = await getAPOD(controller, savedData, now, cache);

			if (apodData.cachedBlobUrl) {
				return {
					blobUrl: apodData.cachedBlobUrl,
					isVideo: apodData.isVideo,
				};
			}

			targetImageUrl = apodData.targetImageUrl;
			imageInfo = apodData.imageInfo;
			if (apodData.isVideo !== undefined) {
				imageInfo.isVideo = apodData.isVideo;
			}
		} else {
			const randomData = getRandom(controller);
			targetImageUrl = randomData.targetImageUrl;
			seed = randomData.seed;
			infoPromise = randomData.infoPromise;
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

		if (infoPromise) {
			imageInfo = await infoPromise;
		}

		if (
			wallpaperSource === "random" &&
			(!imageInfo ||
				!imageInfo.author ||
				imageInfo.author === "Lorem Picsum" ||
				imageInfo.author === "Material New Tab")
		) {
			const picsumId = response.headers.get("picsum-id");
			if (picsumId) {
				try {
					const infoRes = await fetch(
						`https://picsum.photos/id/${picsumId}/info`,
						{ signal: controller.signal },
					);
					if (infoRes.ok) {
						const infoData = await infoRes.json();
						if (infoData?.author) {
							imageInfo = {
								author: infoData.author.trim(),
								url:
									infoData.url?.trim() ||
									`https://picsum.photos/id/${picsumId}`,
								title: `Photo by ${infoData.author.trim()}`,
								explanation:
									"A randomly generated high-resolution image from Lorem Picsum.",
							};
						}
					}
				} catch (infoErr) {
					console.warn(
						"Failed to fetch Lorem Picsum info by id:",
						infoErr,
					);
				}
			}
		}

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
		const customResult = await getCustom();
		if (customResult) return customResult;
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

				if (result.blobUrl) {
					return {
						url: result.blobUrl,
						isVideo: Boolean(result.isVideo),
					};
				}
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

			if (
				wallpaperSource === "random" &&
				savedData?.seed &&
				(!savedData.info ||
					savedData.info.author === "Material New Tab")
			) {
				fetch(`https://picsum.photos/seed/${savedData.seed}/info`)
					.then((res) => (res.ok ? res.json() : null))
					.then((infoData) => {
						if (infoData?.author) {
							setWallpaperData({
								...savedData,
								info: {
									...savedData.info,
									author: infoData.author.trim(),
									url:
										infoData.url?.trim() ||
										`https://picsum.photos/id/${infoData.id}`,
									title: `Photo by ${infoData.author.trim()}`,
									explanation:
										"A randomly generated high-resolution image from Lorem Picsum.",
								},
							});
						}
					})
					.catch((err) =>
						console.warn("Failed to backfill Picsum info:", err),
					);
			}
		}

		if (!response) {
			dispatchError("No cache blob found. Skipping wallpaper loading.");
			return null;
		}

		const rawBlob = await response.blob();

		let mimeType = rawBlob.type;
		if (!mimeType || mimeType === "application/octet-stream") {
			const urlSource = (savedData?.url || "")
				.split("?")[0]
				.toLowerCase();
			mimeType = urlSource.endsWith(".mp4")
				? "video/mp4"
				: urlSource.endsWith(".webm")
					? "video/webm"
					: urlSource.endsWith(".png")
						? "image/png"
						: urlSource.endsWith(".webp")
							? "image/webp"
							: "image/jpeg";
		}

		const isVideo = mimeType.startsWith("video/");
		const typedBlob = new Blob([rawBlob], { type: mimeType });
		return {
			url: URL.createObjectURL(typedBlob),
			isVideo,
		};
	} catch (error) {
		dispatchError("Critical error caching wallpaper:", error);
		return null;
	}
}
