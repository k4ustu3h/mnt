import {
	M3eActionList,
	M3eExpandableListItem,
	M3eListAction,
	M3eListOption,
} from "@m3e/react/list";

import {
	AppRegistration,
	EventRepeat,
	Pace,
	Person,
	TabRecent,
	WallpaperSlideshow,
	Widgets,
} from "@nine-thirty-five/material-symbols-react/rounded";

import ListItem from "@/components/lists/ListItem";
import UsernameField from "@/components/textfields/UsernameField";
import WidgetSwitch from "@/components/switches/WidgetSwitch";

export default function SettingsList({
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
		<M3eActionList variant="segmented">
			<M3eExpandableListItem>
				<AppRegistration
					color="var(--md-sys-color-on-surface)"
					slot="leading"
				/>
				App Bar
				<div slot="items">
					<M3eListAction>
						<WidgetSwitch
							checked={showGoogleApps}
							label="Google Apps Folder"
							onChange={setShowGoogleApps}
						/>
					</M3eListAction>
				</div>
			</M3eExpandableListItem>
			<M3eExpandableListItem>
				<Person color="var(--md-sys-color-on-surface)" slot="leading" />
				User
				<div slot="items">
					<M3eListAction>
						<WidgetSwitch
							checked={showGreeting}
							label="Greeting"
							onChange={setShowGreeting}
						/>
					</M3eListAction>
					<ListItem>
						<UsernameField disabled={!showGreeting} />
					</ListItem>
				</div>
			</M3eExpandableListItem>
			<M3eExpandableListItem>
				<Widgets
					color="var(--md-sys-color-on-surface)"
					slot="leading"
				/>
				Widgets
				<div slot="items">
					<M3eListAction>
						<WidgetSwitch
							checked={showScallop}
							label="Clock Widget"
							onChange={setShowScallop}
						/>
					</M3eListAction>
					<M3eListAction>
						<WidgetSwitch
							checked={showWeather}
							label="Weather Widget"
							onChange={setShowWeather}
						/>
					</M3eListAction>
				</div>
			</M3eExpandableListItem>
			<M3eExpandableListItem>
				<WallpaperSlideshow
					color="var(--md-sys-color-on-surface)"
					slot="leading"
				/>
				Wallpaper
				<span slot="supporting-text">Refresh Rate</span>
				<div slot="items">
					<M3eListOption
						onClick={() => setWallpaperRefreshRate("newTab")}
						selected={wallpaperRefreshRate === "newTab"}
					>
						<TabRecent slot="leading" />
						New Tab
					</M3eListOption>
					<M3eListOption
						onClick={() => setWallpaperRefreshRate("hourly")}
						selected={wallpaperRefreshRate === "hourly"}
					>
						<Pace slot="leading" />
						Hourly
					</M3eListOption>
					<M3eListOption
						onClick={() => setWallpaperRefreshRate("daily")}
						selected={wallpaperRefreshRate === "daily"}
					>
						<EventRepeat slot="leading" />
						Daily
					</M3eListOption>
				</div>
			</M3eExpandableListItem>
		</M3eActionList>
	);
}
