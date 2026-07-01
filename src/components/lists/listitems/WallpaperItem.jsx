import { useRef } from "react";

import { M3eExpandableListItem, M3eListOption } from "@m3e/react/list";

import {
	EventRepeat,
	Image,
	Pace,
	TabRecent,
	UploadFile,
	Wallpaper,
	WallpaperSlideshow,
} from "@nine-thirty-five/material-symbols-react/rounded";

import useWallpaper from "@/hooks/context/useWallpaper";

export default function WallpaperItem() {
	const {
		wallpaperRefreshRate,
		setWallpaperRefreshRate,
		wallpaperSource,
		setWallpaperSource,
	} = useWallpaper();

	const fileInputRef = useRef(null);

	const handleFileUpload = async (event) => {
		const file = event.target.files[0];
		if (!file) return;

		try {
			const cache = await caches.open("MNTwallpaperCache");
			await cache.put("custom-wallpaper", new Response(file));
			setWallpaperSource("custom");

			window.location.reload();
		} catch (error) {
			console.error("Failed to save custom wallpaper", error);
		}
	};

	return (
		<M3eExpandableListItem>
			<Wallpaper size={24} slot="leading" />
			Wallpaper
			<div slot="items">
				<M3eExpandableListItem>
					<Image size={24} slot="leading" />
					Source
					<div slot="items">
						<M3eListOption
							onClick={() => {
								setWallpaperSource("random");
								window.location.reload();
							}}
							selected={wallpaperSource === "random"}
						>
							<WallpaperSlideshow slot="leading" size={24} />
							Random
						</M3eListOption>
						<input
							type="file"
							accept="image/*"
							ref={fileInputRef}
							style={{ display: "none" }}
							onChange={handleFileUpload}
						/>
						<M3eListOption
							onClick={() => fileInputRef.current?.click()}
							selected={wallpaperSource === "custom"}
						>
							<UploadFile slot="leading" size={24} />
							Upload Custom
						</M3eListOption>
					</div>
				</M3eExpandableListItem>
				{wallpaperSource === "random" && (
					<M3eExpandableListItem>
						<WallpaperSlideshow size={24} slot="leading" />
						Refresh Rate
						<div slot="items">
							<M3eListOption
								onClick={() =>
									setWallpaperRefreshRate("newTab")
								}
								selected={wallpaperRefreshRate === "newTab"}
							>
								<TabRecent slot="leading" size={24} />
								New Tab
							</M3eListOption>
							<M3eListOption
								onClick={() =>
									setWallpaperRefreshRate("hourly")
								}
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
				)}
			</div>
		</M3eExpandableListItem>
	);
}
