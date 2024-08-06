<template>
  <div
    class="prose w-full max-w-xl h-64 bg-white flex flex-col items-center rounded-md py-8 border border-[#cccccc] gap-y-4 my-auto"
  >
    <h1 class="font-semibold">Welcome</h1>
    <div>
      <NuxtLink
        class="text-white bg-customGray font-bold py-2 px-4 rounded w-64 flex justify-center items-center gap-x-3 no-underline"
        :href="firstLesson.path"
      >
        Go to first lesson
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const firstLesson = await useFirstLesson();
</script>
