import { M3eExpandableListItem, M3eListAction } from "@m3e/react/list";

import { Person } from "@nine-thirty-five/material-symbols-react/rounded";

import useWidget from "@/hooks/context/useWidget";

import ListItem from "@/components/lists/ListItem";
import UsernameField from "@/components/textfields/UsernameField";
import WidgetSwitch from "@/components/switches/WidgetSwitch";

export default function UserItem() {
	const { showGreeting, setShowGreeting } = useWidget();

	return (
		<M3eExpandableListItem>
			<Person size={24} slot="leading" />
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
