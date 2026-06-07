import { useEffect, useState } from "react";

import { M3eLoadingIndicator } from "@m3e/react/loading-indicator";

export default function LoadingScreen({ bgUrl }) {
	const [isImageLoaded, setIsImageLoaded] = useState(false);

	useEffect(() => {
		const img = new Image();
		img.onload = () => {
			setIsImageLoaded(true);
		};
		img.src = bgUrl;
	}, [bgUrl]);

	return (
		<div
			style={{
				"--m3e-loading-indicator-active-indicator-color": "#C5D0FF",
				"--m3e-loading-indicator-size": "64px",
				height: "100vh",
				overflow: "hidden",
				position: "relative",
				width: "100vw",
			}}
		>
			<div
				style={{
					backgroundImage: `url(${bgUrl})`,
					backgroundPosition: "center",
					backgroundSize: "cover",
					filter: "blur(24px)",
					inset: "-30px",
					opacity: isImageLoaded ? 1 : 0,
					position: "absolute",
					transition: "opacity 0.6s linear",
					zIndex: 0,
				}}
			/>
			<div
				style={{
					backgroundColor: "rgba(0, 0, 0, 0.2)",
					inset: 0,
					position: "absolute",
					zIndex: 1,
				}}
			/>
			<div
				style={{
					alignItems: "center",
					display: "flex",
					height: "100%",
					justifyContent: "center",
					position: "relative",
					width: "100%",
					zIndex: 2,
				}}
			>
				<M3eLoadingIndicator />
			</div>
		</div>
	);
}
