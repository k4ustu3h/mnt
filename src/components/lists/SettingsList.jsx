import { M3eActionList } from "@m3e/react/list";

import AccessibilityItem from "@/components/lists/listitems/AccessibilityItem";
import AppBarItem from "@/components/lists/listitems/AppBarItem";
import AppearanceItem from "@/components/lists/listitems/AppearanceItem";
import UserItem from "@/components/lists/listitems/UserItem";
import WallpaperItem from "@/components/lists/listitems/WallpaperItem";
import WidgetsItem from "@/components/lists/listitems/WidgetsItem";

export default function SettingsList() {
	return (
		<M3eActionList style={{ flexShrink: 0 }} variant="segmented">
			<AppBarItem />
			<AppearanceItem />
			<UserItem />
			<WallpaperItem />
			<WidgetsItem />
			<AccessibilityItem />
		</M3eActionList>
	);
}
