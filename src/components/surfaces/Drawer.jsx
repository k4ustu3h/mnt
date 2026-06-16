import { lazy, Suspense } from "react";

import { M3eDrawerContainer } from "@m3e/react/drawer-container";

import DefaultNewTab from "@/components/buttons/DefaultNewTab";

const About = lazy(() => import("@/components/layout/About"));
const SettingsList = lazy(() => import("@/components/lists/SettingsList"));

export default function Drawer({ children }) {
	return (
		<M3eDrawerContainer endMode="push" style={{ height: "100%" }}>
			{children}
			<div
				id="settings-drawer"
				slot="end"
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 24,
					padding: 24,
				}}
			>
				<Suspense>
					<SettingsList />
					<DefaultNewTab />
					<About />
				</Suspense>
			</div>
		</M3eDrawerContainer>
	);
}
