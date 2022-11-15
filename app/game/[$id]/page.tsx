"use client";

import { Game, getGame } from "@/utils/appwrite.databases.server";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { $id: string } }) {
  const [game, setGame] = useState<null | Game>(null);

  useEffect(() => {
    (async () => {
      try {
        setGame(await getGame(params.$id));
      } catch (error) {
        console.error(error);
      }
    })();
  }, [params]);

  return (
    <div className="flex justify-center p-8">
      <div className="flex-col">
        <h1 className="text-2xl font-bold">
          Game: {game ? game?.name : `Loading...`}
        </h1>
      </div>
    </div>
  );
}
