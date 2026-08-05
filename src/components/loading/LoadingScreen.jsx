import { useEffect, useState } from "react";

import { M3eHeading } from "@m3e/react/heading";
import { M3eLinearProgressIndicator } from "@m3e/react/progress-indicator";
import { M3eLoadingIndicator } from "@m3e/react/loading-indicator";

export default function LoadingScreen({ bgUrl }) {
	const [isImageLoaded, setIsImageLoaded] = useState(false);
	const [showProgressUI, setShowProgressUI] = useState(false);
	const [progress, setProgress] = useState({ loaded: 0, total: 0 });

	useEffect(() => {
		const img = new Image();
		img.onload = () => {
			setIsImageLoaded(true);
		};
		if (bgUrl) img.src = bgUrl;
	}, [bgUrl]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowProgressUI(true);
		}, 4000);

		const handleProgress = (e) => {
			setProgress(e.detail);
		};
		window.addEventListener("wallpaper-download-progress", handleProgress);

		return () => {
			clearTimeout(timer);
			window.removeEventListener(
				"wallpaper-download-progress",
				handleProgress,
			);
		};
	}, []);

	const formatBytes = (bytes) => {
		if (bytes === 0) return "0 MB";
		return (bytes / (1024 * 1024)).toFixed(2) + " MB";
	};

	const percent = progress.total
		? Math.min(Math.round((progress.loaded / progress.total) * 100), 100)
		: 0;

	console.log(
		`LoadingScreen: progress.loaded=${progress.loaded}, progress.total=${progress.total}, percent=${percent}`,
	);

	return (
		<div
			style={{
				"--m3e-loading-indicator-size": "64px",
				backgroundColor: "var(--md-sys-color-surface)",
				height: "100vh",
				overflow: "hidden",
				position: "relative",
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
					backgroundColor:
						"color-mix(in srgb, var(--md-sys-color-surface) 40%, transparent)",
					inset: 0,
					position: "absolute",
					zIndex: 1,
				}}
			/>
			<div
				style={{
					alignItems: "center",
					display: "flex",
					flexDirection: "column",
					gap: "16px",
					height: "100%",
					justifyContent: "center",
					position: "relative",
					zIndex: 2,
				}}
			>
				{showProgressUI && progress.loaded > 0 ? (
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "16px",
							width: "240px",
						}}
					>
						<M3eLinearProgressIndicator
							value={progress.total ? percent : undefined}
							variant="wavy"
						/>

						<div
							style={{
								textAlign: "center",
							}}
						>
							<M3eHeading variant="title">
								Downloading high-res wallpaper...
							</M3eHeading>
							<M3eHeading variant="label" size="small">
								{progress.total
									? `${formatBytes(progress.loaded)} / ${formatBytes(progress.total)} (${percent}%)`
									: `${formatBytes(progress.loaded)} downloaded`}
							</M3eHeading>
						</div>
					</div>
				) : (
					<M3eLoadingIndicator />
				)}
			</div>
		</div>
	);
}
