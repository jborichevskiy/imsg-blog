import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://fzuptiqapwizenjjpwca.supabase.co",
  // SECRET KEY
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6dXB0aXFhcHdpemVuampwd2NhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3MTAwMzgzMSwiZXhwIjoxOTg2NTc5ODMxfQ.KOguLN8awgi23zXPmSUyKTGs7_y2RKUr6Cbt9f_eqjU"
);

export default async function handler(req, res) {
  console.log(req.query);
  if (!req.query.author) {
    return res.status(400).json({ error: "Missing author" });
  }

  // req.query.format = rss, json

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("author", req.query.author)
    .order("created_at", { ascending: false })
    .limit(100);

  return res.status(200).json(data);
}
