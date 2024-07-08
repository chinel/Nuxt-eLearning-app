import { ref, computed } from "vue";
import { useSupabase } from "./supabase";

export const useAuth = () => {
  const { supabase } = useSupabase();
  const user = ref(null);

  supabase.auth.onAuthStateChange((event, session) => {
    user.value = session?.user ?? null;
  });

  const isAuthenticated = computed(() => user.value !== null);

  return { user, isAuthenticated };
};
