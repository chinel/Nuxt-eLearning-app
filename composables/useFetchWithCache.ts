import { StorageSerializers } from "@vueuse/core";
export default async <T>(url: string) => {
  //Use session storage to cache the lesson data
  const cached = useSessionStorage<T>(url, null, {
    //By passing null as default it can't determine which serializer to use
    serializer: StorageSerializers.object,
  });

  if (!cached.value) {
    const { data, error } = await useFetch<T>(url, {
      headers: useRequestHeaders(["cookie"]) as Record<string, string>,
    });

    if (error.value) {
      throw createError({
        ...error.value,
        statusMessage: `Could not fetch data from ${url}`,
      });
    }
    cached.value = data.value as T;
  }

  return cached;
};
