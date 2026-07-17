import { M3eButton } from "@m3e/react/button";
import { M3eSplitButton } from "@m3e/react/split-button";

import useWallpaperInfo from "@/hooks/useWallpaperInfo";

export default function WallpaperInfo() {
	const info = useWallpaperInfo();

	if (!info) return null;

	return (
		<>
			<M3eSplitButton variant="text">
				<M3eButton
					href={info.url}
					rel="noreferrer"
					slot="leading-button"
					target="_blank"
				>
					Photo by {info.author}
				</M3eButton>
			</M3eSplitButton>
		</>
	);
}
