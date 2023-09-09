import { useState } from 'react';
import { WinnerComp } from './components/WinnerComp.jsx';
import { Square } from './components/Square.jsx';


const TURNS = {
  X: 'x',
  O: 'o'
}


const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]

]

function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )

  const [turn, setTurn] = useState(TURNS.X)

  const [winner, setWinner] = useState(null)//null = no hay ganador ; false = hay un empate

  const checkWinner = (boardToCheck) => {
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
      //si no hay ganador
      return null;
    }
  }

  const resetBoard = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard) => {
    //revisamos si hay un empate, si no hay mas espacios vacíos en el tablero
    return newBoard.every((square) => square !== null)
  }

  const updateBoard = (index) => {
    //no actualizamos esta posicion
    //si ya contiene algo
    if (board[index] || winner) return

    //actualizar tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }


  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetBoard}>Reiniciar tablero</button>
      <section className="game">
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

     <WinnerComp resetBoard={resetBoard} winner={winner}/>

    </main>
  )
}

export default App
