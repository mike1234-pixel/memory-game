import * as types from '../constants/index'
import axios from "axios"

export const saveCards = () => {

    return (dispatch) => {

        return axios.get('https://api.thecatapi.com/v1/images/search?limit=6')
            .then((response) => {
                let cards = response.data.concat(response.data).map((element) => ({
                    ...element,
                    matched: false
                })) // duplicate the cards, and add the matched property to each card

                cards = [...cards].sort(() => Math.random() - 0.5) // shuffle the cards

                dispatch({ type: types.SAVE_CARDS, cards })
            })
            .catch((error) => console.error(error))
    }
}

export const updateCards = (cards) => {
    return { type: types.SAVE_CARDS, cards }
}

export const setTurns = (turns) => {
    return { type: types.SET_TURNS, turns }
}

export const setChoiceOne = (cardId) => {
    return { type: types.SET_CHOICE_ONE, cardId }
}

export const setChoiceTwo = (cardId) => {
    return { type: types.SET_CHOICE_TWO, cardId }
}

// when saving the cards, each card should have a matched property

