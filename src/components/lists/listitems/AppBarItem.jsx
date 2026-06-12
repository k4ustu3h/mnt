import { M3eExpandableListItem, M3eListAction } from "@m3e/react/list";

import { AppRegistration } from "@nine-thirty-five/material-symbols-react/rounded";

import useSettings from "@/hooks/useSettings";

import WidgetSwitch from "@/components/switches/WidgetSwitch";

export default function AppBarItem() {
	const { showGoogleApps, setShowGoogleApps } = useSettings();

	return (
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
	);
}
