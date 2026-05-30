import { M3eDrawerContainer } from "@m3e/react/drawer-container";

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
					height: "100%",
					padding: 24,
					width: 320,
					boxSizing: "border-box",
				}}
			>
				Settings Drawer
			</div>
		</M3eDrawerContainer>
	);
}
