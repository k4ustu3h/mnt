import { M3eExpandableListItem, M3eListItem } from "@m3e/react/list";

import { Palette } from "@nine-thirty-five/material-symbols-react/rounded";

import IconShapes from "@/components/surfaces/IconShapes";
import ListItem from "@/components/lists/ListItem";
import ThemeModes from "@/components/buttons/ThemeModes";

export default function AppearanceItem() {
	return (
		<M3eExpandableListItem>
			<Palette
				color="var(--md-sys-color-on-surface)"
				size={24}
				slot="leading"
			/>
			Appearance
			<div slot="items">
				<M3eListItem>
					<span
						style={{
							fontSize: ".9em",
							paddingBlockEnd: 8,
							paddingInlineStart: 12,
						}}
					>
						Theme modes
					</span>
					<ThemeModes />
				</M3eListItem>
				<ListItem>
					<span
						style={{
							fontSize: ".9em",
							paddingBlockEnd: 8,
							paddingInlineStart: 12,
						}}
					>
						Icon Shape
					</span>
					<IconShapes />
				</ListItem>
			</div>
		</M3eExpandableListItem>
	);
}
