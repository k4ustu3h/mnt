import { M3eTheme } from "@m3e/react/theme";

import Greeting from "@/components/typography/Greeting";

export default function App() {
	return (
		<M3eTheme>
			<div
				style={{
					backgroundImage: "url(https://picsum.photos/1920/1080)",
					display: "flex",
					flexDirection: "column",
					height: "100%",
				}}
			>
				<Greeting />
			</div>
		</M3eTheme>
	);
}
