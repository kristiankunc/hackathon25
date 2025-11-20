import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { attachIoServer } from "./src/ws-server";

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		{
			name: "ws-server",
			configureServer(vite) {
				if (vite.httpServer) {
					attachIoServer(vite.httpServer);
				} else {
					console.error("Vite HTTP server is not available.");
				}
			}
		}
	]
});
