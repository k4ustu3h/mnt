import { useEffect, useRef, useState } from "react";

import { M3eButton } from "@m3e/react/button";
import { M3eSplitButton } from "@m3e/react/split-button";
import { M3eTooltip } from "@m3e/react/tooltip";

import { KeyboardArrowUp } from "@nine-thirty-five/material-symbols-react/rounded";

import useWallpaperInfo from "@/hooks/useWallpaperInfo";
import useWallpaper from "@/hooks/context/useWallpaper";

import APODExplanation from "@/components/cards/APODExplanation";

export default function WallpaperInfo() {
	const info = useWallpaperInfo();
	const { wallpaperSource } = useWallpaper();
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef(null);

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target)
			) {
				setIsOpen(false);
			}
		}
		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, [isOpen]);

	if (!info) return null;

	return (
		<div
			ref={containerRef}
			style={{ position: "relative", display: "inline-flex" }}
		>
			<M3eSplitButton variant="outlined">
				<M3eButton
					href={info.url}
					rel="noreferrer"
					slot="leading-button"
					target="_blank"
				>
					Photo by {info.author}
				</M3eButton>
				{wallpaperSource === "apod" && (
					<M3eButton
						id="wallpaper-info-toggle"
						onClick={() =>
							wallpaperSource === "apod" && setIsOpen(!isOpen)
						}
						slot="trailing-button"
						variant="outlined"
					>
						<KeyboardArrowUp
							size={24}
							style={{
								transform: isOpen ? "rotate(180deg)" : "none",
								transition: "transform 0.2s ease",
							}}
						/>
					</M3eButton>
				)}
			</M3eSplitButton>
			<M3eTooltip for="wallpaper-info-toggle" position="above">
				View more info
			</M3eTooltip>
			{wallpaperSource === "apod" && (
				<APODExplanation
					explanation={info.explanation}
					title={info.title}
					open={isOpen}
					onClose={() => setIsOpen(false)}
				/>
			)}
		</div>
	);
}
