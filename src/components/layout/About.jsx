import { M3eButton } from "@m3e/react/button";
import { M3eButtonGroup } from "@m3e/react/button-group";
import { M3eHeading } from "@m3e/react/heading";
import { M3eLinearProgressIndicator } from "@m3e/react/progress-indicator";

import { SiGithub } from "@icons-pack/react-simple-icons";

import { Language } from "@nine-thirty-five/material-symbols-react/rounded";

export default function About() {
	return (
		<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
			<M3eLinearProgressIndicator
				buffer-value={20}
				mode="buffer"
				value={50}
				variant="wavy"
			/>
			<M3eHeading
				size="small"
				style={{
					color: "var(--md-sys-color-on-surface)",
					fontVariationSettings: `"ROND" 100, "wdth" 150, "wght" 900`,
					textAlign: "center",
				}}
				variant="display"
			>
				Material New Tab
			</M3eHeading>
			<M3eButtonGroup variant="connected">
				<M3eButton variant="tonal">
					<SiGithub slot="icon" />
					GitHub
				</M3eButton>
				<M3eButton variant="tonal">
					<Language slot="icon" />
					Website
				</M3eButton>
			</M3eButtonGroup>
		</div>
	);
}
