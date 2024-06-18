import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import GameLog from "./components/GameLog";
import { WINNING_COMBINATIONS } from "./components/WinningCombinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
let countSquare = 9;

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

let winner = null;
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [Draw, setDraw] = useState(false);
  const [playerName, setPlayerName] = useState({
    X: "Player-1",
    O: "Player-2",
  });

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map((arr) => [...arr])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  for (const combo of WINNING_COMBINATIONS) {
    if (gameBoard[combo[0].row] != undefined) {
      const firstSquareSymbol = gameBoard[combo[0].row][combo[0].col];
      const secondSquareSymbol = gameBoard[combo[1].row][combo[1].col];
      const thirdSquareSymbol = gameBoard[combo[2].row][combo[2].col];

      if (
        firstSquareSymbol &&
        firstSquareSymbol === secondSquareSymbol &&
        firstSquareSymbol === thirdSquareSymbol
      ) {
        if (firstSquareSymbol === "X") {
          winner = playerName.X;
        } else {
          winner = playerName.O;
        }
      }
    }
  }

  function handleSelectSquare(rowIndex, colIndex) {
    countSquare = countSquare - 1;
    if (countSquare == 0 && winner === null) {
      setDraw(true);
    }
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });

    return activePlayer;
  }
  function restart(val) {
    setGameTurns(val);
    winner = null;
    countSquare = 9;
    setDraw(false);
  }
  function setInfo(symbol, name) {
    setPlayerName((prevData) => {
      return {
        ...prevData,
        [symbol]: name,
      };
    });
  }
  return (
    <>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initName="Player-1"
            symbol="X"
            isActive={activePlayer === "X"}
            playerInfo={setInfo}
          />
          <Player
            initName="Player-2"
            symbol="O"
            isActive={activePlayer === "O"}
            playerInfo={setInfo}
          />
        </ol>
        {(winner || Draw) && (
          <section>
            <GameOver winner={winner} draw={Draw} reset={restart} />
          </section>
        )}

        <section>
          <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
        </section>
      </div>
      <section>
        <GameLog turns={gameTurns} />
      </section>
    </>
  );
}

export default App;
