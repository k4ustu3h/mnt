import { createContext, useContext } from "react";

export const WidgetContextObj = createContext(null);

export default function useWidget() {
	return useContext(WidgetContextObj);
}
