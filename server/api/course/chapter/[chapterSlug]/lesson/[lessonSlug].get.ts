import { PrismaClient } from "~/prisma/client/index.js";
// import course from "~/server/courseData";
import type { LessonWithPath } from "~/types/course";

// course as Course;

const prisma = new PrismaClient();

export default defineEventHandler((event) => {
  const { chapterSlug, lessonSlug } = event.context.params!;
  const lesson = prisma.lesson.findFirst({
    where: {
      slug: lessonSlug,
      Chapter: {
        slug: chapterSlug,
      },
    },
  });

  if (!lesson) {
    throw createError({
      statusCode: 404,
      statusMessage: "Lesson not found",
    });
  }

  return {
    ...lesson,
    path: `/course/chapter/${chapterSlug}/lesson/${lessonSlug}`,
  };
});
