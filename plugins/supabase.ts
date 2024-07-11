import { createClient } from "@supabase/supabase-js";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const supabaseUrl = config.public.supabaseUrl;
  const supabaseKey = config.public.supabaseKey;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("supabaseUrl and supabaseKey are required.");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Provide supabase to the app
  nuxtApp.provide("supabase", supabase);
});
