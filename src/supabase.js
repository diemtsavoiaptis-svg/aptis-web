import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://neawswciwcbwaaosfgbg.supabase.co";
const supabaseKey = "sb_publishable_2BUecW1ohbwTX5uOHTfmfw_vjcNVpPq";
export const supabase = createClient(supabaseUrl, supabaseKey);

