import { ref, computed } from "vue";
import Cookies from "js-cookie";
import { useSupabase } from "./useSupabase";
import type { User } from "@supabase/supabase-js";

export const useAuth = async () => {
  const { supabase } = useSupabase();
  const user = ref<User | null>(null);
  const accessToken = Cookies.get("supabase-access-token");
  if (accessToken) {
    const { data, error } = await supabase.auth.getUser(accessToken);

    if (error) {
      console.error("Error fetching user from access token:", error.message);
    } else if (data.user) {
      console.log("User from access token:", data.user);
      user.value = data.user;
    }
  }

  supabase.auth.onAuthStateChange((event, session) => {
    user.value = session?.user ?? null;
    // Store the access_token in a cookie
    Cookies.set("supabase-access-token", session?.access_token || "", {
      expires: 1, // The cookie will expire in 1 day
      // secure: true, // Ensure it's only sent over HTTPS
      sameSite: "Strict", // Protect against CSRF
    });
  });

  const isAuthenticated = computed(() => user.value !== null);

  return { user, isAuthenticated };
};
