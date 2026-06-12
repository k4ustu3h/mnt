import {
	M3eButtonSegment,
	M3eSegmentedButton,
} from "@m3e/react/segmented-button";

import useSettings from "@/hooks/useSettings";

export default function ThemeModes() {
	const { themeScheme, setThemeScheme } = useSettings();

	return (
		<M3eSegmentedButton>
			<M3eButtonSegment
				onClick={() => setThemeScheme("dark")}
				checked={themeScheme === "dark"}
			>
				Dark
			</M3eButtonSegment>
			<M3eButtonSegment
				onClick={() => setThemeScheme("light")}
				checked={themeScheme === "light"}
			>
				Light
			</M3eButtonSegment>
			<M3eButtonSegment
				onClick={() => setThemeScheme("auto")}
				checked={themeScheme === "auto"}
			>
				System
			</M3eButtonSegment>
		</M3eSegmentedButton>
	);
}
