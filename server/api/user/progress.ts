import { PrismaClient } from "~/prisma/client";
import protectedRoute from "~/server/utils/protectRoute";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  //Throw a 401 if there is no user loggged in
  protectedRoute(event);

  //Get user email from supabase if there is one
  const {
    user: { email: userEmail },
  } = event.context;

  //Get the progress from the DB
  const userProgress = await prisma.lessonProgress.findMany({
    where: {
      userEmail,
      //We only want to get the progress for the first course right now
      Lesson: {
        Chapter: {
          Course: {
            id: 1,
          },
        },
      },
    },

    select: {
      completed: true,
      Lesson: {
        select: {
          slug: true,
          Chapter: {
            select: {
              slug: true,
            },
          },
        },
      },
    },
  });

  //Get course outline from meta endpoint
  const courseOutline = await $fetch(`/api/course/meta`);

  if (!courseOutline) {
    throw createError({
      statusCode: 404,
      statusMessage: "Course outline not found",
    });
  }
});
