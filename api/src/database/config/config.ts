
import { MongoClient, ServerApiVersion } from 'mongodb';
import * as dotenv from "dotenv";
dotenv.config();

const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;
const DB_PASS = process.env.DB_PASS;

const uri = `mongodb+srv://${DB_NAME}:${DB_PASS}@${DB_HOST}/?retryWrites=true&w=majority&appName=ixc-test-chat`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
