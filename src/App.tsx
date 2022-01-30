import { useEffect } from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'

import { Container, Game } from './styles'
import Dog1 from './assets/images/dog1.png'
import Dog2 from './assets/images/dog2.png'
import Dog3 from './assets/images/dog3.png'
import Dog4 from './assets/images/dog4.png'
import Dog5 from './assets/images/dog5.png'
import Dog6 from './assets/images/dog6.png'
import Dog7 from './assets/images/dog7.png'
import blank from './assets/images/blank.png'

const width = 8
const candyColors = [
  Dog1, Dog2, Dog3, Dog4, Dog5, Dog6, Dog7
]

function App() {
  const [currentColorArrangement, setCurrentColorArrangement] = useState<Array<string>>([])
  const [squareBeingDragged, setSquareBeingDragged] = useState<HTMLImageElement | null>(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState<HTMLImageElement | null>(null)
  const [moviments, setMoviment] = useState(0)
  const [score, setScore] = useState(0)

  function createBoard() {
    const randomColorArrangement = []
    for (let i = 0; i < width * width; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
      randomColorArrangement.push(randomColor)
    }
    setCurrentColorArrangement(randomColorArrangement)
  }

  function checkColumnOfFour() {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
      const decidedColor = currentColorArrangement[i]
      const isBlank = currentColorArrangement[i] === blank
      if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor)) {
        columnOfFour.forEach(square => currentColorArrangement[square] = blank)
        setScore((state) => state + 4)
        return true
      }
    }
  }
  function checkRowOfFour() {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3]
      const decidedColor = currentColorArrangement[i]
      const isBlank = currentColorArrangement[i] === blank
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 61, 62, 63]
      if (notValid.includes(i)) continue
      if (rowOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
        rowOfFour.forEach(square => currentColorArrangement[square] = blank)
        setScore((state) => state + 4)
        return true
      }
    }
  }
  function checkRowOfThree() {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2]
      const decidedColor = currentColorArrangement[i]
      const isBlank = currentColorArrangement[i] === blank
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63]
      if (notValid.includes(i)) continue
      if (rowOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
        rowOfThree.forEach(square => currentColorArrangement[square] = blank)
        setScore((state) => state + 3)
        return true
      }
    }
  }

  function checkColumnOfThree() {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2]
      const decidedColor = currentColorArrangement[i]
      const isBlank = currentColorArrangement[i] === blank
      if (columnOfThree.every(square => currentColorArrangement[square] === decidedColor)) {
        columnOfThree.forEach(square => currentColorArrangement[square] = blank)
        setScore((state) => state + 3)
        return true
      }
    }
  }

  function moveSquareForBellow() {
    for (let i = 0; i < 64 - width; i++) {

      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFistRow = firstRow.includes(i)
      if (isFistRow && currentColorArrangement[i] === blank) {
        let randomNumber = Math.floor(Math.random() * candyColors.length)
        currentColorArrangement[i] = candyColors[randomNumber]
      }

      if (currentColorArrangement[i + width] === blank) {
        currentColorArrangement[i + width] = currentColorArrangement[i]
        currentColorArrangement[i] = blank
      }
    }
  }


  useEffect(() => {
    createBoard()
    console.info("<a href='https://www.flaticon.com/free-icons/dog' title='dog icons'>Dog icons created by Freepik - Flaticon</a>")
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      checkRowOfFour()
      checkColumnOfFour()
      checkRowOfThree()
      checkColumnOfThree()
      moveSquareForBellow()
      setCurrentColorArrangement([...currentColorArrangement])
    }, 100)
    return () => clearInterval(timer)
  }, [moveSquareForBellow, checkRowOfFour, checkColumnOfFour, checkRowOfThree, checkColumnOfThree, currentColorArrangement])

  function dragStart(e: React.DragEvent<HTMLImageElement>) {
    // console.log(e.target)
    setSquareBeingDragged(e.target as HTMLImageElement)
  }
  function dragDrop(e: React.DragEvent<HTMLImageElement>) {
    setSquareBeingReplaced(e.target as HTMLImageElement)
  }

  function dragEnd() {
    const squareBeingDraggedId = Number(squareBeingDragged?.getAttribute('data-id'))
    const squareBeingReplacedId = Number(squareBeingReplaced?.getAttribute('data-id'))
    setMoviment((state) => state + 1)
    // console.log("being==>", squareBeingDraggedId)
    // console.log("replaced=>>", squareBeingReplacedId)


    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width
    ]

    const validMove = validMoves.includes(squareBeingReplacedId)
    // console.log(validMove)
    const isAColumnOfFour = checkColumnOfFour()
    const isARowOfFour = checkRowOfFour()
    const isAColumnOfThree = checkColumnOfThree()
    const isARowOfThree = checkRowOfThree()
    if (validMove) {
      currentColorArrangement[Number(squareBeingReplacedId)] = squareBeingDragged?.getAttribute('src') as string
      currentColorArrangement[Number(squareBeingDraggedId)] = squareBeingReplaced?.getAttribute('src') as string
      setCurrentColorArrangement([...currentColorArrangement])
    }


    if (squareBeingReplacedId && (
      isAColumnOfFour || isARowOfFour || isAColumnOfThree || isARowOfThree)
    ) {
      setSquareBeingReplaced(null)
      setSquareBeingDragged(null)
    }
  }
  return (
    <Container>
      <div>
        <h3>Dragging {moviments}</h3>
        <h2>Score {score}</h2>

      </div>
      <Game >
        {currentColorArrangement.map((candyColor, index) => (
          <img
            key={index}
            src={candyColor}
            alt={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={(e) => dragStart(e)}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </Game>
    </Container>
  )
}

export default App
