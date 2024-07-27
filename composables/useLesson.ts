export default async (chapterSlug: string, lessonSlug: string) => {
  const { data, error } = useFetch(
    `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`
  );

  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: `Could not fetch Lesson ${lessonSlug} in chapter ${chapterSlug}`,
    });
  }

  return data;
};
