import { createContext, useContext } from "react";

export const SearchContextObj = createContext(null);

export default function useSearch() {
	return useContext(SearchContextObj);
}
