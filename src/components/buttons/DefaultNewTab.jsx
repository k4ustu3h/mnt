import { M3eButton } from "@m3e/react/button";
import { Tab } from "@nine-thirty-five/material-symbols-react/rounded";

export default function DefaultNewTab() {
	const openDefaultNewTab = () => {
		const defaultNTUrl = "chrome://new-tab-page/";

		if (window.chrome && window.chrome.tabs) {
			window.chrome.tabs.create({ url: defaultNTUrl });
		}
	};

	return (
		<M3eButton onClick={openDefaultNewTab} shape="square" variant="filled">
			<Tab slot="icon" />
			Open Default New Tab
		</M3eButton>
	);
}
