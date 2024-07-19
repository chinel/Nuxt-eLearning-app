export default defineEventHandler((event) => {
  const { chapterSlug, lessonSlug } = event.context.params!;
  return `Lesson "${lessonSlug}" in Chapter "${chapterSlug}"`;
});
