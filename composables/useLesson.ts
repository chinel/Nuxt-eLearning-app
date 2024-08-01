import { StorageSerializers } from "@vueuse/core";
import type { LessonWithPath } from "~/types/course";
export default async (chapterSlug: string, lessonSlug: string) => {
  const url = `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`;

  //Use session storage to cache the lesson data
  const lesson = useSessionStorage<LessonWithPath>(url, null, {
    //By passing null as defaul it can't determine which serializer to use
    serializer: StorageSerializers.object,
  });

  if (!lesson.value) {
    const { data, error } = useFetch(
      `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`
    );

    if (error.value) {
      throw createError({
        ...error.value,
        statusMessage: `Could not fetch Lesson ${lessonSlug} in chapter ${chapterSlug}`,
      });
    }
    lesson.value = data.value;
  } else {
    console.log(
      `Getting Lesson ${lessonSlug} in chapter ${chapterSlug} from cache.`
    );
  }

  return lesson;
};
