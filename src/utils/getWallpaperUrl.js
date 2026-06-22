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

	const seed = needsNewSeed
		? Math.random().toString(36).substring(2, 10)
		: savedData.seed;

	const targetUrl = `https://picsum.photos/seed/${seed}/${width}/${height}`;

	try {
		const cache = await caches.open("MNTwallpaperCache");
		let response = null;

		if (needsNewSeed) {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 5000);

			try {
				response = await fetch(targetUrl, {
					signal: controller.signal,
				});
				clearTimeout(timeoutId);

				if (response.ok) {
					const keys = await cache.keys();
					for (const request of keys) {
						await cache.delete(request);
					}
					await cache.put(targetUrl, response.clone());
					localStorage.setItem(
						"MNTwallpaperData",
						JSON.stringify({ seed, timestamp: now }),
					);
				} else {
					throw new Error(`HTTP Error: ${response.status}`);
				}
			} catch (error) {
				clearTimeout(timeoutId);
				const errMessage =
					error instanceof Error ? error.message : String(error);
				console.warn(
					"Wallpaper fetch failed or timed out. Attempting fallback.",
					errMessage,
				);

				const keys = await cache.keys();
				if (keys.length > 0) {
					response = await cache.match(keys[0]);
				}
			}
		} else {
			response = await cache.match(targetUrl);

			if (!response) {
				const controller = new AbortController();
				const timeoutId = setTimeout(() => controller.abort(), 5000);

				try {
					response = await fetch(targetUrl, {
						signal: controller.signal,
					});
					clearTimeout(timeoutId);

					if (response.ok) {
						await cache.put(targetUrl, response.clone());
					} else {
						throw new Error(`HTTP Error: ${response.status}`);
					}
				} catch (error) {
					clearTimeout(timeoutId);
					const errMessage =
						error instanceof Error ? error.message : String(error);
					console.warn(
						"Quick fetch failed, falling back to cache.",
						errMessage,
					);

					const keys = await cache.keys();
					if (keys.length > 0) {
						response = await cache.match(keys[0]);
					}
				}
			}
		}

		if (!response) {
			console.warn("No cache blob found. Skipping wallpaper loading.");
			return null;
		}

		const blob = await response.blob();
		return URL.createObjectURL(blob);
	} catch (error) {
		const errMessage =
			error instanceof Error ? error.message : String(error);
		console.error(
			"Critical error fetching or caching wallpaper:",
			errMessage,
		);
		return null;
	}
}
