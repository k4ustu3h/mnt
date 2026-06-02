export default function ListItem({ children }) {
	return (
		<div
			slot="items"
			style={{
				background: "var(--m3e-list-item-container-color)",
				borderRadius: "var(--m3e-list-item-container-shape)",
				boxSizing: "border-box",
				display: "flex",
				flexDirection: "column",
				padding: 16,
				width: "100%",
			}}
		>
			{children}
		</div>
	);
}
