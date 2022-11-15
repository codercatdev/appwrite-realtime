"use client";

import { createGame } from "@/utils/appwrite.databases.server";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
export default function Page() {
  const [name, setName] = useState("");
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const create = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setSubmit(true);
      const game = await createGame(name);
      router.replace(`/game/${game.$id}`);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  return (
    <div className="flex justify-center p-8">
      <div className="flex-col">
        <h1 className="text-2xl font-bold">
          Welcome to the Appwrite Realtime Example!
        </h1>
        <p>
          In this example you will create a new game and share the link with
          your friends.
        </p>
        <div className="mt-4">
          <form onSubmit={create} className="flex justify-between p-2">
            <input
              type="text"
              placeholder="Game Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full max-w-xs input input-bordered input-primary"
            />

            <button className="btn" disabled={submit}>
              {submit ? `Creating...` : `Start Game`}
            </button>
          </form>
        </div>
        {error && (
          <div className="shadow-lg alert alert-error">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0 w-6 h-6 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Error! Task failed successfully.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
