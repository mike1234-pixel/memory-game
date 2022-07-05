import * as types from '../constants/index'
import { Action, Dispatch } from "redux"
import axios, { AxiosResponse, AxiosError } from "axios"
import CardI from '../types/Card'

export const saveCards: () => (dispatch: Dispatch) => Promise<void> = () => {

    return (dispatch: Dispatch) => {

        return axios.get('https://api.thecatapi.com/v1/images/search?limit=1s')
            .then((response: AxiosResponse) => {
                let cards: Array<CardI> = response.data.concat(response.data).map((element: CardI) => ({
                    ...element,
                    matched: false
                })) // duplicate the cards, and add the matched property to each card

                cards = [...cards].sort(() => Math.random() - 0.5) // shuffle the cards

                dispatch({ type: types.SAVE_CARDS, cards })
            })
            .catch((error: AxiosError) => console.error(error))
    }
}
export const updateCards: (cards: Array<CardI>) => Action = (cards) => {
    return { type: types.SAVE_CARDS, cards }
}

export const setTurns: (turns: number) => Action = (turns: number) => {
    return { type: types.SET_TURNS, turns }
}

export const setChoiceOne: (cardId: string) => Action = (cardId: string) => {
    return { type: types.SET_CHOICE_ONE, cardId }
}

export const setChoiceTwo: (cardId: string) => Action = (cardId: string) => {
    return { type: types.SET_CHOICE_TWO, cardId }
}

export const setCurrentCardKey: (currentCardKey: string) => Action = (currentCardKey: string) => {
    return { type: types.SET_CURRENT_CARD_KEY, currentCardKey }
}

export const setPrevCardKey: (prevCardKey: string) => Action = (prevCardKey: string) => {
    return { type: types.SET_PREV_CARD_KEY, prevCardKey }
}

export const incrementPlayers: () => Action = () => {
    return { type: types.INCREMENT_PLAYERS }
}

export const decrementPlayers: () => Action = () => {
    return { type: types.DECREMENT_PLAYERS }
}

export const addScore: (score: number) => Action = (score: number) => {
    return { type: types.ADD_SCORE, score }
}

export const setGameStarted: (gameStarted: string) => Action = (gameStarted: string) => {
    return { type: types.SET_GAME_STARTED, gameStarted }
}

export const resetGame: () => Action = () => {
    return { type: types.RESET_GAME }
}




