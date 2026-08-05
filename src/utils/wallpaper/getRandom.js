export default function getRandom() {
	const height = Math.round(window.innerHeight * 1.1);
	const width = Math.round(window.innerWidth * 1.1);
	const seed = Math.random().toString(36).substring(2, 10);

	return {
		targetImageUrl: `https://picsum.photos/seed/${seed}/${width}/${height}`,
		seed,
	};
}
