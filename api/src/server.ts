import App  from './app';

const app = new App();
const port: string | number = process.env.PORT || 3001;
app.startServer(port);