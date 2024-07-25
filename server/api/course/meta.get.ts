import course from "~/server/courseData";
import type { Chapter, Course, Lesson, LessonWithPath } from "~/types/course";

course as Course;

type OutlineBase = {
  title: string;
  slug: string;
  number: number;
};

type OutlineLesson = OutlineBase & {
  path: string;
};

type OutlineChapter = OutlineBase & {
  lessons: OutlineLesson[];
};

type CourseMeta = {
  title: string;
  chapters: OutlineChapter[];
};
export default defineEventHandler((event): CourseMeta => {});
