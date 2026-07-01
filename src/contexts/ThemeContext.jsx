import { useMemo } from "react";

import { ThemeContextObj } from "@/hooks/context/useTheme";

import useLocalStorage from "@/hooks/useLocalStorage";

export default function ThemeContext({ children }) {
	const [iconShape, setIconShape] = useLocalStorage(
		"newTabIconShape",
		"square",
	);
	const [themeContrast, setThemeContrast] = useLocalStorage(
		"themeContrast",
		"standard",
	);
	const [themeScheme, setThemeScheme] = useLocalStorage(
		"themeScheme",
		"auto",
	);

	const value = useMemo(
		() => ({
			iconShape,
			setIconShape,
			setThemeContrast,
			setThemeScheme,
			themeContrast,
			themeScheme,
		}),
		[
			iconShape,
			setIconShape,
			setThemeContrast,
			setThemeScheme,
			themeContrast,
			themeScheme,
		],
	);

	return (
		<ThemeContextObj.Provider value={value}>
			{children}
		</ThemeContextObj.Provider>
	);
}
