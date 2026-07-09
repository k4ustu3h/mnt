import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		proxy: {
			"/apod-proxy": {
				target: "https://apod.nasa.gov",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/apod-proxy/, ""),
			},
		},
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					if (id.includes("node_modules")) {
						if (id.includes("@m3e/react/")) {
							const pathParts = id
								.split("@m3e/react/")[1]
								.split("/");

							const rawName =
								pathParts[0] === "dist"
									? pathParts[1]
									: pathParts[0];

							const cleanName = rawName.split(".")[0];

							return `m3e-${cleanName}`;
						}

						if (
							id.includes(
								"@nine-thirty-five/material-symbols-react",
							)
						) {
							return "material-symbols-vendor";
						}
						if (id.includes("react")) return "react-vendor";
						if (id.includes("@icons-pack/react-simple-icons")) {
							return "simple-icons-vendor";
						}
						return "vendor";
					}
				},
			},
		},
	},
});
