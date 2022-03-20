import { defineStore } from "pinia";
import { getWord } from "@/utils/get-words";
import { calculateGuess, LetterState } from "@/utils/calculate-guess";
import { NUMBER_OF_GUESSES } from "@/constants/constants";

interface GuessRow {
  guess: string;
  result: LetterState[] | [];
}

interface GuessState {
  answer: string;
  rows: GuessRow[];
  gameState: "playing" | "won" | "lost";
  keyboardLetterState: { [letter: string]: LetterState };
  addGuess?(guess: string): void;
  newGame?(initialGuess?: string[]): void;
}

export const useGuessStore = defineStore("main", {
  state: () =>
    ({
      rows: [],
      answer: getWord(),
      gameState: "playing",
      keyboardLetterState: {},
    } as GuessState),
  actions: {
    addGuess(guess: string) {
      const result = calculateGuess(guess, this.answer);

      const rows = this.rows.concat({
        guess,
        result,
      });

      const didWin = result.every((r) => r === LetterState.Match);

      const keyboardLetterState = this.keyboardLetterState;
      result.forEach((r, index) => {
        const resultGuessLetter = guess[index];

        const currentLetterState = keyboardLetterState[resultGuessLetter];
        switch (currentLetterState) {
          case LetterState.Match:
            break;
          case LetterState.Present:
            if (r === LetterState.Miss) {
              break;
            }
            keyboardLetterState[resultGuessLetter] = r;
            break;
          default:
            keyboardLetterState[resultGuessLetter] = r;
            break;
        }
      });

      this.rows = rows;
      this.keyboardLetterState = keyboardLetterState;
      this.gameState = didWin
        ? "won"
        : this.rows.length === NUMBER_OF_GUESSES
        ? "lost"
        : "playing";
    },
    newGame(initialRows = []) {
      this.gameState = "playing";
      this.answer = getWord();
      this.rows = [];
      this.keyboardLetterState = {};
      initialRows.forEach(this.addGuess);
    },
  },
});
