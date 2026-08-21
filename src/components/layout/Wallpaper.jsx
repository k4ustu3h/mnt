import { useEffect, useState } from "react";

import useUI from "@/hooks/context/useUI";

export default function Wallpaper({ animateZoom, bgUrl, children }) {
	const { isAppsOpen } = useUI();

	const [isVideo, setIsVideo] = useState(false);

	useEffect(() => {
		if (!bgUrl) return;

		fetch(bgUrl)
			.then((res) => res.blob())
			.then((blob) => {
				setIsVideo(blob.type.startsWith("video/"));
			})
			.catch((err) =>
				console.error("Error checking wallpaper format:", err),
			);
	}, [bgUrl]);

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
					src={bgUrl}
					style={{
						...sharedStyles,
						objectFit: "cover",
					}}
				/>
			) : (
				<div
					style={{
						...sharedStyles,
						backgroundImage: `url(${bgUrl})`,
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
