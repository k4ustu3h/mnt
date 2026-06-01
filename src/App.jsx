import { useEffect, useState } from "react";
import { M3eTheme } from "@m3e/react/theme";

import AppBar from "@/components/surfaces/AppBar";
import Drawer from "@/components/surfaces/Drawer";
import Greeting from "@/components/typography/Greeting";
import Scallop from "@/components/widgets/clocks/Scallop";
import Weather from "@/components/widgets/weather/Weather";

import { extractThemeColor } from "@/utils/monet";

export default function App() {
	const [bgUrl] = useState(() => `https://picsum.photos/1920/1080`);
	const [themeColor, setThemeColor] = useState("");

	useEffect(() => {
		let isMounted = true;

		extractThemeColor(bgUrl)
			.then((colorHex) => {
				if (isMounted) {
					setThemeColor(colorHex);
				}
			})
			.catch((err) => {
				console.error("Failed to extract theme color:", err);
			});

		return () => {
			isMounted = false;
		};
	}, [bgUrl]);

	return (
		<M3eTheme color={themeColor}>
			<div
				style={{
					backgroundImage: `url(${bgUrl})`,
					backgroundPosition: "center",
					backgroundSize: "cover",
					height: "100vh",
				}}
			>
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
						<div
							style={{
								alignItems: "center",
								display: "flex",
								flex: 1,
								flexDirection: "column",
								gap: 24,
								justifyContent: "center",
								padding: 24,
							}}
						>
							<Greeting />
							<div
								style={{
									display: "flex",
									gap: 24,
								}}
							>
								<Scallop />
								<Weather />
							</div>
						</div>
					</div>
				</Drawer>
			</div>
		</M3eTheme>
	);
}
