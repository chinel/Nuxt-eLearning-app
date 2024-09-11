import { getRequestHeaders } from "h3";
import { createClient } from "@supabase/supabase-js";

// Create a Supabase client instance
const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

export default defineEventHandler(async (event) => {
  // Get the Supabase access token from the cookie
  const accessToken = getCookie(event, "supabase-access-token");

  console.log("accessToken", accessToken);
  //   if (!accessToken) {
  //     return { error: "No access token found" };
  //   }

  // Fetch the authenticated user from Supabase using the token
  const {
    error,
    data: { user },
  } = await supabase.auth.getUser(accessToken);

  //   if (error) {
  //     return { error: "Invalid or expired token" };
  //   }

  // Now you have access to the authenticated user
  console.log("Authenticated user:", user);
});
