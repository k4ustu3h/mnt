import { useMemo } from "react";

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
	const [showWeather, setShowWeather] = useLocalStorage("showWeather", true);

	const value = useMemo(
		() => ({
			setShowGoogleApps,
			setShowGreeting,
			setShowScallop,
			setShowWeather,
			showGoogleApps,
			showGreeting,
			showScallop,
			showWeather,
		}),
		[
			setShowGoogleApps,
			setShowGreeting,
			setShowScallop,
			setShowWeather,
			showGoogleApps,
			showGreeting,
			showScallop,
			showWeather,
		],
	);

	return (
		<WidgetContextObj.Provider value={value}>
			{children}
		</WidgetContextObj.Provider>
	);
}
