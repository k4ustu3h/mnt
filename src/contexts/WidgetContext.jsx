import { WidgetContextObj } from "@/hooks/context/useWidget";

import useLocalStorage from "@/hooks/useLocalStorage";

export default function WidgetContext({ children }) {
	const [showGoogleApps, setShowGoogleApps] = useLocalStorage(
		"showGoogleApps",
		true,
	);
	const [showGreeting, setShowGreeting] = useLocalStorage(
		"showGreeting",
		true,
	);
	const [showScallop, setShowScallop] = useLocalStorage("showScallop", true);
	const [showSearchbar, setShowSearchbar] = useLocalStorage(
		"showSearchbar",
		true,
	);
	const [showWeather, setShowWeather] = useLocalStorage("showWeather", true);

	const value = {
		setShowGoogleApps,
		setShowGreeting,
		setShowScallop,
		setShowSearchbar,
		setShowWeather,
		showGoogleApps,
		showGreeting,
		showScallop,
		showSearchbar,
		showWeather,
	};

	return (
		<WidgetContextObj.Provider value={value}>
			{children}
		</WidgetContextObj.Provider>
	);
}
