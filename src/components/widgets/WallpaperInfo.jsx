import { M3eHeading } from "@m3e/react/heading";

import useWallpaperInfo from "@/hooks/useWallpaperInfo";

export default function WallpaperInfo() {
	const info = useWallpaperInfo();

	if (!info) return null;

	return (
		<a
			href={info.url}
			onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
			onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.6)}
			rel="noreferrer"
			style={{
				bottom: 24,
				color: "var(--md-sys-color-on-surface)",
				left: 24,
				opacity: 0.6,
				position: "absolute",
				textDecoration: "none",
				textShadow: "0px 1px 4px rgba(0,0,0,0.4)",
				transition: "opacity 0.2s ease",
				zIndex: 10,
			}}
			target="_blank"
		>
			<M3eHeading variant="label">Photo by {info.author}</M3eHeading>
		</a>
	);
}
