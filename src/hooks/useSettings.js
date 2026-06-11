import { createContext, useContext } from "react";

export const SettingsContextObj = createContext(null);

export default function useSettings() {
	const context = useContext(SettingsContextObj);
	if (!context) {
		throw new Error(
			"useSettings must be used within a SettingsContext provider",
		);
	}
	return context;
}
