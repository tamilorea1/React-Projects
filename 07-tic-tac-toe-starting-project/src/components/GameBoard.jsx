


export default function GameBoard({onSelectedSquare, board}) {

    
    // const [gameBoard, setGameBoard] = useState(initialGameBoard)

    // function handleButtonClick(rowIndex, colIndex){
    //     setGameBoard((prevGameBoard) => {
    //         const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol
    //         return updatedBoard
    //     } )

    //     onSelectedSquare();
    // }

  return (
    <ol id='game-board'>
        {/*The first map function, iterates through each nested array(row) in our array list */}
        {/* The 2nd map function, iterates through a nested array's elements/items (items in the row) */}
        {board.map((row, rowIndex) =>
            <li key={rowIndex}>
                <ol>
                    {row.map((column, columnIndex) => 
                        <li key={columnIndex}>
                            <button 
                            onClick={() => onSelectedSquare(rowIndex, columnIndex)} 
                            disabled= {column !== null}>
                                {column}
                            </button>
                        </li>
                    )}
                </ol>
            </li>
        )}
    </ol>
  )
}
