import { lazy, Suspense } from "react";

import { M3eDrawerContainer } from "@m3e/react/drawer-container";

import DefaultNewTab from "@/components/buttons/DefaultNewTab";

const About = lazy(() => import("@/components/layout/About"));
const SettingsList = lazy(() => import("@/components/lists/SettingsList"));
const Version = lazy(() => import("@/components/typography/Version"));

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
					overflowY: "auto",
					padding: 24,
					scrollbarWidth: "thin",
				}}
			>
				<Suspense>
					<SettingsList />
					<DefaultNewTab />
					<About />
					<div style={{ flexGrow: 1 }} />
					<Version />
				</Suspense>
			</div>
		</M3eDrawerContainer>
	);
}
