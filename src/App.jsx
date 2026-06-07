import AppBar from "@/components/surfaces/AppBar";
import Drawer from "@/components/surfaces/Drawer";
import ThemeWrapper from "@/components/theme/ThemeWrapper";
import Widgets from "@/components/layout/Widgets";

import useLocalStorage from "@/hooks/useLocalStorage";

export default function App() {
	const [showGreeting, setShowGreeting] = useLocalStorage(
		"showGreeting",
		true,
	);
	const [showScallop, setShowScallop] = useLocalStorage("showScallop", true);
	const [showWeather, setShowWeather] = useLocalStorage("showWeather", true);

	return (
		<ThemeWrapper>
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
					<Widgets
						showGreeting={showGreeting}
						showScallop={showScallop}
						showWeather={showWeather}
					/>
				</div>
			</Drawer>
		</ThemeWrapper>
	);
}
