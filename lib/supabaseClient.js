import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vqfmgytttdweffgmhkwp.supabase.co";
const supabaseAnonKey = "sb_publishable_QDCYC8fEO06Lpof-YhU5tg_-FOWNfsh";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);