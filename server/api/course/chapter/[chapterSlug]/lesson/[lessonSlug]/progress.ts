import { H3Event } from "h3";
import { PrismaClient } from "~/prisma/client/index.js";
import protectRoute from "~/server/utils/protectRoute";

const prisma = new PrismaClient();

// Define the params interface
interface RouteParams {
  chapterSlug: string;
  lessonSlug: string;
}

//Endpoint that updates the progress of a lesson
export default defineEventHandler(async (event: H3Event) => {
  //Only allow PUT, PATCH or POST requests
  assertMethod(event, ["PUT", "PATCH", "POST"]);

  //Throw a 401 if there is no user logged in
  protectRoute(event);

  //Get the route params
  const { chapterSlug, lessonSlug } = event.context
    .params as unknown as RouteParams;

  //Get the lessong from the DB
  const lesson = await prisma.lesson.findFirst({
    where: {
      slug: lessonSlug,
      Chapter: {
        slug: chapterSlug,
      },
    },
  });

  //If the lesson does not exist, throw a 404
  if (!lesson) {
    throw createError({
      statusCode: 404,
      message: "Lesson not found",
    });
  }

  //Get the completed value from the request body and update the progress in database
  //Select based on the chapter and lesson slugs
  const { completed } = await readBody(event);

  //Get user email from supabase user if there is one
  const { email: userEmail } = event.context.user as { email: string };

  //The update is for update if the record exists or create if it does not exist
  return prisma.lessonProgress.upsert({
    where: {
      lessonId_userEmail: {
        lessonId: lesson.id,
        userEmail,
      },
    },
    update: {
      completed,
    },
    create: {
      userEmail,
      completed,
      Lesson: {
        connect: {
          id: lesson.id,
        },
      },
    },
  });
});
