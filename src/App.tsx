import { useEffect, useState } from "react"
import Card from './components/Card'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { saveCards, setChoiceOne, setChoiceTwo, setTurns, updateCards, setCurrentCardKey, setPrevCardKey, incrementPlayers, decrementPlayers, addScore, setGameStarted, resetGame } from './actions';
import success from './assets/turnTone.mp3'
import success1 from './assets/success1.mp3'
import { AppProps } from "./types/props/AppProps";
import CardI from './types/Card'
import "./App.scss"

const App: React.FC<AppProps> = (props: AppProps) => {

  const { cards, saveCards, choiceOne, setChoiceOne, choiceTwo, setChoiceTwo, turns, setTurns, updateCards, currentCardKey, setCurrentCardKey, prevCardKey, setPrevCardKey, numberOfPlayers, incrementPlayers, decrementPlayers, scores, addScore, gameStarted, setGameStarted, resetGame } = props

  useEffect(() => {
    saveCards()
  }, [])

  const fetchSomeNewCats: () => void = () => {
    saveCards()
    setTurns(0)
  }

  const resetTurns: () => void = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
  }

  const addPlayer: () => void = () => {
    incrementPlayers()
  }

  const removePlayer: () => void = () => {
    !(numberOfPlayers < 2) && decrementPlayers()
  }

  const startGame: () => void = () => {
    scores.length === 0 ? setGameStarted('game-started') : resetGame()
  }

  const handleChoice: (cardId: string) => void = (cardId) => {
    if (!choiceOne) {
      setChoiceOne(cardId)
    } else {
      setChoiceTwo(cardId)
      setTurns(turns + 1)
    }
  }

  const setCurrent: (cardKey: string) => void = (cardKey) => {
    setPrevCardKey(currentCardKey)
    setCurrentCardKey(cardKey)
  }

  const checkAllCardsMatched: (cards: Array<CardI>) => void = (cards) => {
    let cardsMatchedValues: Array<boolean> = []

    cards.forEach((card: CardI) => {
      cardsMatchedValues.push(card.matched);
    })

    let allMatched: boolean = false;

    if (cardsMatchedValues.length > 0) {
      allMatched = cardsMatchedValues.every((val: boolean) => val);
    }

    if (allMatched) {
      setTimeout(() => {

        addScore(turns)

        console.log("checkAllCardsMatched")
        console.log(numberOfPlayers)
        console.log(scores)

        if (numberOfPlayers === scores.length) {
          // all players have had their turn, game over

          setTimeout(() => {
            alert('reset the game')
            fetchSomeNewCats()
            resetGame()
            playPlayerCompleteSFX()
          }, 5000)

        } else {
          fetchSomeNewCats()
          resetTurns()
          playPlayerCompleteSFX()
        }
      }, 500)

    }
  }

  const itsAMatch: HTMLAudioElement = new Audio(success)
  const playerComplete: HTMLAudioElement = new Audio(success1)

  const playSuccessSFX: () => void = () => {
    itsAMatch.play()
  }

  const playPlayerCompleteSFX: () => void = () => {
    playerComplete.play()
  }

  useEffect(() => {

    if (choiceOne && choiceTwo) {

      if (choiceOne === choiceTwo) {
        console.log("match")
        playSuccessSFX()
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

        }, 500)

        resetTurns()
      }

    }

  }, [choiceOne, choiceTwo])

  useEffect(() => {
    checkAllCardsMatched(cards)
  }, [cards])

  return (
    <div className="container">
      <h1>Memory Game</h1>
      <p>The aim of the game is to match up all the cards in the fewest turns possible. Good luck!</p>

      <h2 className={`player-turns ${gameStarted}`}>Player {scores.length + 1 !== numberOfPlayers + 1 && scores.length + 1}: Turns = {turns}</h2>
      <h3>select number of players</h3>
      <div>
        <button className="button button--round" onClick={removePlayer}>-</button>
        <span className="number-of-players">{numberOfPlayers}</span>
        <button className="button button--round" onClick={addPlayer}>+</button>
      </div>
      <button onClick={startGame} className="button">start game</button>
      {scores.length > 0 && scores.map((score, i) => {
        return (
          <p key={score + i}>Player {i + 1} score: {score}</p>
        )
      })}
      <div className={`cards ${gameStarted}`}>
        {cards.length > 0 ? cards.map((card: CardI, i: number) => {

          const { id, url, matched }: { id: string, url: string, matched: boolean } = card

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
    </div>
  )

}

const mapStateToProps = (state: any) => ({
  cards: state.cardsState.cards,
  choiceOne: state.turnsState.choiceOne,
  choiceTwo: state.turnsState.choiceTwo,
  turns: state.turnsState.turns,
  currentCardKey: state.turnsState.currentCardKey,
  prevCardKey: state.turnsState.prevCardKey,
  numberOfPlayers: state.turnsState.numberOfPlayers,
  scores: state.turnsState.scores,
  gameStarted: state.turnsState.gameStarted
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    dispatch,
    ...bindActionCreators({ saveCards, setChoiceOne, setChoiceTwo, setTurns, updateCards, setCurrentCardKey, setPrevCardKey, incrementPlayers, decrementPlayers, addScore, setGameStarted, resetGame }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

