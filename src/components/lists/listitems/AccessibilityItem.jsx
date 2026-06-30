import { M3eExpandableListItem, M3eListItem } from "@m3e/react/list";

import { Accessibility } from "@nine-thirty-five/material-symbols-react/rounded";

import ContrastOptions from "@/components/buttons/ContrastOptions";

export default function AccessibilityItem() {
	return (
		<M3eExpandableListItem>
			<Accessibility size={24} slot="leading" />
			Accessibility
			<div slot="items">
				<M3eListItem>
					<span
						style={{
							fontSize: ".9em",
							paddingBlockEnd: 8,
							paddingInlineStart: 12,
						}}
					>
						Contrast
					</span>
					<ContrastOptions />
				</M3eListItem>
			</div>
		</M3eExpandableListItem>
	);
}
