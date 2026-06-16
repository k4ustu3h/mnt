import useSettings from "@/hooks/useSettings";

export default function Wallpaper({ animateZoom, bgUrl, children }) {
	const { isAppsOpen } = useSettings();

	return (
		<div
			style={{
				height: "100vh",
				overflow: "hidden",
				position: "relative",
			}}
		>
			<div
				style={{
					animation: animateZoom
						? "wallpaper-reveal var(--md-sys-motion-spring-slow-effects)"
						: "none",
					backgroundImage: `url(${bgUrl})`,
					backgroundPosition: "center",
					backgroundSize: "cover",
					height: "100%",
					left: 0,
					position: "absolute",
					top: 0,
					transform: isAppsOpen ? "scale(1.05)" : "scale(1.1)",
					transition:
						"transform var(--md-sys-motion-spring-fast-effects)",
					width: "100%",
					zIndex: 0,
				}}
			/>
			<div
				style={{
					height: "100%",
					position: "relative",
					zIndex: 1,
				}}
			>
				{children}
			</div>
		</div>
	);
}
