import useWidget from "@/hooks/context/useWidget";

import Greeting from "@/components/typography/Greeting";
import Scallop from "@/components/widgets/clocks/Scallop";
import Searchbar from "@/components/inputs/Searchbar";
import WallpaperInfo from "@/components/buttons/WallpaperInfo";
import Weather from "@/components/widgets/weather/Weather";

export default function Widgets() {
	const { showGreeting, showScallop, showSearchbar, showWeather } =
		useWidget();

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
			{(showSearchbar || showScallop || showWeather) && (
				<div
					style={{
						alignItems: "center",
						display: "flex",
						flexDirection: "column",
						gap: 96,
						justifyContent: "center",
					}}
				>
					{showSearchbar && <Searchbar />}
					{(showScallop || showWeather) && (
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
					)}
				</div>
			)}
			<div style={{ flex: 1 }} />
			<WallpaperInfo />
		</div>
	);
}
