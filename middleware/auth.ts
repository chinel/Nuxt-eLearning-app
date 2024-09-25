export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user } = await useAuth();

  if (user.value || to.params.chapterSlug === "1-chapter-1") {
    return;
  }
  return navigateTo(`/login?redirectTo=${to.path}`);
});
