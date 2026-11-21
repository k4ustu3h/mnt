import { M3eExpandableListItem, M3eListAction } from "@m3e/react/list";

import { Search } from "@nine-thirty-five/material-symbols-react/rounded";

import useWidget from "@/hooks/context/useWidget";

import ListItem from "@/components/lists/ListItem";
import WidgetSwitch from "@/components/switches/WidgetSwitch";
import SearchOptions from "@/components/select/SearchOptions";

export default function SearchItem() {
	const { showSearchbar, setShowSearchbar } = useWidget();

	return (
		<M3eExpandableListItem>
			<Search size={24} slot="leading" />
			Search
			<div slot="items">
				<M3eListAction>
					<WidgetSwitch
						checked={showSearchbar}
						label="Show Searchbar"
						onChange={setShowSearchbar}
					/>
				</M3eListAction>
				<ListItem>
					<SearchOptions />
				</ListItem>
			</div>
		</M3eExpandableListItem>
	);
}
