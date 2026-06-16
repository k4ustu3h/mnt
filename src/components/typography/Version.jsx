import { useEffect, useState } from "react";

import { M3eHeading } from "@m3e/react/heading";

export default function Version() {
	const [version, setVersion] = useState(() => {
		if (
			window.location.hostname === "localhost" ||
			window.location.hostname === "127.0.0.1"
		) {
			return "Dev Build";
		}

		if (typeof chrome !== "undefined" && chrome.runtime?.getManifest) {
			return chrome.runtime.getManifest().version;
		}

		return "";
	});

	useEffect(() => {
		if (version) return;

		fetch("/manifest.json")
			.then((res) => res.json())
			.then((data) => setVersion(data.version))
			.catch(() => setVersion("Unknown"));
	}, [version]);

	return (
		<M3eHeading
			style={{
				color: "var(--md-sys-color-on-surface-variant)",
				textAlign: "center",
			}}
			size="medium"
			variant="label"
		>
			{version === "Dev Build" ? "Dev Build" : `Version ${version}`}
		</M3eHeading>
	);
}
