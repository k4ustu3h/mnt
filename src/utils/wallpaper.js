export default function getWallpaperUrl() {
	const height = window.innerHeight;
	const width = window.innerWidth;

	const refreshRate =
		JSON.parse(localStorage.getItem("wallpaperRefreshRate")) ?? "newTab";
	const savedData = JSON.parse(localStorage.getItem("wallpaperData"));

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
			"wallpaperData",
			JSON.stringify({ seed, timestamp: now }),
		);
	} else {
		seed = savedData.seed;
	}

	return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}
