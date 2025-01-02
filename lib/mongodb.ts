// lib/mongodb.ts

import { MongoClient } from "mongodb";

if (!process.env.MONGO_DB_URL) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

const uri = process.env.MONGO_DB_URL; // MongoDB connection string

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // Allow global variables in Node.js to persist across modules
  // This prevents TypeScript errors during development
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new client for each request
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
