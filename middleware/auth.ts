export default defineNuxtRouteMiddleware((to, from) => {
  console.log(to);
  // if (to.params.chapterSlug === "1-chapter-1") {
  //   return;
  // }
  // return navigateTo("/login");
});
