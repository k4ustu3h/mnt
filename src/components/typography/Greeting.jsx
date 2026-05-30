import { useEffect, useState } from "react";

import { M3eHeading } from "@m3e/react/heading";

export default function Greeting() {
	const [name, setName] = useState(() => {
		return localStorage.getItem("newTabUserName") || "User";
	});

	useEffect(() => {
		const handleNameChange = () => {
			setName(localStorage.getItem("newTabUserName") || "User");
		};

		window.addEventListener("userNameChanged", handleNameChange);
		return () =>
			window.removeEventListener("userNameChanged", handleNameChange);
	}, []);

	const hour = new Date().getHours();
	let timeGreeting = "Good Evening,";
	if (hour >= 6 && hour < 12) {
		timeGreeting = "Good Morning,";
	} else if (hour >= 12 && hour < 18) {
		timeGreeting = "Good Afternoon,";
	}

	return (
		<M3eHeading
			size="large"
			style={{
				color: "var(--md-sys-color-primary)",
				fontWeight: 800,
				textAlign: "center",
			}}
			variant="display"
		>
			{timeGreeting} {name}!
		</M3eHeading>
	);
}
