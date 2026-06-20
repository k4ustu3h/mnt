import { useEffect, useState } from "react";

export default function useWallpaperInfo() {
	const [info, setInfo] = useState(null);

	useEffect(() => {
		const savedData = JSON.parse(localStorage.getItem("MNTwallpaperData"));

		if (savedData && savedData.seed) {
			fetch(`https://picsum.photos/seed/${savedData.seed}/info`)
				.then((res) => res.json())
				.then((data) => setInfo(data))
				.catch((err) =>
					console.error("Failed to fetch wallpaper info:", err),
				);
		}
	}, []);

	return info;
}
