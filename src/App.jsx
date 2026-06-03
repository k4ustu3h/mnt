import { useEffect, useState } from "react";

import AppBar from "@/components/surfaces/AppBar";
import Drawer from "@/components/surfaces/Drawer";
import Greeting from "@/components/typography/Greeting";
import Scallop from "@/components/widgets/clocks/Scallop";
import ThemeWrapper from "@/components/theme/ThemeWrapper";
import Weather from "@/components/widgets/weather/Weather";

export default function App() {
	const [bgUrl] = useState(() => `https://picsum.photos/1920/1080`);

	const [showGreeting, setShowGreeting] = useState(() => {
		const saved = localStorage.getItem("showGreeting");
		return saved !== null ? JSON.parse(saved) : true;
	});

	const [showScallop, setShowScallop] = useState(() => {
		const saved = localStorage.getItem("showScallop");
		return saved !== null ? JSON.parse(saved) : true;
	});

	const [showWeather, setShowWeather] = useState(() => {
		const saved = localStorage.getItem("showWeather");
		return saved !== null ? JSON.parse(saved) : true;
	});

	useEffect(() => {
		localStorage.setItem("showGreeting", JSON.stringify(showGreeting));
	}, [showGreeting]);

	useEffect(() => {
		localStorage.setItem("showScallop", JSON.stringify(showScallop));
	}, [showScallop]);

	useEffect(() => {
		localStorage.setItem("showWeather", JSON.stringify(showWeather));
	}, [showWeather]);

	return (
		<ThemeWrapper bgUrl={bgUrl}>
			<div
				style={{
					backgroundImage: `url(${bgUrl})`,
					backgroundPosition: "center",
					backgroundSize: "cover",
					height: "100vh",
				}}
			>
				<Drawer
					setShowGreeting={setShowGreeting}
					setShowScallop={setShowScallop}
					setShowWeather={setShowWeather}
					showGreeting={showGreeting}
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
								display: "flex",
								flex: 1,
								flexDirection: "column",
								padding: 24,
							}}
						>
							<div
								style={{
									display: "flex",
									flex: 1,
									justifyContent: "center",
								}}
							>
								{showGreeting && <Greeting />}
							</div>
							<div
								style={{
									alignItems: "center",
									display: "flex",
									flexWrap: "wrap",
									gap: 24,
									justifyContent: "center",
								}}
							>
								{showScallop && <Scallop />}
								{showWeather && <Weather />}
							</div>
							<div style={{ flex: 1 }} />
						</div>
					</div>
				</Drawer>
			</div>
		</ThemeWrapper>
	);
}
