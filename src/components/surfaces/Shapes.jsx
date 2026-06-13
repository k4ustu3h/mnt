import { useState } from "react";

import { M3eCard } from "@m3e/react/card";
import { M3eShape } from "@m3e/react/shape";

const SHAPES = ["circle", "square", "4-sided-cookie", "7-sided-cookie", "arch"];

export default function Shapes() {
	const [selectedShape, setSelectedShape] = useState("square");
	const [isHovered, setIsHovered] = useState(false);

	return (
		<M3eCard>
			<div
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				style={{
					boxSizing: "border-box",
					display: "flex",
					gap: 16,
					height: 104,
					overflowX: "auto",
					paddingInline: 16,
					paddingTop: 20,
					scrollbarWidth: isHovered ? "thin" : "none",
				}}
			>
				{SHAPES.map((shapeName) => {
					const isSelected = selectedShape === shapeName;

					return (
						<div
							key={shapeName}
							onClick={() => setSelectedShape(shapeName)}
							style={{
								cursor: "pointer",
								flexShrink: 0,
								height: 64,
								position: "relative",
								width: 64,
							}}
						>
							<M3eShape
								name={isSelected ? "square" : "circle"}
								style={{
									"--m3e-shape-container-color": isSelected
										? "var(--md-sys-color-primary)"
										: "var(--md-sys-color-surface)",
									height: "100%",
									transition:
										"all var(--md-sys-motion-spring-fast-effects)",
									width: "100%",
								}}
							/>
							<M3eShape
								name={shapeName}
								style={{
									"--m3e-shape-container-color": isSelected
										? "var(--md-sys-color-on-primary)"
										: "var(--md-sys-color-primary)",
									left: "50%",
									position: "absolute",
									top: "50%",
									transform: "translate(-50%, -50%)",
									width: "50%",
								}}
							/>
						</div>
					);
				})}
			</div>
		</M3eCard>
	);
}
