import { M3eHeading } from "@m3e/react/heading";
import { M3eShape } from "@m3e/react/shape";

import weatherIcon from "@/assets/icons/weather/dark/mostly_sunny.svg";

export default function Weather({ temperature = 38 }) {
	return (
		<div>
			<div
				style={{
					height: 220,
					position: "relative",
					width: 220,
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
						padding: 24,
						position: "absolute",
					}}
				>
					<M3eHeading
						size="large"
						style={{
							color: "var(--md-sys-color-primary)",
							fontSize: 88,
							fontVariationSettings: '"ROND" 100',
							fontWeight: 500,
							letterSpacing: "-0.02em",
							paddingLeft: 38,
							paddingTop: 16,
							textAlign: "center",
						}}
						variant="display"
					>
						{temperature}°
					</M3eHeading>

					<div
						style={{
							height: 78,
							position: "relative",
							width: 78,
						}}
					>
						<img
							alt="Mostly Sunny"
							src={weatherIcon}
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
