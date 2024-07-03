<template>
  <div
    class="prose w-full max-w-xl h-64 bg-white flex flex-col items-center rounded-md py-8 border border-[#cccccc] gap-y-4 my-auto"
  >
    <h1 class="font-semibold">Sign Up or Log In</h1>
    <div>
      <button
        class="text-white bg-customGray font-bold py-2 px-4 rounded w-64 flex justify-center items-center gap-x-3"
      >
        <GithubIcon /><span>Github</span>
      </button>
    </div>
  </div>
</template>

<script setup>
const { title } = useCourse();
</script>
