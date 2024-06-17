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

        this.socketIo.on('connection', socket => {
            console.log("New client connected", socket.id);

            socket.on("disconnect", () => {
                console.log("Client disconnected", socket.id);
            })

            socket.on("message", (message) => {
                this.socketIo.emit("message", message)
                console.log("New message received", message);
            })
        })

        this.initializeDataBase();
        this.setupMiddlewares();
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