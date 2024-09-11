import { PrismaClient, Prisma } from "~/prisma/client/index.js";

const prisma = new PrismaClient();

const lessonSelect = Prisma.validator<Prisma.LessonDefaultArgs>()({
  select: {
    title: true,
    slug: true,
    number: true,
  },
});

export type LessonOutline = Prisma.LessonGetPayload<typeof lessonSelect>;

const chapterSelect = Prisma.validator<Prisma.ChapterDefaultArgs>()({
  select: {
    title: true,
    slug: true,
    number: true,
    lessons: lessonSelect,
  },
});

export type ChapterOutline = Prisma.ChapterGetPayload<typeof chapterSelect>;

const courseSelect = Prisma.validator<Prisma.CourseDefaultArgs>()({
  select: {
    title: true,
    chapters: chapterSelect,
  },
});

export type courseOutline = Prisma.CourseGetPayload<typeof courseSelect>;

export default defineEventHandler(async () => {
  const course = await prisma.course.findFirst(courseSelect);
  const formattedCourse = course?.chapters.map((item) => {
    const lessons = item.lessons.map((lesson) => {
      return {
        title: lesson.title,
        slug: lesson.slug,
        number: lesson.number,
        path: `/course/chapter/${item.slug}/lesson/${lesson.slug}`,
      };
    });
    return {
      title: item.title,
      slug: item.slug,
      number: item.number,
      lessons: lessons,
    };
  });
  return {
    ...course,
    chapters: formattedCourse,
  };
});
