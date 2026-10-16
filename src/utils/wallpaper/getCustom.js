import dispatchError from "@/utils/dispatchError";

export default async function getCustom() {
	try {
		const cache = await caches.open("MNTwallpaperCache");
		const response = await cache.match(
			"https://mnt.local/custom-wallpaper",
		);
		if (response) {
			const blob = await response.blob();
			return {
				url: URL.createObjectURL(blob),
				isVideo: blob.type.startsWith("video/"),
			};
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
