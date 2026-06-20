export default async function getWallpaperUrl() {
	const height = Math.round(window.innerHeight * 1.1);
	const width = Math.round(window.innerWidth * 1.1);

	const refreshRate =
		JSON.parse(localStorage.getItem("wallpaperRefreshRate")) ?? "newTab";
	const savedData = JSON.parse(localStorage.getItem("MNTwallpaperData"));

	const now = Date.now();
	let needsNewSeed = false;

	if (!savedData) {
		needsNewSeed = true;
	} else if (refreshRate === "newTab") {
		needsNewSeed = true;
	} else if (
		refreshRate === "hourly" &&
		now - savedData.timestamp > 3600000
	) {
		needsNewSeed = true;
	} else if (
		refreshRate === "daily" &&
		now - savedData.timestamp > 86400000
	) {
		needsNewSeed = true;
	}

	let seed;
	if (needsNewSeed) {
		seed = Math.random().toString(36).substring(2, 10);
		localStorage.setItem(
			"MNTwallpaperData",
			JSON.stringify({ seed, timestamp: now }),
		);
	} else {
		seed = savedData.seed;
	}

	const targetUrl = `https://picsum.photos/seed/${seed}/${width}/${height}`;

	try {
		const cache = await caches.open("m3ent-wallpaper-cache");

		if (needsNewSeed) {
			const keys = await cache.keys();
			for (const request of keys) {
				await cache.delete(request);
			}
		}

		let response = await cache.match(targetUrl);

		if (!response) {
			response = await fetch(targetUrl);

			await cache.put(targetUrl, response.clone());
		}

		const blob = await response.blob();
		return URL.createObjectURL(blob);
	} catch (error) {
		console.error("Error fetching or caching wallpaper:", error);

		return targetUrl;
	}
}
