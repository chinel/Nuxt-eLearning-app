import { defineStore } from "pinia";
import Cookies from "js-cookie";
import { useSupabase } from "../composables/useSupabase";

// Define types for progress
interface LessonProgress {
  [lessonSlug: string]: boolean; // maps lesson slugs to completion status (boolean)
}

interface ChapterProgress {
  [chapterSlug: string]: LessonProgress; // maps chapter slugs to lesson progress
}

export const useCourseProgress = defineStore("courseProgress", () => {
  //Initialize progress from local storage
  const progress = useLocalStorage<ChapterProgress>("progress", () => {
    return {};
  });

  const initialized = ref(false);

  async function initialize() {
    //if the course has been initialized, return
    if (initialized.value) return;

    initialized.value = true;

    //TODO: Fetch user progress from endpoint
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
    }
  };

  return {
    progress,
    initialize,
    toggleComplete,
  };
});
