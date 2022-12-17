import { createClient } from "@supabase/supabase-js";
import { writeFile } from "fs/promises";
// import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const supabase = createClient(
  "https://fzuptiqapwizenjjpwca.supabase.co",
  // SECRET KEY
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6dXB0aXFhcHdpemVuampwd2NhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3MTAwMzgzMSwiZXhwIjoxOTg2NTc5ODMxfQ.KOguLN8awgi23zXPmSUyKTGs7_y2RKUr6Cbt9f_eqjU"
);

export default async function handler(req, res) {
  console.log(req.body);

  const combined = req.body.output.segments.map((element) => {
    console.log(element);
    return element.text;
  });

  console.log({ combined });

  const transcript = combined.join(" ");

  const { data, error } = await supabase
    .from("posts")
    .update({
      data: transcript,
    })
    .eq("transcriptionId", req.body.id);

  console.log({ data });
  console.log({ error });

//   const ffmpeg = createFFmpeg({ log: true });

//   (async () => {
//     const ffmpeg = createFFmpeg({
//         corePath: new URL('static/js/ffmpeg-core.js', document.location).href,
//       });

//     // ffmpeg.writeFile(), "test.wav", file);
//     // ffmpeg.FS("writeFile", "test.avi", await fetchFile("./test.avi"));
//     // await ffmpeg.run("-i", "test.avi", "test.mp4");
//     // // await fs.promises.writeFile(
//     // //   "./test.mp4",
//     // //   ffmpeg.FS("readFile", "test.mp4")
//     // );
//     process.exit(0);
//   })();

  return res.status(200).json({});
}
