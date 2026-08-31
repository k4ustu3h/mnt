import { FastAverageColor } from "fast-average-color";

export default async function monet(mediaUrl) {
	const match = mediaUrl.match(/\/seed\/([^/]+)/);
	const seed = match ? match[1] : null;

	if (seed) {
		try {
			const cachedData = JSON.parse(
				localStorage.getItem("MNTthemeColorCache"),
			);
			if (cachedData && cachedData[seed]) {
				return cachedData[seed];
			}
		} catch (e) {
			console.warn("Failed to read theme color cache:", e);
		}
	}

	let isVideo = false;
	try {
		const res = await fetch(mediaUrl);
		const blob = await res.blob();
		isVideo = blob.type.startsWith("video/");
	} catch (err) {
		console.error("Failed to fetch media for MIME type check", err);
	}

	return new Promise((resolve, reject) => {
		const fac = new FastAverageColor();

		const handleSuccess = (mediaElement) => {
			try {
				const color = fac.getColor(mediaElement);
				fac.destroy();

				if (seed) {
					try {
						localStorage.setItem(
							"MNTthemeColorCache",
							JSON.stringify({ [seed]: color.hex }),
						);
					} catch (e) {
						console.warn(
							"Failed to write to theme color cache:",
							e,
						);
					}
				}

				resolve(color.hex);
			} catch (error) {
				fac.destroy();
				reject(error);
			}
		};

		const handleError = () => {
			fac.destroy();
			reject(new Error(`Failed to decode media at: ${mediaUrl}`));
		};

		if (isVideo) {
			const video = document.createElement("video");
			video.muted = true;
			video.src = mediaUrl;

			video.addEventListener("loadeddata", () => handleSuccess(video));
			video.addEventListener("error", handleError);

			video.load();
		} else {
			const img = new Image();
			img.src = mediaUrl;

			img.onload = () => handleSuccess(img);
			img.onerror = handleError;
		}
	});
}
