import { apps } from "@/data/GoogleApps";

import MonochromeIcon from "@/components/layout/MonochromeIcon";

export default function AppsFolder({ isOpen, onClose }) {
	return (
		<>
			<div
				onClick={onClose}
				style={{
					backgroundColor: "rgba(0, 0, 0, 0.2)",
					bottom: 0,
					left: 0,
					opacity: isOpen ? 1 : 0,
					pointerEvents: isOpen ? "auto" : "none",
					position: "fixed",
					right: 0,
					top: 0,
					transition:
						"opacity var(--md-sys-motion-spring-fast-spatial)",
					visibility: isOpen ? "visible" : "hidden",
					zIndex: 99,
				}}
			/>
			<div
				onClick={(e) => e.stopPropagation()}
				style={{
					backdropFilter: "blur(24px)",
					backgroundColor:
						"color-mix(in srgb, var(--md-sys-color-surface-container-high) 75%, transparent)",
					borderRadius: 32,
					display: "flex",
					flexDirection: "column",
					height: 420,
					opacity: isOpen ? 1 : 0,
					overflow: "hidden",
					padding: 0,
					pointerEvents: isOpen ? "auto" : "none",
					position: "absolute",
					right: 0,
					top: "calc(100% + 12px)",
					transform: isOpen ? "scale(1)" : "scale(0.8)",
					transformOrigin: "top right",
					transition: "all var(--md-sys-motion-spring-fast-spatial)",
					visibility: isOpen ? "visible" : "hidden",
					width: 304,
					zIndex: 100,
				}}
			>
				<div className="folder-scroll">
					<div
						style={{
							alignItems: "start",
							boxSizing: "border-box",
							display: "grid",
							gap: 16,
							gridTemplateColumns: "repeat(4, 1fr)",
							paddingBlock: 24,
							paddingLeft: 24,
							paddingRight: 12,
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
				</div>
			</div>
		</>
	);
}
