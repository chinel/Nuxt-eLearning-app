import { defineStore } from "pinia";
import Cookies from "js-cookie";
import { useSupabase } from "../composables/useSupabase";
import type { CourseProgress } from "../types/course";

interface LessonProgress {
  [lessonSlug: string]: boolean; // maps lesson slugs to completion status (boolean)
}

export const useCourseProgress = defineStore("courseProgress", () => {
  //Initialize progress from local storage
  const progress = ref<CourseProgress>({});

  const initialized = ref(false);

  async function initialize() {
    //if the course has been initialized, return
    if (initialized.value) return;

    initialized.value = true;

    //TODO: Fetch user progress from endpoint

    const headers = useRequestHeaders(["cookie"]) as Record<string, string>;

    const { data: userProgress } = await useFetch<CourseProgress>(
      "/api/user/progress",
      { headers }
    );

    // Update progress value
    if (userProgress.value) {
      progress.value = userProgress.value;
    }
  }

  //Toggle the progress of a Lesson based on the Chapter slug and Lesson Slug
  const toggleComplete = async (chapter: string, lesson: string) => {
    const { supabase } = useSupabase();

    const accessToken = Cookies.get("supabase-access-token");
    if (accessToken) {
      const { data, error } = await supabase.auth.getUser(accessToken);

      //If there's no user we can't update the progress
      if (!data.user) {
        return;
      }

      //Grab chapter and lesson from the route if not provided
      if (!chapter || !lesson) {
        const {
          params: { chapterSlug, lessonSlug },
        } = useRoute();
        chapter = chapterSlug as string;
        lesson = lessonSlug as string;
      }

      //Get the current progress for the lesson
      const currentProgress = progress.value[chapter]?.[lesson];

      //Optimistically update the progress value in th UI
      progress.value[chapter] = {
        ...progress.value[chapter],
        [lesson]: !currentProgress,
      };

      //Update the database
      try {
        await fetch(
          `/api/course/chapter/${chapter}/lesson/${lesson}/progress`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              completed: !currentProgress,
            }),
          }
        );
      } catch (error) {
        //If there's an error, revert the progress in the UI
        progress.value[chapter] = {
          ...progress.value[chapter],
          [lesson]: currentProgress,
        };
      }
    }
  };

  return {
    progress,
    initialize,
    toggleComplete,
  };
});
