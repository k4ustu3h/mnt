import { FastAverageColor } from "fast-average-color";

export const extractThemeColor = (imageUrl) => {
	return new Promise((resolve, reject) => {
		const match = imageUrl.match(/\/seed\/([^/]+)/);
		const seed = match ? match[1] : null;

		if (seed) {
			try {
				const cachedData = JSON.parse(
					localStorage.getItem("themeColorCache"),
				);
				if (cachedData && cachedData[seed]) {
					return resolve(cachedData[seed]);
				}
			} catch (e) {
				console.warn("Failed to read theme color cache:", e);
			}
		}

		const fac = new FastAverageColor();
		const img = new Image();
		img.crossOrigin = "anonymous";
		img.src = imageUrl;

		img.onload = () => {
			try {
				const color = fac.getColor(img);
				fac.destroy();

				if (seed) {
					try {
						localStorage.setItem(
							"themeColorCache",
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

		img.onerror = (error) => {
			fac.destroy();
			reject(error);
		};
	});
};
