import type { CourseMeta } from "~/types/course";
import useFetchWithCache from "./useFetchWithCache";

export const useCourse = () =>
  useFetchWithCache<CourseMeta>("/api/course/meta");
