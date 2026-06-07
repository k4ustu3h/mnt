import {
	M3eActionList,
	M3eExpandableListItem,
	M3eListAction,
} from "@m3e/react/list";

import {
	Person,
	Widgets,
} from "@nine-thirty-five/material-symbols-react/rounded";

import ListItem from "@/components/lists/ListItem";
import UsernameField from "@/components/textfields/UsernameField";
import WidgetSwitch from "@/components/switches/WidgetSwitch";

export default function SettingsList({
	setShowGreeting,
	setShowScallop,
	setShowWeather,
	showGreeting,
	showScallop,
	showWeather,
}) {
	return (
		<M3eActionList variant="segmented">
			<M3eExpandableListItem>
				<Person color="var(--md-sys-color-on-surface)" slot="leading" />
				User
				<div slot="items">
					<M3eListAction>
						<WidgetSwitch
							checked={showGreeting}
							label="Greeting"
							onChange={setShowGreeting}
						/>
					</M3eListAction>
					<ListItem>
						<UsernameField disabled={!showGreeting} />
					</ListItem>
				</div>
			</M3eExpandableListItem>
			<M3eExpandableListItem>
				<Widgets
					color="var(--md-sys-color-on-surface)"
					slot="leading"
				/>
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
		</M3eActionList>
	);
}
