import { defineStore } from "pinia";
import { getWord } from "@/utils/get-words";

export const useGuessStore = defineStore("guess", {
  state: () => {
    return {
      rows: [],
      answer: getWord(),
      gameState: "playing",
      keyboardLetterState: {},
    };
  },
});
