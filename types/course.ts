export type Lesson = {
  title: string;
  slug: string;
  downloadUrl: string;
  number: number;
  videoId: number;
  text: string;
  sourceUrl?: string;
};

export type LessonWithPath = Lesson & { path: string };

export type Chapter = {
  title: string;
  slug: string;
  number: number;
  lessons: Lesson[] | LessonWithPath[];
};

export type Course = {
  title: string;
  chapters: Chapter[];
};

export type OutlineBase = {
  title: string;
  slug: string;
  number: number;
};

export type OutlineLesson = OutlineBase & {
  path: string;
};

export type OutlineChapter = OutlineBase & {
  lessons: OutlineLesson[];
};

export type CourseMeta = {
  title: string;
  chapters: OutlineChapter[];
};
