import { M3eDrawerContainer } from "@m3e/react/drawer-container";
import { M3eHeading } from "@m3e/react/heading";

import DefaultNewTab from "@/components/buttons/DefaultNewTab";
import SettingsList from "@/components/lists/SettingsList";

export default function Drawer({
	children,
	setShowGoogleApps,
	setShowGreeting,
	setShowScallop,
	setShowWeather,
	setWallpaperRefreshRate,
	showGoogleApps,
	showGreeting,
	showScallop,
	showWeather,
	wallpaperRefreshRate,
}) {
	return (
		<M3eDrawerContainer
			endMode="push"
			style={{
				background: "transparent",
				height: "100%",
				width: "100%",
			}}
		>
			{children}
			<div
				id="settings-drawer"
				slot="end"
				style={{
					boxSizing: "border-box",
					display: "flex",
					flexDirection: "column",
					gap: 24,
					height: "100%",
					padding: 24,
					width: 320,
				}}
			>
				<M3eHeading
					emphasized
					size="small"
					style={{
						color: "var(--md-sys-color-on-surface)",
					}}
					variant="display"
				>
					Settings
				</M3eHeading>
				<SettingsList
					setShowGoogleApps={setShowGoogleApps}
					setShowGreeting={setShowGreeting}
					setShowScallop={setShowScallop}
					setShowWeather={setShowWeather}
					setWallpaperRefreshRate={setWallpaperRefreshRate}
					showGoogleApps={showGoogleApps}
					showGreeting={showGreeting}
					showScallop={showScallop}
					showWeather={showWeather}
					wallpaperRefreshRate={wallpaperRefreshRate}
				/>
				<DefaultNewTab />
			</div>
		</M3eDrawerContainer>
	);
}
