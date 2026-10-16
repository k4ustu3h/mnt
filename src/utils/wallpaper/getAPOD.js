import { setWallpaperData } from "@/utils/wallpaper/storageManager";

function stripHtml(html) {
	if (!html) return "";
	if (typeof DOMParser !== "undefined") {
		const doc = new DOMParser().parseFromString(html, "text/html");
		return doc.body.textContent || "";
	}
	return html
		.replace(/<[^>]+>/g, "")
		.replace(/&amp;/g, "&")
		.replace(/&#8211;/g, "-")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"')
		.replace(/&#039;/g, "'")
		.replace(/&nbsp;/g, " ");
}

function cleanAuthor(rawAuthor) {
	if (!rawAuthor) return "NASA APOD";
	const text = stripHtml(rawAuthor)
		.replace(/^(?:Image\s+)?Credit:\s*/i, "")
		.replace(/\s+/g, " ")
		.trim();
	return text || "NASA APOD";
}

function cleanTitle(rawTitle) {
	if (!rawTitle) return "";
	return stripHtml(rawTitle).replace(/\s+/g, " ").trim();
}

function cleanExplanation(rawExplanation) {
	if (!rawExplanation) return "";
	const cleaned = rawExplanation
		.replace(
			/(?:<strong[^>]*>\s*)?(?:Tomorrow(?:['’]|&#039;)s picture|Your Sky Surprise):[\s\S]*$/i,
			"",
		)
		.replace(
			/^(?:<(?:strong|b)[^>]*>\s*)?Explanation:?(?:\s*<\/(?:strong|b)>)?\s*/i,
			"",
		)
		.replace(/<br\s*\/?>/gi, " ");

	return stripHtml(cleaned).replace(/\s+/g, " ").trim();
}

export default async function getAPOD(controller, savedData, now, cache) {
	const apodIncludeVideo =
		JSON.parse(localStorage.getItem("apodIncludeVideo")) ?? false;

	const res = await fetch(
		"https://science.nasa.gov/wp-json/wp/v2/apod-basic/",
		{ signal: controller.signal },
	);

	if (!res.ok) throw new Error(`NASA API Error: ${res.status}`);
	const json = await res.json();
	const data = Array.isArray(json) ? json[0] : json;

	if (!data) throw new Error("No NASA APOD data available.");

	const isAllowedMedia =
		data.media_type === "image" ||
		(data.media_type === "video" && apodIncludeVideo);

	if (!isAllowedMedia) {
		if (savedData.source === "apod" && savedData.url) {
			savedData.timestamp = now;
			setWallpaperData(savedData);

			const cachedResponse = await cache.match(savedData.url);
			if (cachedResponse) {
				const blob = await cachedResponse.blob();
				const isCachedVideo = Boolean(
					savedData.isVideo ??
						savedData.url?.split("?")[0].match(/\.(mp4|webm)$/i) ??
						blob.type.startsWith("video/"),
				);
				return {
					cachedBlobUrl: URL.createObjectURL(blob),
					isVideo: isCachedVideo,
				};
			}
		}
		throw new Error(
			"NASA APOD is not an allowed media type today, and no cache exists.",
		);
	}

	let targetImageUrl = null;
	if (data.media_type === "video" && apodIncludeVideo) {
		const videoSrcMatch = data.basic_html?.match(
			/<(?:source|video)[^>]+src=["']([^"']+\.(?:mp4|webm))["']/i,
		);
		if (videoSrcMatch) {
			targetImageUrl = videoSrcMatch[1];
		}
	}

	if (!targetImageUrl) {
		targetImageUrl =
			data.hdurl ||
			data.basic_html?.match(
				/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i,
			)?.[1] ||
			data.basic_html?.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1];
	}

	if (targetImageUrl) {
		targetImageUrl = targetImageUrl.replace(/&#038;/g, "&");
	}

	if (!targetImageUrl) {
		throw new Error("Unable to locate NASA APOD image or video asset URL.");
	}

	const isVideo = Boolean(
		targetImageUrl.split("?")[0].match(/\.(mp4|webm)$/i) ||
			(data.media_type === "video" && apodIncludeVideo),
	);

	return {
		targetImageUrl,
		isVideo,
		imageInfo: {
			author: cleanAuthor(data.copyright || data.credit),
			explanation: cleanExplanation(data.explanation),
			title: cleanTitle(data.title) || "NASA Astronomy Picture of the Day",
			url:
				data.permalink ||
				data.url ||
				"https://science.nasa.gov/apod",
			isVideo,
		},
	};
}
