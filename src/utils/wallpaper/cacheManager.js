import { setWallpaperData } from "@/utils/wallpaper/storageManager";

export async function saveWallpaperToCache(
	cache,
	targetImageUrl,
	response,
	wallpaperSource,
	imageInfo,
	seed,
	now,
) {
	const keys = await cache.keys();
	for (const request of keys) {
		if (request.url.includes("custom-wallpaper")) continue;
		await cache.delete(request);
	}

	await cache.put(targetImageUrl, response.clone());

	const standardizedInfo = imageInfo || {
		title:
			wallpaperSource === "custom" ? "Custom Upload" : "Random Wallpaper",
		author: "Material New Tab",
		explanation:
			wallpaperSource === "custom"
				? "Your locally uploaded custom wallpaper."
				: "A randomly generated high-resolution image.",
	};

	const newSaveData = {
		source: wallpaperSource,
		timestamp: now,
		info: standardizedInfo,
	};

	if (wallpaperSource === "apod") {
		newSaveData.url = targetImageUrl;
	} else if (wallpaperSource === "random") {
		newSaveData.seed = seed;
	}

	setWallpaperData(newSaveData);
}

export async function getFallbackWallpaper(cache) {
	const keys = await cache.keys();
	const validKeys = keys.filter((k) => !k.url.includes("custom-wallpaper"));

	if (validKeys.length > 0) {
		return await cache.match(validKeys[0]);
	}
	return null;
}
