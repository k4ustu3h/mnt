import { useState } from "react";

import { UIContextObj } from "@/hooks/context/useUI";

export default function UIContext({ children }) {
	const [isAppsOpen, setIsAppsOpen] = useState(false);

	const value = {
		isAppsOpen,
		setIsAppsOpen,
	};

	return (
		<UIContextObj.Provider value={value}>{children}</UIContextObj.Provider>
	);
}
