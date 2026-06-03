import { useEffect, useState } from "react";

import breakpoints from "@/styles/breakpoints.json";

export default function useBreakpoint() {
	const [breakpoint, setBreakpoint] = useState("xl");

	useEffect(() => {
		const queries = {
			xs: window.matchMedia(breakpoints.width.xs),
			sm: window.matchMedia(breakpoints.width.sm),
			md: window.matchMedia(breakpoints.width.md),
			lg: window.matchMedia(breakpoints.width.lg),
			xl: window.matchMedia(breakpoints.width.xl),
		};

		const updateBreakpoint = () => {
			if (queries.xs.matches) setBreakpoint("xs");
			else if (queries.sm.matches) setBreakpoint("sm");
			else if (queries.md.matches) setBreakpoint("md");
			else if (queries.lg.matches) setBreakpoint("lg");
			else if (queries.xl.matches) setBreakpoint("xl");
		};

		updateBreakpoint();

		Object.values(queries).forEach((q) =>
			q.addEventListener("change", updateBreakpoint),
		);

		return () => {
			Object.values(queries).forEach((q) =>
				q.removeEventListener("change", updateBreakpoint),
			);
		};
	}, []);

	return breakpoint;
}
