import { Search } from "@nine-thirty-five/material-symbols-react/rounded";

import { M3eSearchBar } from "@m3e/react/search";

export default function Searchbar() {
	return (
		<form action="https://www.google.com/search" method="GET">
			<M3eSearchBar clearable style={{ width: "50vw" }}>
				<Search slot="leading" />
				<input
					slot="input"
					placeholder="Search"
					type="text"
					name="q"
					required
				/>
			</M3eSearchBar>
		</form>
	);
}
