import { Client, Databases, ID, RealtimeResponseEvent } from "appwrite";
import { config } from "@/config/appwrite";
import type { Models } from "appwrite";

// Init SDK
const client = new Client();
const db = new Databases(client);

client
  .setEndpoint(config.endpoint) // Your API Endpoint
  .setProject(config.projectId); // Your project ID
export const databases = db;
export interface Game extends Models.Document {
  name: string;
  good: number;
  evil: number;
}

export const createGame = (name: string) => {
  return databases.createDocument(
    "appwrite-realtime-db",
    "games",
    ID.unique(),
    { name }
  );
};

export const getGame = ($id: string) => {
  return databases.getDocument(
    "appwrite-realtime-db",
    "games",
    $id
  ) as Promise<Game>;
};

export const subscribeGame = (
  $id: string,
  cb: (value: Game) => void | PromiseLike<void>
) => {
  return client.subscribe(
    `databases.appwrite-realtime-db.collections.games.documents.${$id}`,
    (response) => {
      cb(response.payload as Game);
    }
  );
};

export interface Move extends Models.Document {
  good: boolean;
  game_id: string;
}

export const createMove = (good: boolean, game_id: string) => {
  return databases.createDocument(
    "appwrite-realtime-db",
    "moves",
    ID.unique(),
    { good, game_id }
  );
};

export const subscribeGameMoves = (
  $id: string,
  cb: (value: Move) => void | PromiseLike<void>
) => {
  console.log("sub");
  return client.subscribe(
    `databases.appwrite-realtime-db.collections.moves.documents`,
    (response) => {
      const move = response.payload as Move;
      if (move.game_id === $id) {
        cb(move);
      }
    }
  );
};
