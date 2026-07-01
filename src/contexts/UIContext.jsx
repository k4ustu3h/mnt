import { useMemo, useState } from "react";

import { UIContextObj } from "@/hooks/context/useUI";

export default function UIContext({ children }) {
	const [isAppsOpen, setIsAppsOpen] = useState(false);

	const value = useMemo(
		() => ({
			isAppsOpen,
			setIsAppsOpen,
		}),
		[isAppsOpen],
	);

	return (
		<UIContextObj.Provider value={value}>{children}</UIContextObj.Provider>
	);
}
