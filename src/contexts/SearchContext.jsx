import { SearchContextObj } from "@/hooks/context/useSearch";
import useLocalStorage from "@/hooks/useLocalStorage";

import { SEARCH_PROVIDERS } from "@/data/searchProviders";

export default function SearchContext({ children }) {
	const [searchProvider, setSearchProvider] = useLocalStorage(
		"searchProvider",
		"google",
	);

	const normalizedKey = searchProvider?.toLowerCase() || "google";
	const currentProvider =
		SEARCH_PROVIDERS[normalizedKey] || SEARCH_PROVIDERS.google;

	const value = {
		currentProvider,
		providers: SEARCH_PROVIDERS,
		searchProvider,
		setSearchProvider,
	};

	return (
		<SearchContextObj.Provider value={value}>
			{children}
		</SearchContextObj.Provider>
	);
}
