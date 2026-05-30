import { M3eDrawerContainer } from "@m3e/react/drawer-container";
import { M3eHeading } from "@m3e/react/heading";

import UsernameField from "@/components/textfields/UsernameField";

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
				<M3eHeading
					emphasized
					size="small"
					style={{
						color: "var(--md-sys-color-on-surface)",
					}}
					variant="display"
				>
					Settings
				</M3eHeading>
				<UsernameField />
			</div>
		</M3eDrawerContainer>
	);
}
