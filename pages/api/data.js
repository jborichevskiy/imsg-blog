import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_PCI_PHOTOS_SUPABSE_URL,
  process.env.PCI_PHOTOS_SUPABASE_SECRET_KEY
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
