import { useEffect, useState } from "react";

import { FastAverageColor } from "fast-average-color";
import { M3eTheme } from "@m3e/react/theme";

import AppBar from "@/components/surfaces/AppBar";
import Greeting from "@/components/typography/Greeting";
import Scallop from "@/components/widgets/clocks/Scallop";
import Weather from "@/components/widgets/weather/Weather";

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
					height: "100vh",
				}}
			>
				<AppBar />

				<div
					style={{
						alignItems: "center",
						display: "flex",
						flex: 1,
						flexDirection: "column",
						gap: 24,
						justifyContent: "center",
						padding: 24,
					}}
				>
					<Greeting />
					<div
						style={{
							display: "flex",
							gap: 24,
						}}
					>
						<Scallop />
						<Weather />
					</div>
				</div>
			</div>
		</M3eTheme>
	);
}
