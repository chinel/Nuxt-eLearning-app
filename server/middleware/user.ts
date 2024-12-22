import { getRequestHeaders } from "h3";
import { parseCookies } from "h3";
import { createClient } from "@supabase/supabase-js";

// Create a Supabase client instance
const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

export default defineEventHandler(async (event) => {
  // const cookies = parseCookies(event);
  // console.log("cookies-->", cookies); // Logs the parsed cookies

  // Get the Supabase access token from the cookie
  const accessToken = getCookie(event, "supabase-access-token");

  //   if (!accessToken) {
  //     return { error: "No access token found" };
  //   }

  // Fetch the authenticated user from Supabase using the token
  const {
    error,
    data: { user },
  } = await supabase.auth.getUser(accessToken);

  event.context.user = user;

  //   if (error) {
  //     return { error: "Invalid or expired token" };
  //   }
});
