import course from "~/server/courseData";
import type {
  Chapter,
  Course,
  CourseMeta,
  OutlineChapter,
  OutlineLesson,
} from "~/types/course";

course as Course;

export default defineEventHandler((event): CourseMeta => {
  const outline: OutlineChapter[] = course.chapters.reduce(
    (prev: OutlineChapter[], next: Chapter) => {
      const lessons: OutlineLesson[] = next.lessons.map((lesson) => ({
        title: lesson.title,
        slug: lesson.slug,
        number: lesson.number,
        path: `/course/chapter/${next.slug}/lesson/${lesson.slug}`,
      }));

      const chapter: OutlineChapter = {
        title: next.title,
        number: next.number,
        slug: next.slug,
        lessons,
      };
      return [...prev, chapter];
    },
    []
  );

  return {
    title: course.title,
    chapters: outline,
  };
});
