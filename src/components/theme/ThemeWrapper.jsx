import { useEffect, useState } from "react";

import { M3eTheme } from "@m3e/react/theme";

import LoadingScreen from "@/components/loading/LoadingScreen";
import { extractThemeColor } from "@/utils/monet";

export default function ThemeWrapper({ bgUrl, children }) {
	const [themeColor, setThemeColor] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;

		extractThemeColor(bgUrl)
			.then((colorHex) => {
				if (isMounted) {
					setThemeColor(colorHex);
					setIsLoading(false);
				}
			})
			.catch((err) => {
				console.error("Failed to extract theme color:", err);
				if (isMounted) {
					setIsLoading(false);
				}
			});

		return () => {
			isMounted = false;
		};
	}, [bgUrl]);

	if (isLoading) {
		return <LoadingScreen bgUrl={bgUrl} />;
	}

	return (
		<M3eTheme color={themeColor} motion="expressive">
			{children}
		</M3eTheme>
	);
}
