import { M3eHeading } from "@m3e/react/heading";
import { M3eShape } from "@m3e/react/shape";

import useBreakpoint from "@/hooks/useBreakpoint";
import useWeather from "@/hooks/useWeather";

import { weatherDimensions } from "@/styles/dimensions";

export default function Weather() {
	const { temperature, label, iconSrc } = useWeather();
	const breakpoint = useBreakpoint();

	const {
		containerSize,
		fontSize,
		iconSize,
		padding,
		paddingLeft,
		paddingTop,
	} = weatherDimensions[breakpoint];

	return (
		<div>
			<div
				style={{
					flexShrink: 0,
					height: containerSize,
					position: "relative",
					width: containerSize,
				}}
			>
				<M3eShape
					name="pill"
					style={{
						"--m3e-shape-container-color":
							"var(--md-sys-color-surface)",
						height: "100%",
						position: "absolute",
						width: "100%",
					}}
				/>

				<div
					style={{
						display: "flex",
						flexDirection: "column",
						inset: 0,
						justifyContent: "center",
						padding: padding,
						position: "absolute",
					}}
				>
					<M3eHeading
						size="large"
						style={{
							color: "var(--md-sys-color-primary)",
							fontSize: fontSize,
							fontVariationSettings: '"ROND" 100',
							fontWeight: 500,
							letterSpacing: "-0.02em",
							paddingLeft: paddingLeft,
							paddingTop: paddingTop,
							textAlign: "center",
						}}
						variant="display"
					>
						{temperature}°
					</M3eHeading>

					<div
						style={{
							height: iconSize,
							width: iconSize,
						}}
					>
						<img
							alt={label}
							src={iconSrc}
							style={{
								width: "100%",
								height: "100%",
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
