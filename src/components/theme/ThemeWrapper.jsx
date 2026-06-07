import { useEffect, useState } from "react";

import { M3eTheme } from "@m3e/react/theme";

import { extractThemeColor } from "@/utils/monet";

import Background from "@/components/layout/Background";
import LoadingScreen from "@/components/loading/LoadingScreen";

export default function ThemeWrapper({ children }) {
	const [bgUrl] = useState(() => `https://picsum.photos/1920/1080`);

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
			<Background bgUrl={bgUrl}>{children}</Background>
		</M3eTheme>
	);
}
