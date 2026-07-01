import { M3eExpandableListItem, M3eListAction } from "@m3e/react/list";

import { Widgets } from "@nine-thirty-five/material-symbols-react/rounded";

import useWidget from "@/hooks/context/useWidget";

import WidgetSwitch from "@/components/switches/WidgetSwitch";

export default function WidgetsItem() {
	const { showScallop, setShowScallop, showWeather, setShowWeather } =
		useWidget();

	return (
		<M3eExpandableListItem>
			<Widgets size={24} slot="leading" />
			Widgets
			<div slot="items">
				<M3eListAction>
					<WidgetSwitch
						checked={showScallop}
						label="Clock Widget"
						onChange={setShowScallop}
					/>
				</M3eListAction>
				<M3eListAction>
					<WidgetSwitch
						checked={showWeather}
						label="Weather Widget"
						onChange={setShowWeather}
					/>
				</M3eListAction>
			</div>
		</M3eExpandableListItem>
	);
}
