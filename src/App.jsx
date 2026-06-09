import AppBar from "@/components/surfaces/AppBar";
import Drawer from "@/components/surfaces/Drawer";
import ThemeWrapper from "@/components/theme/ThemeWrapper";
import Widgets from "@/components/layout/Widgets";

import useLocalStorage from "@/hooks/useLocalStorage";

export default function App() {
	const [showGoogleApps, setShowGoogleApps] = useLocalStorage(
		"showGoogleApps",
		true,
	);
	const [showGreeting, setShowGreeting] = useLocalStorage(
		"showGreeting",
		true,
	);
	const [showScallop, setShowScallop] = useLocalStorage("showScallop", true);
	const [showWeather, setShowWeather] = useLocalStorage("showWeather", true);

	return (
		<ThemeWrapper>
			<Drawer
				setShowGoogleApps={setShowGoogleApps}
				setShowGreeting={setShowGreeting}
				setShowScallop={setShowScallop}
				setShowWeather={setShowWeather}
				showGoogleApps={showGoogleApps}
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
					<AppBar showGoogleApps={showGoogleApps} />
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
