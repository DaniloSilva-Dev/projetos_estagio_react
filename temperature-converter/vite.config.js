import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: "happy-dom",
		setupFiles: ["./src/setup-tests.js"],
		coverage: {
			include: ["src/**/*.{js,jsx}"],
			exclude: ["src/**/*.test.{js,jsx}", "src/main.jsx", "src/App.jsx"],
			provider: "v8",
		},
		server: {
			deps: {
				inline: [
					"@mui/material",
					"@emotion/react",
					"@emotion/styled",
					"react-trasition-group",
				],
			},
		},
	},
});
