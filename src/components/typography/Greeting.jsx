import { M3eHeading } from "@m3e/react/heading";

export default function Greeting() {
	const hour = new Date().getHours();

	let greeting = "Good Evening, User!";
	if (hour >= 6 && hour < 12) {
		greeting = "Good Morning, User!";
	} else if (hour >= 12 && hour < 18) {
		greeting = "Good Afternoon, User!";
	}

	return (
		<M3eHeading
			size="large"
			style={{ color: "var(--md-sys-color-primary)", fontWeight: 800 }}
			variant="display"
		>
			{greeting}
		</M3eHeading>
	);
}
