export default function getIconUrl(iconName, theme) {
	return new URL(
		`../assets/icons/weather/${theme}/${iconName}.svg`,
		import.meta.url,
	).href;
}
