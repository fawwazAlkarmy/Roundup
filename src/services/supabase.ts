import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
const SUPABASE_API_KEY = process.env.EXPO_PUBLIC_SUPABASE_API_KEY || "";

if (!SUPABASE_URL || !SUPABASE_API_KEY) {
  throw new Error("Supabase URL or API key is missing.");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
