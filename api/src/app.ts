import express from 'express';
import routes from './routes/routes';
import db from './database/config/config';
import cors from 'cors';

try {
    db.once("open", () => {
        console.log("Connected to database");
    })
} catch (error) {
    db.once("error", console.log.bind(console, "Connection Error!!", error));
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

export default app;