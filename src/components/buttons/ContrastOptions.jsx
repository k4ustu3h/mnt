import {
	M3eButtonSegment,
	M3eSegmentedButton,
} from "@m3e/react/segmented-button";

import useSettings from "@/hooks/useSettings";

export default function ContrastOptions() {
	const { themeContrast, setThemeContrast } = useSettings();

	return (
		<M3eSegmentedButton style={{ paddingBlockEnd: 8 }}>
			<M3eButtonSegment
				onClick={() => setThemeContrast("standard")}
				checked={themeContrast === "standard"}
			>
				Standard
			</M3eButtonSegment>
			<M3eButtonSegment
				onClick={() => setThemeContrast("medium")}
				checked={themeContrast === "medium"}
			>
				Medium
			</M3eButtonSegment>
			<M3eButtonSegment
				onClick={() => setThemeContrast("high")}
				checked={themeContrast === "high"}
			>
				High
			</M3eButtonSegment>
		</M3eSegmentedButton>
	);
}
