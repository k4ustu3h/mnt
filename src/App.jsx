import { useState } from "react";

import AppBar from "@/components/surfaces/AppBar";
import Drawer from "@/components/surfaces/Drawer";
import ThemeWrapper from "@/components/theme/ThemeWrapper";
import Widgets from "@/components/layout/Widgets";

import useLocalStorage from "@/hooks/useLocalStorage";

export default function App() {
	const [isAppsOpen, setIsAppsOpen] = useState(false);
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
	const [themeScheme, setThemeScheme] = useLocalStorage(
		"themeScheme",
		"auto",
	);
	const [wallpaperRefreshRate, setWallpaperRefreshRate] = useLocalStorage(
		"wallpaperRefreshRate",
		"newTab",
	);

	return (
		<ThemeWrapper isAppsOpen={isAppsOpen} themeScheme={themeScheme}>
			<Drawer
				setShowGoogleApps={setShowGoogleApps}
				setShowGreeting={setShowGreeting}
				setShowScallop={setShowScallop}
				setShowWeather={setShowWeather}
				setThemeScheme={setThemeScheme}
				setWallpaperRefreshRate={setWallpaperRefreshRate}
				showGoogleApps={showGoogleApps}
				showGreeting={showGreeting}
				showScallop={showScallop}
				showWeather={showWeather}
				themeScheme={themeScheme}
				wallpaperRefreshRate={wallpaperRefreshRate}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						height: "100%",
						width: "100%",
					}}
				>
					<AppBar
						isAppsOpen={isAppsOpen}
						setIsAppsOpen={setIsAppsOpen}
						showGoogleApps={showGoogleApps}
					/>
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
