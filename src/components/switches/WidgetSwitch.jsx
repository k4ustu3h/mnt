import { M3eHeading } from "@m3e/react/heading";
import { M3eSwitch } from "@m3e/react/switch";

export default function WidgetSwitch({ checked, label, onChange }) {
	return (
		<div
			onClick={() => onChange(!checked)}
			style={{
				alignItems: "center",
				cursor: "pointer",
				display: "flex",
				justifyContent: "space-between",
				width: "100%",
			}}
		>
			<M3eHeading size="large" variant="label">
				{label}
			</M3eHeading>
			<div style={{ pointerEvents: "none" }}>
				<M3eSwitch checked={checked} selected={checked} />
			</div>
		</div>
	);
}
