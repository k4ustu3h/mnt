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
	const withoutLabel = rawAuthor
		.replace(/<\/?(?:strong|b|em|span)[^>]*>/gi, "")
		.replace(/^(?:Image\s+)?Credit:\s*/i, "");
	const text = stripHtml(withoutLabel).replace(/\s+/g, " ").trim();
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
			/<strong[^>]*>\s*(?:Tomorrow(?:['’]|&#039;)s picture|Your Sky Surprise):[\s\S]*$/i,
			"",
		)
		.replace(
			/(?:Tomorrow(?:['’]|&#039;)s picture|Your Sky Surprise):[\s\S]*$/i,
			"",
		)
		.replace(/^<strong[^>]*>\s*Explanation:?\s*<\/strong>\s*/i, "")
		.replace(/^<b[^>]*>\s*Explanation:?\s*<\/b>\s*/i, "")
		.replace(/^Explanation:?\s*/i, "")
		.replace(/<br\s*\/?>/gi, " ");

	return stripHtml(cleaned).replace(/\s+/g, " ").trim();
}

export default async function getAPOD(controller, savedData, now, cache) {
	const apiKey = import.meta.env.VITE_APOD_API_KEY || "DEMO_KEY";

	const apodIncludeVideo =
		JSON.parse(localStorage.getItem("apodIncludeVideo")) ?? false;

	const res = await fetch(
		`https://science.nasa.gov/wp-json/wp/v2/apod-basic/?api_key=${apiKey}`,
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
			localStorage.setItem("MNTwallpaperData", JSON.stringify(savedData));

			const cachedResponse = await cache.match(savedData.url);
			if (cachedResponse) {
				const blob = await cachedResponse.blob();
				return { cachedBlobUrl: URL.createObjectURL(blob) };
			}
		}
		throw new Error(
			"NASA APOD is not an allowed media type today, and no cache exists.",
		);
	}

	let targetImageUrl = null;
	if (data.media_type === "video" && apodIncludeVideo) {
		const videoSrcMatch =
			data.basic_html?.match(
				/<video[^>]*>[\s\S]*?<source[^>]+src=["']([^"']+\.(?:mp4|webm))["']/i,
			) ||
			data.basic_html?.match(
				/<source[^>]+src=["']([^"']+\.(?:mp4|webm))["']/i,
			) ||
			data.basic_html?.match(
				/<video[^>]+src=["']([^"']+\.(?:mp4|webm))["']/i,
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

	return {
		targetImageUrl,
		imageInfo: {
			author: cleanAuthor(data.copyright || data.credit),
			explanation: cleanExplanation(data.explanation),
			title: cleanTitle(data.title) || "NASA Astronomy Picture of the Day",
			url:
				data.permalink ||
				data.url ||
				"https://science.nasa.gov/apod",
		},
	};
}
