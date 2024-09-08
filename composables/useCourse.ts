import type { courseOutline } from "~/server/api/course/meta.get";
import useFetchWithCache from "./useFetchWithCache";

export const useCourse = () =>
  useFetchWithCache<courseOutline>("/api/course/meta");
