import { createContext, useContext } from "react";

export const UIContextObj = createContext(null);

export default function useUI() {
	return useContext(UIContextObj);
}
