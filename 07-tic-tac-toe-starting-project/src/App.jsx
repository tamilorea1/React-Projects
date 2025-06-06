import { useState } from "react"
import GameBoard from "./components/GameBoard.jsx"
import Player from "./components/Player.jsx"
import Log from "./components/Log.jsx"
import {WINNING_COMBINATIONS} from "./winning_combinations.js"
import GameOver from "./components/GameOver.jsx"

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];


function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X'

      if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O'
      }

      return currentPlayer;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if (firstSquareSymbol && 
      firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...initialGameBoard.map((innerArray) => [...innerArray])];

    for(const turn of gameTurns){
        const {square, player} = turn
        const {row, col} = square

        gameBoard[row][col] = player
    }
    return gameBoard
}

function App() {
  
  // const [activePlayer, setActivePlayer] = useState('X')
  const [players, setPlayers] = useState(PLAYERS)

  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns)

  
  const gameBoard = deriveGameBoard(gameTurns)  
  const winner = deriveWinner(gameBoard, players)
  const hasDraw = gameTurns.length === 9 && !winner;


  function handleSelectedSquare(rowIndex, colIndex) {
    // setActivePlayer((currentlyActivePlayer) => currentlyActivePlayer === 'X' ? 'O' : 'X' )
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns)
      
      
      //Ex: If a player clicked row -> 1, col -> 2 & the player is X
      //[{ square: { row: 0, col: 1 }, player: 'x' }
      //Then once another turn starts
      //[{ square: { row: 1, col: 2 }, player: 'o' },
      // { square: { row: 0, col: 1 }, player: 'x' }
      const updatedTurns = [{ square: {row : rowIndex, col : colIndex}, player: currentPlayer},...prevTurns]
    
      return updatedTurns
    });
  }

  function handleRematch() {
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) =>
    {
      return{
        ...prevPlayers,
        [symbol] : newName
      }
    })
  }

  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player initialName= {PLAYERS.X} symbol='X' isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} />
            <Player initialName= {PLAYERS.O} symbol='O' isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
      
          </ol>
          {(winner || hasDraw) && <GameOver winner= {winner} onRestart={handleRematch}/>}

          <GameBoard onSelectedSquare={handleSelectedSquare} board={gameBoard}/>

        </div>

        <Log turns={gameTurns}/>
      </main>
    </>
  )
}

export default App
