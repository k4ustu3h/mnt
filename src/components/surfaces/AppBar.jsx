import { M3eAppBar } from "@m3e/react/app-bar";
import { M3eIconButton } from "@m3e/react/icon-button";
import { Settings } from "@nine-thirty-five/material-symbols-react/rounded";

export default function AppBar() {
	return (
		<M3eAppBar>
			<M3eIconButton slot="trailing">
				<Settings />
			</M3eIconButton>
		</M3eAppBar>
	);
}
