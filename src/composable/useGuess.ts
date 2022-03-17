import { ref, onMounted, onUnmounted } from "vue";
import { WORD_LENGTH } from "../constants/constants";

export const useGuess = () => {
  const guess = ref("");

  const addGuessLetter = (letter: string) => {
    const newGuess =
      letter.length === 1 && guess.value.length !== WORD_LENGTH
        ? guess.value + letter
        : guess.value;

    switch (letter) {
      case "Backspace":
        return (guess.value = newGuess.slice(0, -1));
      case "Enter":
        if (newGuess.length === WORD_LENGTH) {
          return (guess.value = "");
        }
    }

    if (newGuess.length === WORD_LENGTH) {
      guess.value = newGuess;
      return guess.value;
    }

    guess.value = newGuess;
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const letter = e.key;
    addGuessLetter(letter);
  };

  // a composable can also hook into its owner component's
  // lifecycle to setup and teardown side effects.
  onMounted(() => window.addEventListener("keydown", onKeyDown));
  onUnmounted(() => window.removeEventListener("keydown", onKeyDown));

  // expose managed state as return value
  return { guess, addGuessLetter };
};
