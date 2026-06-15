import { useState } from "react";

import { M3eShape } from "@m3e/react/shape";
import { M3eHeading } from "@m3e/react/heading";

import useSettings from "@/hooks/useSettings";

export default function MonochromeIcon({ children, name, url }) {
	const { iconShape } = useSettings();
	const [isHovered, setIsHovered] = useState(false);

	const shapeSize = 52;

	return (
		<div
			style={{
				alignItems: "center",
				display: "flex",
				flexDirection: "column",
				gap: 4,
				textAlign: "center",
				width: "100%",
			}}
		>
			<M3eShape
				name={iconShape || "circle"}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				style={{
					height: shapeSize,
					transform: isHovered ? "scale(1.1)" : "scale(1)",
					transition:
						"transform var(--md-sys-motion-spring-fast-spatial)",
					width: shapeSize,
				}}
			>
				<a
					href={url}
					style={{
						alignItems: "center",
						backgroundColor: "var(--md-sys-color-surface-variant)",
						color: "var(--md-sys-color-on-surface-variant)",
						display: "flex",
						height: "100%",
						justifyContent: "center",
						textDecoration: "none",
						width: "100%",
					}}
				>
					{children}
				</a>
			</M3eShape>

			<M3eHeading
				size="small"
				variant="label"
				style={{
					color: "var(--md-sys-color-on-surface)",
					maxWidth: shapeSize,
					overflow: "hidden",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap",
				}}
			>
				{name}
			</M3eHeading>
		</div>
	);
}
