"use client";

import { useKeyPress } from "@/hooks/useKeyPress";
import {
  createMove,
  Game,
  getGame,
  subscribeGame,
} from "@/utils/appwrite.databases.server";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { $id: string } }) {
  const [game, setGame] = useState<null | Game>(null);
  const good: boolean = useKeyPress("ArrowLeft");
  const evil: boolean = useKeyPress("ArrowRight");

  useEffect(() => {
    let unsubscribe: any;
    (async () => {
      try {
        console.log(params?.$id);
        if (params?.$id) {
          // Get initial game detail
          setGame(await getGame(params.$id));

          //setup subscription
          unsubscribe = subscribeGame(params.$id, (game) => {
            setGame(game);
          });
        }
      } catch (error) {
        console.error(error);
      }
    })();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [params]);

  useEffect(() => {
    (async () => {
      try {
        if (game?.$id && good) {
          createMove(true, game?.$id);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [game?.$id, good]);

  useEffect(() => {
    (async () => {
      try {
        if (game?.$id && evil) {
          createMove(false, game?.$id);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [game?.$id, evil]);

  return (
    <div className="flex justify-center p-8">
      <div className="flex-col">
        <h1 className="text-2xl font-bold">
          Game: {game ? game?.name : `Loading...`}
        </h1>
        <div className="grid grid-cols-2">
          <div className="grid grid-rows-2">
            <p className="text-2xl font-bold">Good: {game?.good}</p>
            <p className="text-8xl">{good && "🦸"}</p>
          </div>
          <div className="grid grid-rows-2">
            <div className="text-2xl font-bold">Evil: {game?.evil}</div>
            <p className="text-8xl">{evil && "😈"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
