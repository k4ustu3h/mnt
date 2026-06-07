import Greeting from "@/components/typography/Greeting";
import Scallop from "@/components/widgets/clocks/Scallop";
import Weather from "@/components/widgets/weather/Weather";

export default function Widgets({ showGreeting, showScallop, showWeather }) {
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
					gap: 24,
					justifyContent: "center",
				}}
			>
				{showScallop && <Scallop />}
				{showWeather && <Weather />}
			</div>
			<div style={{ flex: 1 }} />
		</div>
	);
}
