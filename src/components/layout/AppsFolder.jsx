import { M3eContentPane } from "@m3e/react/content-pane";

import { apps } from "@/data/GoogleApps";

import useSettings from "@/hooks/useSettings";

import MonochromeIcon from "@/components/layout/MonochromeIcon";

export default function AppsFolder() {
	const { isAppsOpen, setIsAppsOpen } = useSettings();

	return (
		<>
			<div
				onClick={() => setIsAppsOpen(false)}
				style={{
					backgroundColor: "rgba(0, 0, 0, 0.2)",
					bottom: 0,
					left: 0,
					opacity: isAppsOpen ? 1 : 0,
					pointerEvents: isAppsOpen ? "auto" : "none",
					position: "fixed",
					right: 0,
					top: 0,
					transition:
						"opacity var(--md-sys-motion-spring-fast-spatial)",
					visibility: isAppsOpen ? "visible" : "hidden",
					zIndex: 99,
				}}
			/>
			<M3eContentPane
				onClick={(e) => e.stopPropagation()}
				style={{
					"--m3e-content-pane-container-color":
						"color-mix(in srgb, var(--md-sys-color-surface-container-high) 75%, transparent)",
					backdropFilter: "blur(24px)",
					borderRadius: 32,
					height: 420,
					opacity: isAppsOpen ? 1 : 0,
					pointerEvents: isAppsOpen ? "auto" : "none",
					position: "absolute",
					right: 0,
					top: "calc(100% + 12px)",
					transform: isAppsOpen ? "scale(1)" : "scale(0.8)",
					transformOrigin: "top right",
					transition: "all var(--md-sys-motion-spring-fast-spatial)",
					visibility: isAppsOpen ? "visible" : "hidden",
					width: 304,
					zIndex: 100,
				}}
			>
				<div
					style={{
						display: "grid",
						gap: 16,
						gridTemplateColumns: "repeat(4, 1fr)",
						width: "100%",
					}}
				>
					{apps.map((app) => (
						<MonochromeIcon
							key={app.name}
							name={app.name}
							url={app.url}
						>
							{app.icon}
						</MonochromeIcon>
					))}
				</div>
			</M3eContentPane>
		</>
	);
}
