export default function Background({ bgUrl, children }) {
	return (
		<div
			style={{
				backgroundImage: `url(${bgUrl})`,
				backgroundPosition: "center",
				backgroundSize: "cover",
				height: "100vh",
				width: "100%",
			}}
		>
			{children}
		</div>
	);
}
