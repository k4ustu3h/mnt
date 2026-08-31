export default async function streamDownload(controller, fetchUrl, timeoutId) {
	const rawResponse = await fetch(fetchUrl, {
		signal: controller.signal,
	});

	if (timeoutId) clearTimeout(timeoutId);

	if (!rawResponse.ok) {
		throw new Error(
			`HTTP Error fetching image blob: ${rawResponse.status}`,
		);
	}

	const contentLength = rawResponse.headers.get("content-length");
	const total = contentLength ? parseInt(contentLength, 10) : 0;
	let loaded = 0;

	const reader = rawResponse.body.getReader();
	const chunks = [];

	while (true) {
		const { done, value } = await reader.read();
		if (done) break;

		chunks.push(value);
		loaded += value.length;

		window.dispatchEvent(
			new CustomEvent("wallpaper-download-progress", {
				detail: { loaded, total },
			}),
		);
	}

	const blob = new Blob(chunks, {
		type: rawResponse.headers.get("content-type"),
	});

	return new Response(blob, {
		headers: rawResponse.headers,
		status: rawResponse.status,
		statusText: rawResponse.statusText,
	});
}
