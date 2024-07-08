import { createClient } from "@supabase/supabase-js";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const supabaseUrl = config.public.supabaseUrl;
  const supabaseKey = config.public.supabaseKey;

  console.log("Runtime config", config); // Log the runtime config

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("supabaseUrl and supabaseKey are required.");
  }

  console.log("supabaseUrl", supabaseUrl); // Log the supabaseUrl
  console.log("supabaseKey", supabaseKey); // Log the supabaseKey

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Provide supabase to the app
  nuxtApp.provide("supabase", supabase);
});
