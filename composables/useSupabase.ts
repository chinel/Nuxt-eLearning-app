import { useNuxtApp } from "#app";
import { SupabaseClient } from "@supabase/supabase-js";

export const useSupabase = (): { supabase: SupabaseClient } => {
  const { $supabase } = useNuxtApp();
  return { supabase: $supabase as SupabaseClient };
};
