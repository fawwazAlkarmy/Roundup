import { SUPABASE_URL, SUPABASE_API_KEY } from "react-native-dotenv";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

export default supabase;
