import { lazy, Suspense } from "react";

import { M3eAppBar } from "@m3e/react/app-bar";
import { M3eButtonGroup } from "@m3e/react/button-group";
import { M3eDrawerToggle } from "@m3e/react/drawer-container";
import { M3eIconButton } from "@m3e/react/icon-button";

import {
	Apps,
	Settings,
} from "@nine-thirty-five/material-symbols-react/rounded";
import {
	Apps as AppsFilled,
	Settings as SettingsFilled,
} from "@nine-thirty-five/material-symbols-react/rounded/filled";

import useUI from "@/hooks/context/useUI";
import useWidget from "@/hooks/context/useWidget";

const AppsFolder = lazy(() => import("@/components/surfaces/AppsFolder"));

export default function AppBar() {
	const { isAppsOpen, setIsAppsOpen } = useUI();
	const { showGoogleApps } = useWidget();

	return (
		<M3eAppBar
			style={{
				"--m3e-app-bar-container-color": "transparent",
			}}
		>
			<M3eButtonGroup slot="trailing" style={{ paddingInline: 8 }}>
				{showGoogleApps && (
					<div style={{ position: "relative" }}>
						<M3eIconButton
							onClick={() => setIsAppsOpen(!isAppsOpen)}
							selected={isAppsOpen}
							toggle
							variant="tonal"
						>
							<Apps size={24} />
							<AppsFilled size={24} slot="selected" />
						</M3eIconButton>

						<Suspense fallback={null}>
							<AppsFolder />
						</Suspense>
					</div>
				)}
				<M3eIconButton toggle variant="tonal" width="wide">
					<Settings size={24} />
					<SettingsFilled size={24} slot="selected" />
					<M3eDrawerToggle htmlFor="settings-drawer" />
				</M3eIconButton>
			</M3eButtonGroup>
		</M3eAppBar>
	);
}
