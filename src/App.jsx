import { useEffect } from "react"
import Card from './components/Card'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { saveCards, setChoiceOne, setChoiceTwo, setTurns, updateCards, setCurrentCardKey, setPrevCardKey } from './actions';
import successTone from './assets/success.mp3'
import "./App.scss"

const App = (props) => {

  const { cards, saveCards, choiceOne, setChoiceOne, choiceTwo, setChoiceTwo, turns, setTurns, updateCards, currentCardKey, setCurrentCardKey, prevCardKey, setPrevCardKey } = props

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
    if (!choiceOne) {
      setChoiceOne(cardId)
    } else {
      setChoiceTwo(cardId)
      setTurns(turns + 1)
    }
  }

  const setCurrent = (cardKey) => {
    setPrevCardKey(currentCardKey)
    setCurrentCardKey(cardKey)
  }

  const audio = new Audio(successTone)

  const playSuccess = () => {
    audio.play()
  }

  useEffect(() => {

    if (choiceOne && choiceTwo) {

      if (choiceOne === choiceTwo) {
        console.log("match")
        playSuccess()
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

        setTimeout(() => {
          setPrevCardKey('')
          setCurrentCardKey('')
        }, 1000)

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

          return (
            <Card
              key={id + i}
              backgroundImage={url}
              matchedIdentifier={id}
              uniqueIdentifer={id + i}
              matched={matched}
              flipped={matched || id + i === currentCardKey || id + i === prevCardKey} // if card is a matched card, or the last clicked card, it should be flipped
              handleChoice={handleChoice}
              setCurrent={setCurrent}
              disabled={id + i === currentCardKey} // if the card is the currently flipped card then disabled click (otherwise two clicks on the same card flips both matching cards)
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
  turns: state.turnsState.turns,
  currentCardKey: state.turnsState.currentCardKey,
  prevCardKey: state.turnsState.prevCardKey
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators({ saveCards, setChoiceOne, setChoiceTwo, setTurns, updateCards, setCurrentCardKey, setPrevCardKey }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);