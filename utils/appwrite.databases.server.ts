import { Client, Databases, ID } from "appwrite";
import { config } from "@/config/appwrite";
import type { Models } from "appwrite";

// Init SDK
const client = new Client();
const db = new Databases(client);

client
  .setEndpoint(config.endpoint) // Your API Endpoint
  .setProject(config.projectId); // Your project ID
export const databases = db;

export const createGame = async (name: string) => {
  return databases.createDocument(
    "appwrite-realtime-db",
    "games",
    ID.unique(),
    { name }
  );
};

export interface Game extends Models.Document {
  name: string;
}

export const getGame = async ($id: string) => {
  return databases.getDocument(
    "appwrite-realtime-db",
    "games",
    $id
  ) as Promise<Game>;
};
