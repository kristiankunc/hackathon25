import { Server } from "socket.io";
import type { HttpServer } from "vite";

export function attachIoServer(server: HttpServer) {
	const io = new Server(server, {
		cors: {
			origin: "*"
		}
	});

	io.on("connection", (socket) => {
		console.log("a user connected");

		socket.on("message", (msg) => {
			console.log("message: " + msg);
			io.emit("message", msg);
		});

		socket.on("disconnect", () => {
			console.log("a user disconnected");
		});
	});

	return io;
}
