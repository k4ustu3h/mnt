import { useEffect } from "react";

import { M3eSnackbar } from "@m3e/react/snackbar";

import SettingsContext from "@/contexts/SettingsContext";

import AppBar from "@/components/surfaces/AppBar";
import Drawer from "@/components/surfaces/Drawer";
import ThemeWrapper from "@/components/theme/ThemeWrapper";
import Widgets from "@/components/layout/Widgets";

export default function App() {
	useEffect(() => {
		const handleError = (e) => {
			M3eSnackbar.open(e.detail);
		};

		window.addEventListener("MNTerror", handleError);
		return () => window.removeEventListener("MNTerror", handleError);
	}, []);

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
