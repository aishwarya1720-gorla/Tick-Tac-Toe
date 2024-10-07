import React, { useState } from 'react';
import './App.css'; 
import Square from './Square';

const App = () => {
  const [next, setNext] = useState(true); // Start with player 'X'
  const [square, setSquare] = useState(Array(9).fill(null));

  function handleClick(i) {
    const nextSquare = square.slice();
    
    if (calculateWinner(square) || nextSquare[i]) {
      return; // Prevent further moves after win or if square is occupied
    }

    nextSquare[i] = next ? 'X' : 'O';
    setSquare(nextSquare);
    setNext(!next);
  }

  function calculateWinner(square) {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let [a, b, c] of winningCombinations) {
      if (square[a] && square[a] === square[b] && square[a] === square[c]) {
        return square[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(square);
  const isBoardFull = square.every((sq) => sq !== null); // Check if all squares are filled
  let status = '';

  if (winner) {
    status = `Winner: Player ${winner}`;
  } else if (isBoardFull) {
    status = "It's a Tie!";
  } else {
    status = `Next player: ${next ? 'Player X' : 'Player O'}`;
  }

  function resetGame() {
    setSquare(Array(9).fill(null));
    setNext(true);
  }

  return (
    <>
      <div className="game-container">
        <h1>Tic-Tac-Toe</h1>
        <span>Player 1: 'X'</span> &nbsp; &nbsp; &nbsp; <span>Player 2: 'O'</span>
        <div className="status">{status}</div>
        <div className="board">
          <table className="grid">
            <tbody>
              <tr>
                <td><Square value={square[0]} onSquareClick={() => handleClick(0)} /></td>
                <td><Square value={square[1]} onSquareClick={() => handleClick(1)} /></td>
                <td><Square value={square[2]} onSquareClick={() => handleClick(2)} /></td>
              </tr>
              <tr>
                <td><Square value={square[3]} onSquareClick={() => handleClick(3)} /></td>
                <td><Square value={square[4]} onSquareClick={() => handleClick(4)} /></td>
                <td><Square value={square[5]} onSquareClick={() => handleClick(5)} /></td>
              </tr>
              <tr>
                <td><Square value={square[6]} onSquareClick={() => handleClick(6)} /></td>
                <td><Square value={square[7]} onSquareClick={() => handleClick(7)} /></td>
                <td><Square value={square[8]} onSquareClick={() => handleClick(8)} /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <button className="reset-btn" onClick={resetGame}>Reset</button>
      </div>
    </>
  );
};

export default App;
