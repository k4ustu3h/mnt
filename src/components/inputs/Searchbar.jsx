import { Search } from "@nine-thirty-five/material-symbols-react/rounded";

import SiDuckduckgo from "@icons-pack/react-simple-icons/icons/SiDuckduckgo";
import SiGoogle from "@icons-pack/react-simple-icons/icons/SiGoogle";
import SiWikipedia from "@icons-pack/react-simple-icons/icons/SiWikipedia";
import SiYoutube from "@icons-pack/react-simple-icons/icons/SiYoutube";

import { M3eSearchBar } from "@m3e/react/search";

import useSearch from "@/hooks/context/useSearch";

import Bing from "@/assets/icons/search/Bing";

const SEARCH_ICONS = {
	bing: Bing,
	duckduckgo: SiDuckduckgo,
	google: SiGoogle,
	wikipedia: SiWikipedia,
	youtube: SiYoutube,
};

export default function Searchbar() {
	const { currentProvider, searchProvider } = useSearch();

	const ProviderIcon = SEARCH_ICONS[searchProvider] || Search;

	return (
		<form action={currentProvider.url} method="GET">
			<M3eSearchBar clearable style={{ width: "50vw" }}>
				<ProviderIcon slot="leading" />
				<input
					slot="input"
					placeholder={`Search ${currentProvider.name}`}
					type="text"
					name={currentProvider.queryParam}
					required
				/>
			</M3eSearchBar>
		</form>
	);
}
