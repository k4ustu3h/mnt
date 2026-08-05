import dispatchError from "@/utils/dispatchError";

export default async function getCustom() {
	try {
		const cache = await caches.open("MNTwallpaperCache");
		const response = await cache.match("custom-wallpaper");
		if (response) {
			const blob = await response.blob();
			return URL.createObjectURL(blob);
		}
		return null;
	} catch (error) {
		dispatchError(
			"Failed to load custom wallpaper, falling back to random.",
			error,
		);
		return null;
	}
}
