import {
	M3eButtonSegment,
	M3eSegmentedButton,
} from "@m3e/react/segmented-button";

import {
	Computer,
	DarkMode,
	LightMode,
} from "@nine-thirty-five/material-symbols-react/rounded";

import useTheme from "@/hooks/context/useTheme";

export default function ThemeModes() {
	const { themeScheme, setThemeScheme } = useTheme();

	return (
		<M3eSegmentedButton style={{ paddingBlockEnd: 8 }}>
			<M3eButtonSegment
				onClick={() => setThemeScheme("dark")}
				checked={themeScheme === "dark"}
			>
				<DarkMode slot="icon" />
				Dark
			</M3eButtonSegment>
			<M3eButtonSegment
				onClick={() => setThemeScheme("light")}
				checked={themeScheme === "light"}
			>
				<LightMode slot="icon" />
				Light
			</M3eButtonSegment>
			<M3eButtonSegment
				onClick={() => setThemeScheme("auto")}
				checked={themeScheme === "auto"}
			>
				<Computer slot="icon" />
				System
			</M3eButtonSegment>
		</M3eSegmentedButton>
	);
}
