import SettingsContext from "@/contexts/SettingsContext";

import AppBar from "@/components/surfaces/AppBar";
import Drawer from "@/components/surfaces/Drawer";
import ThemeWrapper from "@/components/theme/ThemeWrapper";
import Widgets from "@/components/layout/Widgets";

export default function App() {
	return (
		<SettingsContext>
			<ThemeWrapper>
				<Drawer>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							height: "100%",
							width: "100%",
						}}
					>
						<AppBar />
						<Widgets />
					</div>
				</Drawer>
			</ThemeWrapper>
		</SettingsContext>
	);
}
