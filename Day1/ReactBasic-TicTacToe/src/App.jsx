import './Square.css';
import { useState } from 'react';


/**
 * This takes a value as a prop either 'O', 'X' or null
 * and a callback function 
 */
function Square({value, onSquareClick}){
  // to remember things we use state
  // const [value, setValue] = useState(null); 

  // // return (<button className='square'>{value}</button>);
  // function handleClick(){
  //   setValue("X");
  // }

  //onClick we call the parent onSquareClick() function
  return(
    <button 
      className='square'
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

/**
 * Takes 3 props xIsNext to check whose turn is next
 * squares to check current element on each square 
 * callback function onPlay
 */
//using props to access value
//why cant we call Square(1) like this?
  //because, we cant return twice! and only one element can be written
function Board({ xIsNext, squares, onPlay }){
  //setting each box as an array
  // const [squares, setSquares] = useState(Array(9).fill(null));

  //if there is already a move at index i in the squares or there is a winner just return
  function handleClick(i) {
    if (squares[i] !== null || calculateWinner(squares)) {
      return;
    }

    //copying the square into nextSquare to keep changes and squares keep default(doesnot change)
    const nextSquares = squares.slice();
    if(xIsNext){
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    //passing the update
    onPlay(nextSquares);
  }


  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  //on a square click onSquareClick() is called which call handleClick
  return(
    <>
      <div className='status'>{status}</div>
      <div className='board-row'> 
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );

  function calculateWinner(squares){
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for(let i=0; i < lines.length; i++){
      const [a, b, c] = lines[i];
      if (squares[a] !== null && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  }
}


/**
 * Up in the hierarchy where the game is controlled
 * 
 */
export default function Game(){
  //
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0; 
  //at start curentSquares is [null, null, null, .......] until 9 items
  //history[1] lets say square 2 is updated so it will be [null, null, 'X', .....]
  const currentSquares = history[currentMove];


  //Here, [...history, nextSquares] creates a new array that contains all the items in history
  function handlePlay(nextSquares) {
    //3 arrays of 9 elements history[0], history[1] and nexthistory
    /**
     * nextHistory = [
     *  [null, null, null, null, null, null, null, null, null], // history[0] move 0 
        ['X', null, null, null, null, null, null, null, null],  // history[1] move 1
        ['X', 'O', null, null, null, null, null, null, null]    // nextSquares move 2 ~ currentMove(just number like 2 in this case)
     * ]
     */
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  //instead of _, you can also do squares,
  const moves = history.map((_, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return(
    <>
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  )
}