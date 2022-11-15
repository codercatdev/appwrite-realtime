"use client";

import { useKeyPress } from "@/hooks/useKeyPress";
import {
  createMove,
  Game,
  getGame,
  Move,
  subscribeGame,
  subscribeGameMoves,
} from "@/utils/appwrite.databases.server";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { $id: string } }) {
  const [game, setGame] = useState<null | Game>(null);
  const [moves, setMoves] = useState<Move[]>([]);

  const good: boolean = useKeyPress("ArrowLeft");
  const evil: boolean = useKeyPress("ArrowRight");

  useEffect(() => {
    let unsubscribes: any[] = [];
    if (params?.$id) {
      (async () => {
        try {
          // Get initial game detail
          setGame(await getGame(params.$id));

          // setup subscriptions
          const u1 = subscribeGame(params.$id, (game) => {
            setGame(game);
          });

          const u2 = subscribeGameMoves(params.$id, (move) => {
            setMoves((prevMoves) => [...prevMoves, move]);
          });
          unsubscribes = [u1, u2];
        } catch (error) {
          console.error(error);
        }
      })();
    }
    return () => {
      //Unsubscribe before destroying component
      if (unsubscribes.length) {
        for (const u of unsubscribes) {
          u();
        }
      }
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
    <>
      <div className="flex justify-center p-8">
        <div className="flex-col">
          <h1 className="text-2xl font-bold">
            Game: {game ? game?.name : `Loading...`}
          </h1>
          <h2>Are you Good ⬅️ or ➡️ Evil?</h2>
          <div className="grid grid-cols-2 mt-4 md:mt-10">
            <div className="grid grid-rows-2">
              <p className="text-2xl font-bold">Good: {game?.good}</p>
              <p className="text-8xl">{good && "🦸"}</p>
            </div>
            <div className="grid grid-rows-2">
              <div className="text-2xl font-bold">Evil: {game?.evil}</div>
              <p className="text-8xl">{evil && "😈"}</p>
            </div>
          </div>
          {/* The button to open modal */}
          <label htmlFor="my-modal" className="btn">
            Show Moves
          </label>
        </div>
      </div>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Good</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {moves.map((m) => (
                <tr key={m.$id}>
                  <th>{m.$id}</th>
                  <td>{m.good ? "Good" : "Evil"}</td>
                  <td>{m.$createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>{" "}
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
