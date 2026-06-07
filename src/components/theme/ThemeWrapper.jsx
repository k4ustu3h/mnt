import { useEffect, useState } from "react";

import { M3eTheme } from "@m3e/react/theme";

import { extractThemeColor } from "@/utils/monet";

import Wallpaper from "@/components/layout/Wallpaper";
import LoadingScreen from "@/components/loading/LoadingScreen";

export default function ThemeWrapper({ children }) {
	const [bgUrl] = useState(() => {
		const width = window.innerWidth;
		const height = window.innerHeight;
		return `https://picsum.photos/${width}/${height}`;
	});

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
			<Wallpaper bgUrl={bgUrl}>{children}</Wallpaper>
		</M3eTheme>
	);
}
