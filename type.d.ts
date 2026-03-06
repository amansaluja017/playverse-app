import { Connection } from "mongoose";
import { MongoClient } from "mongodb";

declare global {
  var mongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  },
  // var globalWithMongo: {
  //   _mongoClientPromise: Promise<MongoClient> | undefined; 
  // }
}

export {}