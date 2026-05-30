import { useEffect, useState } from "react";

import { M3eShape } from "@m3e/react/shape";

export default function Scallop() {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const timerId = setInterval(() => {
			setTime(new Date());
		}, 1000);
		return () => clearInterval(timerId);
	}, []);

	const minutesDegrees = time.getMinutes() * 6 + time.getSeconds() * 0.1;
	const hoursDegrees = (time.getHours() % 12) * 30 + time.getMinutes() * 0.5;
	const secondsDegrees = time.getSeconds() * 6;

	const abstractHandStyle = {
		borderRadius: "16px",
		bottom: "calc(50% - 9px)",
		left: "calc(50% - 9px)",
		position: "absolute",
		transformOrigin: "50% calc(100% - 9px)",
	};

	return (
		<div
			style={{
				alignItems: "center",
				display: "flex",
				height: "240px",
				justifyContent: "center",
				position: "relative",
				width: "240px",
			}}
		>
			<M3eShape
				name="12-sided-cookie"
				style={{
					"--m3e-shape-container-color":
						"var(--md-sys-color-surface)",
					height: "100%",
					position: "absolute",
					width: "100%",
				}}
			/>

			{/* The Clock Face Container */}
			<div
				style={{
					borderRadius: "50%",
					height: "80%",
					position: "relative",
					width: "80%",
				}}
			>
				{/* Hour Hand */}
				<div
					style={{
						...abstractHandStyle,
						background: "var(--md-sys-color-surface-variant)",
						backgroundColor: "var(--md-sys-color-surface-variant)",
						height: "38%",
						transform: `rotate(${hoursDegrees}deg)`,
						width: "18px",
					}}
				/>
				{/* Minute Hand */}
				<div
					style={{
						...abstractHandStyle,
						background: "var(--md-sys-color-primary)",
						backgroundColor: "var(--md-sys-color-primary)",
						height: "48%",
						transform: `rotate(${minutesDegrees}deg)`,
						width: "18px",
					}}
				/>

				{/* Second Hand Dot Container */}
				<div
					style={{
						height: "100%",
						left: 0,
						position: "absolute",
						top: 0,
						transform: `rotate(${secondsDegrees}deg)`,
						width: "100%",
					}}
				>
					{/* The Dot */}
					<div
						style={{
							backgroundColor: "var(--md-sys-color-tertiary)",
							borderRadius: "50%",
							height: "18px",
							left: "70%",
							position: "absolute",
							transform: "translateX(-50%)",
							width: "18px",
						}}
					/>
				</div>
			</div>
		</div>
	);
}
