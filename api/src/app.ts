import express from 'express';
import routes from './routes/routes';
import db from './database/config/config';
import cors from 'cors';
import path from 'path';
import http from 'http';
import { Server as Io } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

class App {
	public app: express.Application;
	public serverHttp: http.Server;
	private socketIo: Io;
	private db: any;
	private routes: any;

	constructor() {
		this.app = express();
		this.serverHttp = http.createServer(this.app);
		this.socketIo = new Io(this.serverHttp,
			{
				cors:
				{
					origin: '*'
				}
			}
		);
		this.db = db;
		this.routes = routes;

		this.initializeDataBase();
		this.setupMiddlewares();
		this.handleSocketConnection();
		this.setupRoutes();
	}

	private initializeDataBase(): void {
		try {
			db.once("open", () => {
				console.log("Connected to database");
			})
		} catch (error) {
			db.once("error", console.log.bind(console, "Connection Error!!", error));
		}
	}

	private setupMiddlewares(): void {
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	}

	private handleSocketConnection(): void {
    interface IRoomUsers {
        socketId: string;
        name: string;
        email: string;
        room: string;
    }
    const users: IRoomUsers[] = [];

    this.socketIo.on("connection", (socket) => {
        console.log(`New connection: ${socket.id}`);

        socket.on("join-room", (room, user) => {
            const userInRoom = { socketId: socket.id, ...user, room };
            users.push(userInRoom);
            socket.join(room);
            console.log(`Socket ${socket.id} joined room ${room}`);
            this.socketIo.to(room).emit("room-users", users.filter(u => u.room === room));
        });

        socket.on("new-message", (room, message) => {
            this.socketIo.to(room).emit("message", message);
            console.log(`New message in room ${room}:`, message);
        });

        socket.on("disconnect", () => {
            console.log(`Disconnect: ${socket.id}`);
            const index = users.findIndex(user => user.socketId === socket.id);
            if (index !== -1) {
                const [disconnectedUser] = users.splice(index, 1);
                this.socketIo.to(disconnectedUser.room).emit("room-users", users.filter(u => u.room === disconnectedUser.room));
            }
        });
    });
}


	private setupRoutes(): void {
		this.routes(this.app);
	}

	public startServer(port: string | number): void {
		this.serverHttp.listen(port, () => {
			console.log(`Server is running on port http://127.0.0.1:${port}`);
		})
	}
}

export default App;