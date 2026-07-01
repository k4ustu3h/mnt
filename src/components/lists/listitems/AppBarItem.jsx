import { M3eExpandableListItem, M3eListAction } from "@m3e/react/list";

import { AppRegistration } from "@nine-thirty-five/material-symbols-react/rounded";

import useWidget from "@/hooks/context/useWidget";

import WidgetSwitch from "@/components/switches/WidgetSwitch";

export default function AppBarItem() {
	const { showGoogleApps, setShowGoogleApps } = useWidget();

	return (
		<M3eExpandableListItem>
			<AppRegistration size={24} slot="leading" />
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
