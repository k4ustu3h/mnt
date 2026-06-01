import { FastAverageColor } from "fast-average-color";

export const extractThemeColor = (imageUrl) => {
	return new Promise((resolve, reject) => {
		const fac = new FastAverageColor();
		const img = new Image();
		img.crossOrigin = "anonymous";
		img.src = imageUrl;

		img.onload = () => {
			try {
				const color = fac.getColor(img);
				fac.destroy();
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
