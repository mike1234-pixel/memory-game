import CardI from '../Card'

export interface AppProps {
    cards: Array<CardI>,
    saveCards: Function,
    choiceOne: null | string,
    setChoiceOne: Function,
    choiceTwo: null | string,
    setChoiceTwo: Function,
    turns: number,
    setTurns: Function,
    updateCards: Function,
    currentCardKey: string,
    setCurrentCardKey: Function,
    prevCardKey: string,
    setPrevCardKey: Function,
    numberOfPlayers: number,
    incrementPlayers: Function,
    decrementPlayers: Function,
    scores: Array<number>,
    addScore: Function,
    gameStarted: string,
    setGameStarted: Function,
    resetGame: Function
}