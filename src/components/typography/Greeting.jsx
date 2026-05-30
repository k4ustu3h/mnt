import { useState } from "react";

import { M3eHeading } from "@m3e/react/heading";

export default function Greeting() {
	const [name, setName] = useState(() => {
		return localStorage.getItem("newTabUserName") || "User";
	});
	const [isEditing, setIsEditing] = useState(false);

	const hour = new Date().getHours();
	let timeGreeting = "Good Evening,";
	if (hour >= 6 && hour < 12) {
		timeGreeting = "Good Morning,";
	} else if (hour >= 12 && hour < 18) {
		timeGreeting = "Good Afternoon,";
	}

	const handleNameSubmit = (e) => {
		if (e.key === "Enter") {
			localStorage.setItem("newTabUserName", name);
			setIsEditing(false);
		}
	};

	return (
		<div
			style={{
				alignItems: "center",
				display: "flex",
				gap: 8,
			}}
		>
			<M3eHeading
				size="large"
				style={{
					color: "var(--md-sys-color-primary)",
					fontWeight: 800,
				}}
				variant="display"
			>
				{timeGreeting}
			</M3eHeading>

			{isEditing ? (
				<input
					autoFocus
					onBlur={() => setIsEditing(false)}
					onChange={(e) => setName(e.target.value)}
					onKeyDown={handleNameSubmit}
					value={name}
					style={{
						background: "transparent",
						border: "none",
						borderBottom: "4px solid var(--md-sys-color-primary)",
						color: "var(--md-sys-color-primary)",
						fontFamily: "inherit",
						fontSize: 57,
						fontWeight: 800,
						outline: "none",
						width: 250,
					}}
				/>
			) : (
				<M3eHeading
					onClick={() => setIsEditing(true)}
					size="large"
					style={{
						color: "var(--md-sys-color-primary)",
						cursor: "pointer",
						fontWeight: 800,
						textDecoration: "underline transparent",
						transition: "text-decoration 0.2s",
					}}
					title="Click to change name"
					variant="display"
				>
					{name}!
				</M3eHeading>
			)}
		</div>
	);
}
