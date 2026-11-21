import { M3eFormField } from "@m3e/react/form-field";
import { M3eOption } from "@m3e/react/option";
import { M3eSelect } from "@m3e/react/select";

import useSearch from "@/hooks/context/useSearch";

export default function SearchOptions({ disabled }) {
	const { providers, searchProvider, setSearchProvider } = useSearch();

	const handleChange = (e) => {
		if (e?.target?.value) {
			setSearchProvider(e.target.value);
		}
	};

	const isSelected = (key) =>
		searchProvider === key ||
		searchProvider?.toLowerCase() === key.toLowerCase();

	return (
		<M3eFormField
			style={{
				opacity: disabled ? 0.5 : 1,
				pointerEvents: disabled ? "none" : "auto",
			}}
		>
			<label slot="label" htmlFor="search-options">
				Search Options
			</label>
			<M3eSelect
				disabled={disabled}
				id="search-options"
				onChange={handleChange}
				value={searchProvider}
			>
				{Object.entries(providers).map(([key, provider]) => (
					<M3eOption key={key} selected={isSelected(key)} value={key}>
						{provider.name}
					</M3eOption>
				))}
			</M3eSelect>
		</M3eFormField>
	);
}
