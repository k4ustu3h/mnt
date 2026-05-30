import { M3eAppBar } from "@m3e/react/app-bar";
import { M3eDrawerToggle } from "@m3e/react/drawer-container";
import { M3eIconButton } from "@m3e/react/icon-button";
import { Settings } from "@nine-thirty-five/material-symbols-react/rounded";
import { Settings as SettingsFilled } from "@nine-thirty-five/material-symbols-react/rounded/filled";

export default function AppBar() {
	return (
		<M3eAppBar
			style={{
				"--m3e-app-bar-container-color": "transparent",
				paddingInline: 8,
			}}
		>
			<M3eIconButton slot="trailing" toggle>
				<Settings />
				<SettingsFilled slot="selected" />
				<M3eDrawerToggle for="settings-drawer" />
			</M3eIconButton>
		</M3eAppBar>
	);
}
