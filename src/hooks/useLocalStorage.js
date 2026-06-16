import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {
	const [value, setValue] = useState(() => {
		const saved = localStorage.getItem(key);
		return saved !== null ? JSON.parse(saved) : initialValue;
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	useEffect(() => {
		const handleStorageChange = (e) => {
			if (e.key === key && e.newValue !== null) {
				setValue(JSON.parse(e.newValue));
			}
		};

		window.addEventListener("storage", handleStorageChange);

		return () => {
			window.removeEventListener("storage", handleStorageChange);
		};
	}, [key]);

	return [value, setValue];
}
