import { ref, watch } from "vue";
import type { Ref } from "vue";

export const usePrevious = <T>(state: Ref<T>) => {
  const previous = ref<T>();

  watch(state, (_, oldVal) => {
    previous.value = oldVal;
  });

  return previous;
};
