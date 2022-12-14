import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://fzuptiqapwizenjjpwca.supabase.co",
  // SECRET KEY
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6dXB0aXFhcHdpemVuampwd2NhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3MTAwMzgzMSwiZXhwIjoxOTg2NTc5ODMxfQ.KOguLN8awgi23zXPmSUyKTGs7_y2RKUr6Cbt9f_eqjU"
);

const useFeedRecent = (authorId) => {
  const [feed, setFeed] = useState(null);
  useEffect(() => {
    const fetchFeed = async (authorId) => {
      const { data, error } = await supabase
        .from("posts")
        .select('*')
        .eq("author", authorId)
        .order("created_at", { ascending: false })
        .limit(100);
      console.log({data})
      console.log({error})

      setFeed(data);
    };

    if (authorId) fetchFeed(authorId);
  }, [authorId]);

  return {feed}
};

export default useFeedRecent;