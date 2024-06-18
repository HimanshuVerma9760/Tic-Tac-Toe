export default function GameOver({ winner, draw, reset }) {
  return (
    <>
      <div id="game-over">
        <h2>Game-Over</h2>
        {draw ? <p>The Match Was Draw</p> : <p>{winner} won</p>}
        <p>
          <button onClick={() => reset([])}>Rematch!</button>
        </p>
      </div>
    </>
  );
}
