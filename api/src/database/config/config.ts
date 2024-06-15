import mongoose from 'mongoose';
import * as dotenv from "dotenv";
dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;
const DB_PASS = process.env.DB_PASS;
const DB_COLLECTION = process.env.DB_COLLECTION;

if (!DB_USER || !DB_HOST || !DB_PASS || !DB_COLLECTION) {
  throw new Error("Please define the DB_USER, DB_NAME, DB_HOST, and DB_PASS environment variables inside .env file");
}

const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_COLLECTION}`;

mongoose.connect(uri);
let db = mongoose.connection;
export default db;
