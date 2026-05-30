import { M3eTheme } from "@m3e/react/theme";

import Greeting from "@/components/typography/Greeting";

export default function App() {
	return (
		<M3eTheme>
			<div
				style={{
					alignItems: "center",
					display: "flex",
					flexDirection: "column",
					height: "100%",
					justifyContent: "center",
				}}
			>
				<Greeting />
			</div>
		</M3eTheme>
	);
}
