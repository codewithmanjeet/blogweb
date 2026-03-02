import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vqfmgytttdweffgmhkwp.supabase.co";
const supabaseKey = "sb_publishable_QDCYC8fEO06Lpof-YhU5tg_-FOWNfsh";

export const supabaseReview = createClient(
  supabaseUrl,
  supabaseKey
);