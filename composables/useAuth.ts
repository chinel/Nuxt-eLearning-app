import { ref, computed } from "vue";
import { useSupabase } from "./useSupabase";
import type { User } from "@supabase/supabase-js";

export const useAuth = () => {
  const { supabase } = useSupabase();
  const user = ref<User | null>(null);

  supabase.auth.onAuthStateChange((event, session) => {
    user.value = session?.user ?? null;
  });

  const isAuthenticated = computed(() => user.value !== null);

  return { user, isAuthenticated };
};
