<template>
  <div>
    <p class="mt-0 uppercase font-bold text-slate-400 mb-1">
      Lesson {{ chapter.number }} - {{ lesson.number }}
    </p>
    <h2 class="my-0">{{ lesson.title }}</h2>
    <div class="flex space-x-4 mt-2 mb-8">
      <NuxtLink
        v-if="lesson.sourceUrl"
        class="font-normal text-md text-gray-500"
        :to="lesson.sourceUrl"
      >
        Download Source Code
      </NuxtLink>
      <NuxtLink
        v-if="lesson.downloadUrl"
        class="font-normal text-md text-gray-500"
        :to="lesson.downloadUrl"
      >
        Download Video
      </NuxtLink>
    </div>
    <VideoPlayer v-if="lesson.videoId" :videoId="lesson.videoId" />
    <p>{{ lesson.text }}</p>
    <!-- <ClientOnly> -->
    <LessonCompleteButton
      :model-value="isLessonComplete"
      @update:model-value="toggleComplete"
    />
    <!-- </ClientOnly> -->
  </div>
</template>

<script setup>
const course = await useCourse();
const route = useRoute();
const { chapterSlug, lessonSlug } = route.params;
const lesson = await useLesson(chapterSlug, lessonSlug);

definePageMeta({
  middleware: [
    async function (to, from) {
      const course = await useCourse();
      const chapter = course.value.chapters.find(
        (chapter) => chapter.slug === to.params.chapterSlug
      );
      if (!chapter) {
        return abortNavigation(
          createError({
            statusCode: 404,
            message: "Chapter not found",
          })
        );
      }
      const lesson = chapter.lessons.find(
        (lesson) => lesson.slug === to.params.lessonSlug
      );
      if (!lesson) {
        return abortNavigation(
          createError({
            statusCode: 404,
            message: "Lesson not found",
          })
        );
      }
    },
    "auth",
  ],
});

const chapter = computed(() => {
  return course.value.chapters.find(
    (chapter) => chapter.slug === route.params.chapterSlug
  );
});

// console.log("chapter--->", chapter.value);

// if (!chapter.value) {
//   throw createError({
//     statusCode: 404,
//     message: "Chapter not found",
//   });
// }

// const lesson = computed(() => {
//   return chapter.value.lessons.find((lesson) => {
//     console.log(lesson);
//     return lesson.slug === route.params.lessonSlug;
//   });
// });

// if (!lesson.value) {
//   throw createError({
//     statusCode: 404,
//     message: "Lesson not found",
//   });
// }

const title = computed(() => {
  return `${lesson.value.title} - ${course.value.title}`;
});

useHead({
  title,
});

//const progress = ref();

const progress = useLocalStorage("progress", () => {
  return [];
});

const isLessonComplete = computed(() => {
  if (!progress.value[chapter.value.number - 1]) {
    return false;
  }
  if (!progress.value[chapter.value.number - 1][lesson.value.number - 1]) {
    return false;
  }
  return progress.value[chapter.value.number - 1][lesson.value.number - 1];
});
const toggleComplete = () => {
  if (!progress.value[chapter.value.number - 1]) {
    progress.value[chapter.value.number - 1] = [];
  }
  progress.value[chapter.value.number - 1][lesson.value.number - 1] =
    !isLessonComplete.value;
};
</script>
