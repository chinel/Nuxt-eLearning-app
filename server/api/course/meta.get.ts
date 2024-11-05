import { PrismaClient, Prisma } from "~/prisma/client/index.js";

const prisma = new PrismaClient();

const lessonSelect = Prisma.validator<Prisma.LessonDefaultArgs>()({
  select: {
    title: true,
    slug: true,
    number: true,
  },
});

export type LessonOutline = Prisma.LessonGetPayload<typeof lessonSelect> & {
  path: string;
};

const chapterSelect = Prisma.validator<Prisma.ChapterDefaultArgs>()({
  select: {
    title: true,
    slug: true,
    number: true,
    lessons: lessonSelect,
  },
});

export type ChapterOutline = Omit<
  Prisma.ChapterGetPayload<typeof chapterSelect>,
  "lessons"
> & {
  lessons: LessonOutline[];
};

const courseSelect = Prisma.validator<Prisma.CourseDefaultArgs>()({
  select: {
    title: true,
    chapters: chapterSelect,
  },
});

export type courseOutline = Omit<
  Prisma.CourseGetPayload<typeof courseSelect>,
  "chapters"
> & {
  chapters: ChapterOutline[];
};

export default defineEventHandler(async (): Promise<courseOutline> => {
  const outline = await prisma.course.findFirst(courseSelect);

  //Error if there is no course
  if (!outline) {
    throw createError({
      statusCode: 404,
      statusMessage: "Course not found",
    });
  }

  //Map the course outline, so that we can add a path to each course
  const chapters = outline.chapters.map((chapter) => ({
    ...chapter,
    lessons: chapter.lessons.map((lesson) => ({
      ...lesson,
      path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
    })),
  }));

  return {
    ...outline,
    chapters,
  };
});
