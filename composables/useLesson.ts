import type { LessonWithPath } from "~/types/course";
import useFetchWithCache from "./useFetchWithCache";
export default async (chapterSlug: string, lessonSlug: string) => {
  return useFetchWithCache<LessonWithPath>(
    `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`
  );
};
