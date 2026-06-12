import { M3eActionList } from "@m3e/react/list";

import AppBarItem from "@/components/lists/listitems/AppBarItem";
import AppearanceItem from "@/components/lists/listitems/AppearanceItem";
import UserItem from "@/components/lists/listitems/UserItem";
import WallpaperItem from "@/components/lists/listitems/WallpaperItem";
import WidgetsItem from "@/components/lists/listitems/WidgetsItem";

export default function SettingsList() {
	return (
		<M3eActionList variant="segmented">
			<AppBarItem />
			<AppearanceItem />
			<UserItem />
			<WallpaperItem />
			<WidgetsItem />
		</M3eActionList>
	);
}
