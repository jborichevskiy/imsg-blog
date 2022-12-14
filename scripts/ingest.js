const sdk = require("matrix-bot-sdk");
const MatrixClient = sdk.MatrixClient;
const SimpleFsStorageProvider = sdk.SimpleFsStorageProvider;
const AutojoinRoomsMixin = sdk.AutojoinRoomsMixin;

const { createClient } = require("@supabase/supabase-js");

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://fzuptiqapwizenjjpwca.supabase.co",
  // SECRET KEY
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6dXB0aXFhcHdpemVuampwd2NhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3MTAwMzgzMSwiZXhwIjoxOTg2NTc5ODMxfQ.KOguLN8awgi23zXPmSUyKTGs7_y2RKUr6Cbt9f_eqjU"
);

const homeserverUrl = "http://matrix.notes.site";
const accessToken = "syt_aW1lc3NhZ2U_GMaKOmImYyBBzPttmYga_2vPBqE";

const storage = new SimpleFsStorageProvider("bot.json");
const client = new MatrixClient(homeserverUrl, accessToken, storage);

// AutojoinRoomsMixin.setupOnClient(client);

client.start().then(() => console.log("Client started!"));

client.on("room.message", async (roomId, event) => {
  console.log({event});
  
  // if (! event["content"]) return;
  const sender = event["sender"];
  const body = event["content"]["body"];
  console.log(`${roomId}: ${sender} says '${body}'`);

  const { data: authorData, error: authorError } = await supabase.from("authors").upsert({
    matrix: sender,
  }, {onConflict: "matrix"},).select('*');

  console.log({authorData})

  if (authorError) {
    console.log(authorError);
    return;
  }

  const { data, error } = await supabase.from("posts").insert({
    data: body,
    author: authorData[0].id,
    metadata: {
        source: "matrix"
    }
  });
});
