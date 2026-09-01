export function getWallpaperSource() {
	try {
		const item = localStorage.getItem("wallpaperSource");
		return item ? JSON.parse(item) : "random";
	} catch (error) {
		console.error("Failed to parse wallpaperSource:", error);
		return "random";
	}
}

export function getWallpaperRefreshRate() {
	try {
		const item = localStorage.getItem("wallpaperRefreshRate");
		return item ? JSON.parse(item) : "newTab";
	} catch (error) {
		console.error("Failed to parse wallpaperRefreshRate:", error);
		return "newTab";
	}
}

export function getWallpaperData() {
	try {
		const item = localStorage.getItem("MNTwallpaperData");
		return item ? JSON.parse(item) : {};
	} catch (error) {
		console.error("Failed to parse MNTwallpaperData:", error);
		return {};
	}
}

export function setWallpaperData(data) {
	try {
		localStorage.setItem("MNTwallpaperData", JSON.stringify(data));
	} catch (error) {
		console.error("Failed to save MNTwallpaperData:", error);
	}
}

export function clearWallpaperData() {
	try {
		localStorage.removeItem("MNTwallpaperData");
	} catch (error) {
		console.error("Failed to clear MNTwallpaperData:", error);
	}
}
