<template>
  <div
    class="prose w-full max-w-xl h-64 bg-white flex flex-col items-center rounded-md py-8 border border-[#cccccc] gap-y-4 my-auto"
  >
    <h1 class="font-semibold">Sign Up or Log In</h1>
    <div>
      <button
        type="button"
        class="text-white bg-customGray font-bold py-2 px-4 rounded w-64 flex justify-center items-center gap-x-3"
        v-on:click="login"
      >
        <GithubIcon /><span>Github</span>
      </button>
    </div>
  </div>
</template>

<script setup>
const { title } = useCourse();

//const supabase = useSupabaseClient();
const { supabase } = useSupabase();
const login = async () => {
  console.log(supabase);
  console.log("hello");

  const { user, session, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });
  if (error) {
    console.error("Error signing in with GitHub:", error);
  } else {
    console.log("User:", user);
    console.log("Session:", session);
  }
  // console.log(supabase);
  // const { error } = await supabase.auth.signInWithOAuth({
  //   provider: "github",
  // });
  // if (error) {
  //   console.log(error);
  // }
};
</script>
