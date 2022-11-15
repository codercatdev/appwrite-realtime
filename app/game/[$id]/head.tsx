import { getGame } from "@/utils/appwrite.databases.server";

export default async function Head({ params }: { params: { $id: string } }) {
  const game = await getGame(params.$id);

  return (
    <>
      <title>{game?.name}</title>
    </>
  );
}
