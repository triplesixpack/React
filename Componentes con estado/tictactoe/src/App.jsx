import { useState } from 'react';
import { WinnerComp } from './components/WinnerComp';
import { Square } from './components/Square';
import { TURNS } from './constants';
import { checkEndGame, checkWinnerFrom } from './logic/board';
import confetti from 'canvas-confetti';

function App() {

  const [board, setBoard] = useState(() =>{
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  }
  )

  const [turn, setTurn] = useState(()=>{
  const turnsFromStorage = window.localStorage.getItem('turn')
  return turnsFromStorage ?? TURNS.X
})

  const [winner, setWinner] = useState(null)//null = no hay ganador ; false = hay un empate


  const resetBoard = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
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
    //guardar partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    //revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
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

      <WinnerComp resetBoard={resetBoard} winner={winner} />

    </main>
  )

}

export default App
