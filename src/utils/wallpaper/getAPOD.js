export default async function getAPOD(controller, savedData, now, cache) {
	const apiKey = import.meta.env.VITE_APOD_API_KEY;
	const res = await fetch(
		`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`,
		{ signal: controller.signal },
	);

	if (!res.ok) throw new Error(`NASA API Error: ${res.status}`);
	const data = await res.json();

	if (data.media_type !== "image") {
		if (savedData.source === "apod" && savedData.url) {
			savedData.timestamp = now;
			localStorage.setItem("MNTwallpaperData", JSON.stringify(savedData));

			const cachedResponse = await cache.match(savedData.url);
			if (cachedResponse) {
				const blob = await cachedResponse.blob();
				return { cachedBlobUrl: URL.createObjectURL(blob) };
			}
		}
		throw new Error(
			"NASA APOD is not an image today, and no cache exists.",
		);
	}

	return {
		targetImageUrl: data.hdurl || data.url,
		imageInfo: {
			author: data.copyright || "NASA APOD",
			explanation: data.explanation,
			title: data.title,
			url: "https://apod.nasa.gov/apod/astropix.html",
		},
	};
}
