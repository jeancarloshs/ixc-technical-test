import App  from './app';
import "./webSocket";

const app = new App();
const port: string | number = process.env.PORT || 3001;
app.startServer(port);