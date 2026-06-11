import { lazy, Suspense } from "react";

import { M3eDrawerContainer } from "@m3e/react/drawer-container";

import DefaultNewTab from "@/components/buttons/DefaultNewTab";

const SettingsList = lazy(() => import("@/components/lists/SettingsList"));

export default function Drawer({ children }) {
	return (
		<M3eDrawerContainer
			endMode="push"
			style={{
				background: "transparent",
				height: "100%",
				width: "100%",
			}}
		>
			{children}
			<div
				id="settings-drawer"
				slot="end"
				style={{
					boxSizing: "border-box",
					display: "flex",
					flexDirection: "column",
					gap: 24,
					height: "100%",
					padding: 24,
					width: 320,
				}}
			>
				<Suspense fallback={<div style={{ flex: 1 }} />}>
					<SettingsList />
					<DefaultNewTab />
				</Suspense>
			</div>
		</M3eDrawerContainer>
	);
}
