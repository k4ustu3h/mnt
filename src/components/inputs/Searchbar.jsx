import { Search } from "@nine-thirty-five/material-symbols-react/rounded";

import { M3eSearchBar } from "@m3e/react/search";

import useSearch from "@/hooks/context/useSearch";

export default function Searchbar() {
	const { currentProvider } = useSearch();

	return (
		<form action={currentProvider.url} method="GET">
			<M3eSearchBar clearable style={{ width: "50vw" }}>
				<Search slot="leading" />
				<input
					slot="input"
					placeholder="Search"
					type="text"
					name={currentProvider.queryParam}
					required
				/>
			</M3eSearchBar>
		</form>
	);
}
