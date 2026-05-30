import { useState } from "react";

import { M3eFormField } from "@m3e/react/form-field";

export default function UsernameField() {
	const [name, setName] = useState(() => {
		return localStorage.getItem("newTabUserName") || "User";
	});

	const handleNameChange = (e) => {
		const newName = e.target.value;
		setName(newName);

		localStorage.setItem("newTabUserName", newName);

		window.dispatchEvent(new Event("userNameChanged"));
	};

	return (
		<M3eFormField
			style={{
				width: "100%",
			}}
			variant="outlined"
		>
			<label for="username" slot="label">
				Display Name
			</label>
			<input
				id="username"
				onChange={handleNameChange}
				placeholder="Enter your name"
				value={name}
			/>
		</M3eFormField>
	);
}
