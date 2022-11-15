import { getGame } from "@/utils/appwrite.databases.server";

export default async function Head({ params }: { params: { $id: string } }) {
  try {
    const game = await getGame(params.$id);
    return (
      <>
        <title>{game?.name}</title>
      </>
    );
  } catch (error) {
    console.error(error);
    return (
      <>
        <title>Game Missing</title>
      </>
    );
  }
}
