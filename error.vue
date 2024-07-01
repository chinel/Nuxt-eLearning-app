<template>
  <NuxtLayout>
    <div class="prose text-center">
      <template v-if="error.statusCode === 404">
        <h1>404!</h1>
        <p>Sorry, this page doesn't exist.</p>
      </template>
      <template v-else>
        <h1>Dang</h1>
        <p>
          <strong>{{ error.message }}</strong>
          <p>It looks like something broke.</p>
          <p>Sorry about that.</p>
        </p>
      </template>
      <p>
        Go back to <a @click="handleError">Home</a>
      </p>
    </div>
  </NuxtLayout>
</template>

<script setup>
const error = useError();

const handleError = () => {
  clearError({
    redirect:
      "/course/chapter/1-chapter-1/lesson/1-introduction-to-typescript-with-vue-js-3",
  });
};
</script>
