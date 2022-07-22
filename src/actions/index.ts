import * as types from '../constants/index'
import { Action, Dispatch } from "redux"
import axios, { AxiosResponse, AxiosError } from "axios"
import CardI from '../types/Card'
import * as CardsActions from '../reducers/cardsReducer'
import * as TurnsActions from '../reducers/turnsReducer'

export const saveCards: () => (dispatch: Dispatch<CardsActions.SaveCardsAction>) => Promise<void> = () => {

    return (dispatch) => {

        return axios.get('https://api.thecatapi.com/v1/images/search?limit=6')
            .then((response: AxiosResponse) => {
                let cards: Array<CardI> = response.data.concat(response.data).map((element: CardI) => ({
                    ...element,
                    matched: false
                })) // duplicate the cards, and add the matched property to each card

                cards = [...cards].sort(() => Math.random() - 0.5) // shuffle the cards

                dispatch({ type: types.SAVE_CARDS, payload: cards })
            })
            .catch((error: AxiosError) => console.error(error))
    }
}
export const updateCards: (payload: Array<CardI>) => CardsActions.SaveCardsAction = (payload) => {
    return { type: types.SAVE_CARDS, payload }
}

export const setTurns: (payload: number) => TurnsActions.SetTurnAction = (payload) => {
    return { type: types.SET_TURNS, payload }
}

export const setChoiceOne: (payload: string) => TurnsActions.SetChoiceOneAction = (payload) => {
    return { type: types.SET_CHOICE_ONE, payload }
}

export const setChoiceTwo: (payload: string) => TurnsActions.SetChoiceTwoAction = (payload) => {
    return { type: types.SET_CHOICE_TWO, payload }
}

export const setCurrentCardKey: (payload: string) => TurnsActions.SetCurrentCardKeyAction = (payload) => {
    return { type: types.SET_CURRENT_CARD_KEY, payload }
}

export const setPrevCardKey: (payload: string) => TurnsActions.SetPrevCardKeyAction = (payload) => {
    return { type: types.SET_PREV_CARD_KEY, payload }
}

export const incrementPlayers: () => TurnsActions.IncrementPlayersAction = () => {
    return { type: types.INCREMENT_PLAYERS }
}

export const decrementPlayers: () => TurnsActions.DecrementPlayersAction = () => {
    return { type: types.DECREMENT_PLAYERS }
}

export const addScore: (payload: number) => TurnsActions.AddScoreAction = (payload) => {
    return { type: types.ADD_SCORE, payload }
}

export const setGameStarted: (payload: string) => TurnsActions.SetGameStartedAction = (payload) => {
    return { type: types.SET_GAME_STARTED, payload }
}

export const resetGame: () => TurnsActions.ResetGameAction = () => {
    return { type: types.RESET_GAME }
}




