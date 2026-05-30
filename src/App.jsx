import { useEffect, useState } from "react";

import { FastAverageColor } from "fast-average-color";
import { M3eTheme } from "@m3e/react/theme";

import Greeting from "@/components/typography/Greeting";

export default function App() {
	const [bgUrl] = useState(() => `https://picsum.photos/1920/1080`);

	const [themeColor, setThemeColor] = useState("");

	useEffect(() => {
		const fac = new FastAverageColor();
		const img = new Image();
		img.crossOrigin = "anonymous";

		img.src = bgUrl;

		img.onload = () => {
			const color = fac.getColor(img);
			setThemeColor(color.hex);
			fac.destroy();
		};

		return () => fac.destroy();
	}, [bgUrl]);

	return (
		<M3eTheme color={themeColor}>
			<div
				style={{
					backgroundImage: `url(${bgUrl})`,
					backgroundPosition: "center",
					backgroundSize: "cover",
					display: "flex",
					flexDirection: "column",
					height: "100%",
				}}
			>
				<Greeting />
			</div>
		</M3eTheme>
	);
}
