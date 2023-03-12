import { createClient } from "@supabase/supabase-js";
const convert = require("heic-convert");
import {promisify} from 'util';

import fs from "fs";
import { pipeline } from "stream/promises";

const pinataSDK = require("@pinata/sdk");

const supabase = createClient(
  process.env.NEXT_PUBLIC_PCI_PHOTOS_SUPABSE_URL,
  process.env.PCI_PHOTOS_SUPABASE_SECRET_KEY
);

// {
//   "accountEmail": "jborichevskiy@gmail.com",
//   "content": "Test",
//   "is_outbound": false,
//   "status": "RECEIVED",
//   "error_code": null,
//   "error_message": null,
//   "message_handle": "52712",
//   "date_sent": "2023-03-11T06:41:31.682Z",
//   "date_updated": "2023-03-11T06:41:31.762Z",
//   "from_number": "+19168348267",
//   "number": "+19168348267",
//   "to_number": "+15185028191",
//   "was_downgraded": null,
//   "plan": "blue",
//   "media_url": "",
//   "message_type": "message",
//   "group_id": "",
//   "participants": [
//       "+19168348267"
//   ],
//   "send_style": ""
// }

export default async function handler(req, res) {
  const pinata = new pinataSDK({
    pinataApiKey: process.env.PINATA_API_KEY,
    pinataSecretApiKey: process.env.PINATA_SECRET_API_KEY,
  });

  const { data: authorData, error: authorError } = await supabase
    .from("authors")
    .upsert(
      {
        phone: req.body.number,
      },
      { onConflict: "phone" }
    )
    .select("*");

  // create stream from media_url
  const mediaResponse = await fetch(req.body.media_url);
  const stream = mediaResponse.body;

  const tempFilename = `/tmp/sendblue-${req.body.message_handle}.jpeg`;

  // write to temp folder
  const writeStream = fs.createWriteStream(
    tempFilename,
    {
      autoClose: true,
      flags: "w",
    }
  );

  await pipeline(stream, writeStream);

  // TypeError: input buffer is not a HEIC image

  // const outputBuffer = await convert({
  //   buffer: await promisify(fs.readFile)(tempFilename),
  //   format: "PNG", // output format
  // });
  // console.log(outputBuffer);

  // const outputBuffer = await promisify(fs.readFile)(tempFilename);
  const readBuffer = fs.createReadStream(tempFilename);

  // happens on server
  const ipfsResponse = await pinata.pinFileToIPFS(readBuffer, {
    pinataMetadata: {
      name: `sendblue-${req.body.message_handle}.jpeg`,
    },
  });

  //   // pinata.
  //   pinata.testAuthentication().then((result) => {
  //     //handle successful authentication here
  //     console.log(result);
  // }).catch((err) => {
  //     //handle error here
  //     console.log(err);
  // });

  const { data: postData, error: postError } = await supabase
    .from("posts")
    .insert({
      media_ipfs: ipfsResponse.IpfsHash,
      author: authorData[0].id,
      media_url: "req.body.media_url",
    });

  console.log({ postData, postError });

  // if first post, send back link

  return res.status(200).json({});
}
