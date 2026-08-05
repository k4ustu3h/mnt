export default function evaluateRefreshLogic(
	wallpaperSource,
	savedData,
	refreshRate,
	now,
) {
	const previousSource = savedData.source || "random";

	if (!savedData.timestamp || wallpaperSource !== previousSource) {
		return true;
	}

	if (wallpaperSource === "random") {
		if (refreshRate === "newTab") return true;
		if (refreshRate === "hourly" && now - savedData.timestamp > 3600000)
			return true;
		if (refreshRate === "daily" && now - savedData.timestamp > 86400000)
			return true;
	} else if (wallpaperSource === "apod") {
		if (now - savedData.timestamp > 43200000) return true;
	}

	return false;
}
