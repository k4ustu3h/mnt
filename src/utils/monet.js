import { FastAverageColor } from "fast-average-color";

export default async function monet(mediaUrl, isVideo = false) {
	if (!mediaUrl) {
		return Promise.reject(new Error("No mediaUrl provided to monet"));
	}

	return new Promise((resolve, reject) => {
		const fac = new FastAverageColor();
		let timeoutId = null;

		const cleanup = () => {
			if (timeoutId) clearTimeout(timeoutId);
			fac.destroy();
		};

		const handleSuccess = (mediaElement) => {
			try {
				const color = fac.getColor(mediaElement);
				cleanup();
				resolve(color.hex);
			} catch (error) {
				cleanup();
				reject(error);
			}
		};

		const handleError = (err) => {
			cleanup();
			reject(
				err instanceof Error
					? err
					: new Error(`Failed to decode media at: ${mediaUrl}`),
			);
		};

		timeoutId = setTimeout(() => {
			handleError(new Error(`Timeout decoding media at: ${mediaUrl}`));
		}, 3000);

		if (isVideo) {
			const video = document.createElement("video");
			video.muted = true;
			video.playsInline = true;
			video.preload = "auto";
			video.src = mediaUrl;

			video.addEventListener("loadeddata", () => handleSuccess(video), {
				once: true,
			});
			video.addEventListener("error", handleError, { once: true });

			video.load();
		} else {
			const img = new Image();
			img.src = mediaUrl;

			img.onload = () => handleSuccess(img);
			img.onerror = handleError;
		}
	});
}
