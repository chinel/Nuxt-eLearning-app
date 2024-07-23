import type { Chapter, Course, Lesson, LessonWithPath } from "~/types/course";
import courseData from "../server/courseData";

export const useCourse = (): Course => {
  const chapters: Chapter[] = courseData.chapters.map((chapter) => {
    const lessons: LessonWithPath[] = chapter.lessons.map((lesson: Lesson) => ({
      ...lesson,
      path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
    }));
    return {
      ...chapter,
      lessons,
    };
  });
  return {
    ...courseData,
    chapters,
  };
};
