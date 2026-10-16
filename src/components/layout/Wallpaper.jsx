import useUI from "@/hooks/context/useUI";

export default function Wallpaper({
	animateZoom,
	bgUrl,
	isVideo = false,
	children,
}) {
	const { isAppsOpen } = useUI();

	const sharedStyles = {
		animation: animateZoom
			? "wallpaper-reveal var(--md-sys-motion-spring-slow-effects)"
			: "none",
		height: "100%",
		left: 0,
		position: "absolute",
		top: 0,
		transform: isAppsOpen ? "scale(1.05)" : "scale(1.1)",
		transition: "transform var(--md-sys-motion-spring-fast-effects)",
		width: "100%",
		zIndex: 0,
	};

	return (
		<div
			style={{
				height: "100vh",
				overflow: "hidden",
				position: "relative",
			}}
		>
			{isVideo ? (
				<video
					autoPlay
					loop
					muted
					playsInline
					src={bgUrl || undefined}
					style={{
						...sharedStyles,
						objectFit: "cover",
					}}
				/>
			) : (
				<div
					style={{
						...sharedStyles,
						backgroundImage: bgUrl ? `url(${bgUrl})` : "none",
						backgroundPosition: "center",
						backgroundSize: "cover",
					}}
				/>
			)}

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
