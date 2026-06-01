import { useEffect, useState } from "react";

import AppBar from "@/components/surfaces/AppBar";
import Drawer from "@/components/surfaces/Drawer";
import Greeting from "@/components/typography/Greeting";
import Scallop from "@/components/widgets/clocks/Scallop";
import ThemeWrapper from "@/components/theme/ThemeWrapper";
import Weather from "@/components/widgets/weather/Weather";

export default function App() {
	const [bgUrl] = useState(() => `https://picsum.photos/1920/1080`);

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
		</ThemeWrapper>
	);
}
