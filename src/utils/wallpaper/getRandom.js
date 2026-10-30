export default function getRandom(controller) {
	const height = Math.round(window.innerHeight * 1.1);
	const width = Math.round(window.innerWidth * 1.1);
	const seed = Math.random().toString(36).substring(2, 10);

	const fetchInfo = async () => {
		try {
			const res = await fetch(`https://picsum.photos/seed/${seed}/info`, {
				signal: controller?.signal,
			});
			if (res.ok) {
				const data = await res.json();
				if (data?.author) {
					return {
						author: data.author.trim(),
						url:
							data.url?.trim() ||
							`https://picsum.photos/id/${data.id}`,
						title: `Photo by ${data.author.trim()}`,
						explanation:
							"A randomly generated high-resolution image from Lorem Picsum.",
					};
				}
			}
		} catch (error) {
			console.warn("Failed to fetch Lorem Picsum image info:", error);
		}
		return null;
	};

	return {
		targetImageUrl: `https://picsum.photos/seed/${seed}/${width}/${height}`,
		seed,
		infoPromise: fetchInfo(),
	};
}
