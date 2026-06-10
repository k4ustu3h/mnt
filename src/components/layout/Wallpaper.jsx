export default function Wallpaper({ animateZoom, bgUrl, children }) {
	return (
		<div
			style={{
				height: "100vh",
				overflow: "hidden",
				position: "relative",
				width: "100%",
			}}
		>
			<style
				dangerouslySetInnerHTML={{
					__html: `
                    @keyframes wallpaper-reveal {
                        100% { transform: scale(1.1); }
                        0% { transform: scale(1); }
                    }
                `,
				}}
			/>
			<div
				style={{
					animation: animateZoom
						? "wallpaper-reveal 1.2s var(--md-sys-motion-spring-default-effects) forwards"
						: "none",
					backgroundImage: `url(${bgUrl})`,
					backgroundPosition: "center",
					backgroundSize: "cover",
					height: "100%",
					left: 0,
					position: "absolute",
					top: 0,
					width: "100%",
					zIndex: 0,
				}}
			/>
			<div
				style={{
					height: "100%",
					position: "relative",
					width: "100%",
					zIndex: 1,
				}}
			>
				{children}
			</div>
		</div>
	);
}
