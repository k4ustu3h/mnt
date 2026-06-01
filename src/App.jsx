import { useEffect, useState } from "react";

import { M3eTheme } from "@m3e/react/theme";

import AppBar from "@/components/surfaces/AppBar";
import Drawer from "@/components/surfaces/Drawer";
import Greeting from "@/components/typography/Greeting";
import LoadingScreen from "@/components/loading/LoadingScreen";
import Scallop from "@/components/widgets/clocks/Scallop";
import Weather from "@/components/widgets/weather/Weather";

import { extractThemeColor } from "@/utils/monet";

export default function App() {
	const [bgUrl] = useState(() => `https://picsum.photos/1920/1080`);
	const [themeColor, setThemeColor] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	const [showScallop, setShowScallop] = useState(() => {
		const saved = localStorage.getItem("showScallop");
		return saved !== null ? JSON.parse(saved) : true;
	});

	const [showWeather, setShowWeather] = useState(() => {
		const saved = localStorage.getItem("showWeather");
		return saved !== null ? JSON.parse(saved) : true;
	});

	useEffect(() => {
		localStorage.setItem("showScallop", JSON.stringify(showScallop));
	}, [showScallop]);

	useEffect(() => {
		localStorage.setItem("showWeather", JSON.stringify(showWeather));
	}, [showWeather]);

	useEffect(() => {
		let isMounted = true;

		extractThemeColor(bgUrl)
			.then((colorHex) => {
				if (isMounted) {
					setThemeColor(colorHex);
					setIsLoading(false);
				}
			})
			.catch((err) => {
				console.error("Failed to extract theme color:", err);
				if (isMounted) {
					setIsLoading(false);
				}
			});

		return () => {
			isMounted = false;
		};
	}, [bgUrl]);

	if (isLoading) {
		return <LoadingScreen bgUrl={bgUrl} />;
	}

	return (
		<M3eTheme color={themeColor}>
			<div
				style={{
					backgroundImage: `url(${bgUrl})`,
					backgroundPosition: "center",
					backgroundSize: "cover",
					height: "100vh",
				}}
			>
				<Drawer
					setShowScallop={setShowScallop}
					setShowWeather={setShowWeather}
					showScallop={showScallop}
					showWeather={showWeather}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							height: "100%",
							width: "100%",
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
								{showScallop && <Scallop />}
								{showWeather && <Weather />}
							</div>
						</div>
					</div>
				</Drawer>
			</div>
		</M3eTheme>
	);
}
