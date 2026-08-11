import { M3eButton } from "@m3e/react/button";
import { M3eButtonGroup } from "@m3e/react/button-group";
import { M3eHeading } from "@m3e/react/heading";
import { M3eLinearProgressIndicator } from "@m3e/react/progress-indicator";

import SiGithub from "@icons-pack/react-simple-icons/icons/SiGithub";
import SiGithubsponsors from "@icons-pack/react-simple-icons/icons/SiGithubsponsors";

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
					fontVariationSettings: `"ROND" 100, "wdth" 150, "wght" 900`,
					textAlign: "center",
				}}
				variant="display"
			>
				Material New Tab
			</M3eHeading>
			<div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
				<M3eButtonGroup variant="connected">
					<M3eButton
						href="https://github.com/k4ustu3h/mnt"
						variant="tonal"
					>
						<SiGithub slot="icon" />
						GitHub
					</M3eButton>
					<M3eButton
						href="https://materialnewtab.vercel.app/"
						variant="tonal"
					>
						<Language slot="icon" />
						Website
					</M3eButton>
				</M3eButtonGroup>
				<M3eButton
					href="https://github.com/sponsors/k4ustu3h"
					variant="tonal"
				>
					<SiGithubsponsors slot="icon" />
					Sponsor on GitHub
				</M3eButton>
			</div>
		</div>
	);
}
