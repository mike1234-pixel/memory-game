import { useEffect, useState } from "react"
import Card from './components/Card'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { saveCards, setChoiceOne, setChoiceTwo, setTurns, updateCards } from './actions';
import "./App.scss"

const App = (props) => {

  const { cards, saveCards, choiceOne, setChoiceOne, choiceTwo, setChoiceTwo, turns, setTurns, updateCards } = props

  const [cardKey, setCardKey] = useState('')

  useEffect(() => {
    saveCards()
  }, [])

  const fetchSomeNewCats = () => {
    saveCards()
  }

  const resetTurns = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
  }

  const handleChoice = (cardId) => {
    !choiceOne ? setChoiceOne(cardId) : setChoiceTwo(cardId)
    setTurns(turns + 1)
  }

  const handleUnique = (cardKey) => {
    setCardKey(cardKey)
  }

  useEffect(() => {

    if (choiceOne && choiceTwo) {

      if (choiceOne === choiceTwo) {
        console.log("match")
        resetTurns()

        const updatedCards = cards.map((card) => {
          if (card.id === choiceOne) { // so card.id must equal choice one on the first choice only
            return { ...card, matched: true }
          } else {
            return card
          }
        })

        updateCards(updatedCards)
      } else {
        console.log("no match")
        resetTurns()
      }

    }


  }, [choiceOne, choiceTwo])



  return (
    <div>
      <button onClick={fetchSomeNewCats}>new game</button>

      <div className="cards">
        {cards.length > 0 ? cards.map((card, i) => {

          const { id, url, matched } = card

          console.log(cardKey)

          return (

            <Card
              key={id + i}
              backgroundImage={url}
              id={id}
              matched={matched}
              flipped={matched || id + i === cardKey} // NEED TO ADD A CONDITION TO FLIP THE SELECTED CARD
              handleChoice={handleChoice}
              handleUnique={handleUnique}
              unique={id + i}
            />

          )
        }) : <p>loading</p>}
      </div>
      <p>Turns: {turns}</p>
    </div>
  )

}

const mapStateToProps = (state) => ({
  cards: state.cardsState.cards,
  choiceOne: state.turnsState.choiceOne,
  choiceTwo: state.turnsState.choiceTwo,
  turns: state.turnsState.turns
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators({ saveCards, setChoiceOne, setChoiceTwo, setTurns, updateCards }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);




























// import { useEffect, useState } from 'react'
// import Card from './components/Card'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import { saveCards, updateCards, setTurns, setChoiceOne, setChoiceTwo } from './actions';
// import "./App.scss"

// const App = (props) => {

//   const { cards,
//     saveCards,
//     updateCards,
//     turns,
//     setTurns,
//     choiceOne,
//     setChoiceOne,
//     choiceTwo,
//     setChoiceTwo
//   } = props

//   useEffect(() => {
//     saveCards()

//   }, []) // componentDidMount

//   const [matchedCardIds, setMatchedCardIds] = useState([])

//   const newGame = () => {

//     const shuffledCards = [...cards].sort(() => Math.random() - 0.5)

//     saveCards(shuffledCards)

//     setTurns(0) // reset the game
//     //setMatchedCardIds([])

//   }

//   const handleChoice = (cardId) => {
//     !choiceOne ? setChoiceOne(cardId) : setChoiceTwo(cardId)
//   }

//   const resetTurn = () => {
//     setTimeout(() => {
//       setChoiceOne(null)
//       setChoiceTwo(null)
//     }, 1000)

//     setTurns(turns + 1)
//   }

//   useEffect(() => {

//     if (choiceOne && choiceTwo) {
//       if (choiceOne === choiceTwo) { // MATCH
//         //setMatchedCardIds(matchedCardIds => [...matchedCardIds, choiceTwo])

//         console.log('MATCHED CARD IDs' + matchedCardIds)

//         resetTurn()

//         const updatedCards = cards.map((card) => {
//           if (card.id === choiceOne) { // so card.id must equal choice one on the first choice only
//             return { ...card, matched: true }
//           } else {
//             return card
//           }
//         })

//         updateCards(updatedCards)

//       } else { // NO MATCH

//         resetTurn()
//       }
//     }
//   }, [choiceOne, choiceTwo]) // fires whenever a dependecy changes

//   return (
//     <div>
//       <button onClick={newGame}>new game</button>

//       <div className="cards">
//         {cards.length > 0 ? cards.map((card, i) => {

//           const { id, url, matched } = card

//           // console.log(typeof id, id)
//           // console.log(typeof choiceOne, choiceOne) // object of type null

//           // choiceOne is always reset to null

//           // it works momentarily, but then because choiceOne gets reset,
//           // the state of the component gets reset

//           return (

//             <Card
//               key={id + i}
//               backgroundImage={url}
//               id={id}
//               handleChoice={handleChoice}
//               flipped={matched}

//             />

//           )
//         }) : <p>loading</p>}
//       </div>
//       <p>Turns: {turns}</p>
//     </div>
//   )

// }


// // shuffles the cards on the first match?

// const mapStateToProps = (state) => ({
//   cards: state.cardsState.cards,
//   turns: state.turnsState.turns,
//   choiceOne: state.turnsState.choiceOne,
//   choiceTwo: state.turnsState.choiceTwo,
// });

// const mapDispatchToProps = (dispatch) => {
//   return {
//     dispatch,
//     ...bindActionCreators({ saveCards, updateCards, setTurns, setChoiceOne, setChoiceTwo }, dispatch),
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App);

// // 1) SORT THE FIRST TURN SHUFFLING BUG