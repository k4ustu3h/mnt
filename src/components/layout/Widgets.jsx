import useSettings from "@/hooks/useSettings";

import Greeting from "@/components/typography/Greeting";
import Scallop from "@/components/widgets/clocks/Scallop";
import WallpaperInfo from "@/components/typography/WallpaperInfo";
import Weather from "@/components/widgets/weather/Weather";

export default function Widgets() {
	const { showGreeting, showScallop, showWeather } = useSettings();

	return (
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
					gap: "6vw",
					justifyContent: "center",
				}}
			>
				{showScallop && <Scallop />}
				{showWeather && <Weather />}
			</div>
			<div style={{ flex: 1 }} />
			<WallpaperInfo />
		</div>
	);
}
