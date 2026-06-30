import { M3eButton } from "@m3e/react/button";

import { Tab } from "@nine-thirty-five/material-symbols-react/rounded";

export default function DefaultNewTab() {
	const isFirefox = navigator.userAgent.includes("Firefox");

	if (isFirefox) return null;

	const openDefaultNewTab = () => {
		if (typeof chrome !== "undefined" && chrome.tabs) {
			chrome.tabs.update({ url: "chrome://new-tab-page/" });
		}
	};

	return (
		<M3eButton onClick={openDefaultNewTab} shape="square" variant="filled">
			<Tab size={24} slot="icon" />
			Open Default New Tab
		</M3eButton>
	);
}
