import React, { useEffect, useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';

import ScoreBoard from './components/ScoreBoard';
import StyleScreen from './components/StyleScreen';

import banana from './imagess/banana.png'
import images from './imagess/images.png'
import orange from './imagess/orange.png'
import pinapple from './imagess/pinapple.png'
import strawberry from './imagess/strawberry.png'
import watermelon from './imagess/watermelon.png'
import blank from './imagess/blank.png'

const width = 8;
const candyColors = [
  watermelon,
  orange,
  images,
  pinapple,
  strawberry,
  banana
]

const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([])
  const [squareBeingDragged, setSquareBeingDragged] = useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
  const [scoreDisplay, setScoreDisplay] = useState(0)
 // const [addFruit, setAddFruit ] = useState(null)



  const checkForColumnOfFour = () => {
    
    for(let i=0; i<= 39; i++){
      const columnOfFour = [i, i + width, i + width * 2]
      const decidedColor = currentColorArrangement[i]
      const isBlank = currentColorArrangement[i] === blank

      if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 4)
        columnOfFour.forEach(square => currentColorArrangement[square] = blank)
        return true;
      }
    }
    
  }

  const checkForColumnOfThree = () => {
    
    for(let i=0; i<= 47; i++){
      const columnOfThree = [i, i + width, i + width * 2]
      const decidedColor = currentColorArrangement[i]
      const isBlank = currentColorArrangement[i] === blank

      if (columnOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 3)
        columnOfThree.forEach(square => currentColorArrangement[square] = blank)
        return true;
      }
    }
    
  }

  const checkForRowOfThree = () => {
    
    for(let i=0; i< 64; i++){
      const rowOfThree = [i, i + 1, i + 2]
      const decidedColor = currentColorArrangement[i]
      const notValid = [6, 7, 14, 15, 22, 30, 31, 38, 46, 54, 55, 63, 64]
      const isBlank = currentColorArrangement[i] === blank

      if (notValid.includes(i)) continue

      if (rowOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 3)
        rowOfThree.forEach(square => currentColorArrangement[square] = blank)
        return true;
      }
    }
    
  }

  const checkForRowOfFour = () => {
    
    for(let i=0; i< 64; i++){
      const rowOfFour = [i, i + 1, i + 2, i + 3]
      const decidedColor = currentColorArrangement[i]
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 29, 30, 31, 37, 38, 45, 46, 53, 54, 55, 62, 63, 64]
      const isBlank = currentColorArrangement[i] === blank

      if (notValid.includes(i)) continue

      if (rowOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 4)
        rowOfFour.forEach(square => currentColorArrangement[square] = blank)
        return true;
      }
    }
    
  }

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i)

      if(isFirstRow && currentColorArrangement[i] === '') {
        let randomNum = Math.floor(Math.random() * candyColors.length)
        currentColorArrangement[i] = candyColors[randomNum]
      }


    


    if ((currentColorArrangement[i + width]) === '') {
      currentColorArrangement[i +width] = currentColorArrangement[i]
      currentColorArrangement[i] = ''

    }
  }}

  //console.log(scoreDisplay)

  const dragStart = (e) => {
    //console.log(e.target)
    //console.log('drag start')
    setSquareBeingDragged(e.target)
  }

  const dragDrop = (e) => {
    //console.log(e.target)
    //console.log('drag drop')
    setSquareBeingReplaced(e.target)
  }

  const dragEnd = () => {
    //console.log(e.target)
    //console.log('drag end')


    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

    currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
    currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')


    //console.log('squareBeingDraggedId', squareBeingDraggedId)
    //console.log('squareBeingReplacedId', squareBeingReplacedId)

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width
    ]

    const validMove = validMoves.includes(squareBeingReplacedId);

    const isColumnOfFour = checkForColumnOfFour();
    const isRowOfFour = checkForRowOfFour();
    const isColumnOFThree = checkForColumnOfThree();
    const isRowOfThree = checkForRowOfThree();
    
    if (squareBeingReplacedId && validMove && (isColumnOfFour || isRowOfFour || isColumnOFThree || isRowOfThree)) {
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
    }else {
      currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src');
      currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src');
      setCurrentColorArrangement([...currentColorArrangement]);
    }

  }

  const changeValue = () => {
    setScoreDisplay((score) => 0)
  }

  const replaceFruit = () => {
    //const isBlank = currentColorArrangement[i] === blank
    const randomColorArray = []

    if (setSquareBeingDragged(null) && setSquareBeingReplaced(null)) {
      for (let i = 0; i< width * width; i++) {
        const randomColorBlank = candyColors[Math.floor(Math.random() * candyColors.length)];
        randomColorArray.push(randomColorBlank);
      }
      setCurrentColorArrangement(randomColorArray)
    }
  }




  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i< width * width; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangement.push(randomColor);
    }
    //console.log(randomColorArrangement);
    setCurrentColorArrangement(randomColorArrangement);
  }
  
  //console.log(currentColorArrangement);

  useEffect(() => {
    createBoard();
  }, [blank]);

  useEffect(() => {
    replaceFruit();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrentColorArrangement([...currentColorArrangement])

    }, 100)
    return () => clearInterval(timer)
    

  }, [checkForRowOfFour,  checkForColumnOfFour,checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColorArrangement])

    //console.log(currentColorArrangement);

  return (
    <Stack className='app' >
      <StyleScreen />
      <center>
        <div className="containerGlitch">
          <p className="glitch" id="textGlitch"> WELOME TO FRUIT PUNCH </p>
        </div>
      </center>
      <Box className='game'>
        {currentColorArrangement.map((candyColor,index ) => (
          <img 
          key={index}
          src={candyColor} 
          alt={candyColor}
          data-id={index}
          draggable={true}
          onDragStart={dragStart}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => e.preventDefault()}
          onDragLeave={(e) => e.preventDefault()}
          onDrop={dragDrop}
          onDragEnd={dragEnd}

          />
        ))}

      </Box>
      <Typography fontSize='22px' fontFamily= 'cursive' color= '#f51fb8cc' >
        Score
       <ScoreBoard score={scoreDisplay} />
      </Typography>
      
      <Box className='score-box' component="span">
      <button className='btn'  onClick={changeValue}>Start!</button>
      </Box>
      
    </Stack>
  );
}

export default App;
