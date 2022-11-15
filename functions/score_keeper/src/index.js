const sdk = require("node-appwrite");

/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

module.exports = async function (req, res) {
  const moveData = JSON.parse(
    req?.variables?.APPWRITE_FUNCTION_EVENT_DATA || {}
  );

  console.log("moveData", moveData);
  const { game_id } = moveData;

  if (!game_id) {
    res.json({
      moveData,
      result: "Missing Game Id",
    });
  }

  const client = new sdk.Client();
  const database = new sdk.Databases(client);

  let result = "Failed";
  if (
    !req.variables["APPWRITE_FUNCTION_ENDPOINT"] ||
    !req.variables["APPWRITE_FUNCTION_PROJECT_ID"] ||
    !req.variables["APPWRITE_FUNCTION_API_KEY"]
  ) {
    console.warn("Environment variables are not set. Please add in console.");
  } else {
    client
      .setEndpoint(req.variables["APPWRITE_FUNCTION_ENDPOINT"])
      .setProject(req.variables["APPWRITE_FUNCTION_PROJECT_ID"])
      .setKey(req.variables["APPWRITE_FUNCTION_API_KEY"])
      .setSelfSigned(true);

    //Calculate amount of good and evil moves.
    const good = await database.listDocuments("appwrite-realtime-db", "moves", [
      sdk.Query.equal("game_id", game_id),
      sdk.Query.equal("good", true),
    ]);
    const evil = await database.listDocuments("appwrite-realtime-db", "moves", [
      sdk.Query.equal("game_id", game_id),
      sdk.Query.equal("good", false),
    ]);

    result = await database.updateDocument(
      "appwrite-realtime-db",
      "games",
      game_id,
      {
        good: good?.total || 0,
        evil: evil?.total || 0,
      }
    );
  }

  res.json({
    moveData,
    result,
  });
};
