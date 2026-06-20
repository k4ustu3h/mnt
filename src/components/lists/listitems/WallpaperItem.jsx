import { M3eExpandableListItem, M3eListOption } from "@m3e/react/list";

import {
	EventRepeat,
	Pace,
	TabRecent,
	WallpaperSlideshow,
} from "@nine-thirty-five/material-symbols-react/rounded";

import useSettings from "@/hooks/useSettings";

export default function WallpaperItem() {
	const { wallpaperRefreshRate, setWallpaperRefreshRate } = useSettings();

	return (
		<M3eExpandableListItem>
			<WallpaperSlideshow size={24} slot="leading" />
			Wallpaper
			<span slot="supporting-text">Refresh Rate</span>
			<div slot="items">
				<M3eListOption
					onClick={() => setWallpaperRefreshRate("newTab")}
					selected={wallpaperRefreshRate === "newTab"}
				>
					<TabRecent slot="leading" size={24} />
					New Tab
				</M3eListOption>
				<M3eListOption
					onClick={() => setWallpaperRefreshRate("hourly")}
					selected={wallpaperRefreshRate === "hourly"}
				>
					<Pace slot="leading" size={24} />
					Hourly
				</M3eListOption>
				<M3eListOption
					onClick={() => setWallpaperRefreshRate("daily")}
					selected={wallpaperRefreshRate === "daily"}
				>
					<EventRepeat slot="leading" size={24} />
					Daily
				</M3eListOption>
			</div>
		</M3eExpandableListItem>
	);
}
