import { PrismaClient } from "~/prisma/client/index.js";
import course from "~/server/courseData";
import type { Chapter, Course, Lesson, LessonWithPath } from "~/types/course";

course as Course;

const prisma = new PrismaClient();

export default defineEventHandler((event) => {
  const { chapterSlug, lessonSlug } = event.context.params!;
  return prisma.lesson.findFirst();
});
