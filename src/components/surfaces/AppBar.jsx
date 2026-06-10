import { lazy, Suspense, useState } from "react";

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

const AppsFolder = lazy(() => import("@/components/layout/AppsFolder"));

export default function AppBar({ showGoogleApps }) {
	const [isAppsOpen, setIsAppsOpen] = useState(false);

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
							<Apps />
							<AppsFilled slot="selected" />
						</M3eIconButton>

						<Suspense fallback={null}>
							<AppsFolder
								isOpen={isAppsOpen}
								onClose={() => setIsAppsOpen(false)}
							/>
						</Suspense>
					</div>
				)}
				<M3eIconButton toggle variant="tonal" width="wide">
					<Settings />
					<SettingsFilled slot="selected" />
					<M3eDrawerToggle htmlFor="settings-drawer" />
				</M3eIconButton>
			</M3eButtonGroup>
		</M3eAppBar>
	);
}
