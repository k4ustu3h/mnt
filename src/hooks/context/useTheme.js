import { createContext, useContext } from "react";

export const ThemeContextObj = createContext(null);

export default function useTheme() {
	return useContext(ThemeContextObj);
}
