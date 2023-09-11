import { WINNER_COMBOS } from "../constants";

export const checkWinnerFrom = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      //revisamos todas las combinaciones ganadoras, para saber si X u O ganó
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
      //si no hay ganador
      return null;
  } 

  export const checkEndGame = (newBoard) => {
    //revisamos si hay un empate, si no hay mas espacios vacíos en el tablero
    return newBoard.every((square) => square !== null)
  }