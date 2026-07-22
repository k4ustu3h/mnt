import { M3eCard } from "@m3e/react/card";
import { M3eContentPane } from "@m3e/react/content-pane";
import { M3eHeading } from "@m3e/react/heading";

export default function APODExplanation({ explanation, title, open }) {
	if (!open) return null;

	return (
		<M3eCard
			style={{
				bottom: "calc(100% + 12px)",
				maxWidth: "90vw",
				position: "absolute",
				width: "50vw",
				zIndex: 50,
			}}
			variant="elevated"
		>
			<M3eHeading
				size="large"
				slot="header"
				style={{ paddingBottom: 16 }}
				variant="title"
			>
				{title || "About this image"}
			</M3eHeading>
			<M3eContentPane slot="content">
				<p
					style={{
						margin: 0,
						maxHeight: "32vh",
					}}
				>
					{explanation}
				</p>
			</M3eContentPane>
		</M3eCard>
	);
}
