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

	localStorage.setItem("MNTwallpaperData", JSON.stringify(newSaveData));
}

export async function getFallbackWallpaper(cache) {
	const keys = await cache.keys();
	const validKeys = keys.filter((k) => !k.url.includes("custom-wallpaper"));

	if (validKeys.length > 0) {
		return await cache.match(validKeys[0]);
	}
	return null;
}
