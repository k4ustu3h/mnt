import { M3eExpandableListItem, M3eListAction } from "@m3e/react/list";

import { Person } from "@nine-thirty-five/material-symbols-react/rounded";

import useSettings from "@/hooks/useSettings";

import ListItem from "@/components/lists/ListItem";
import UsernameField from "@/components/textfields/UsernameField";
import WidgetSwitch from "@/components/switches/WidgetSwitch";

export default function UserItem() {
	const { showGreeting, setShowGreeting } = useSettings();

	return (
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
	);
}
