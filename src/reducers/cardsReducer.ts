import CardI from '../types/Card'

interface State {
    cards: Array<CardI>
}

interface Action {
    type: string,
    cards: Array<CardI>
}

const INITIAL_STATE = {
    cards: [],
};

const cardsReducer = (state: State = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case 'SAVE_CARDS':
            return { ...state, cards: action.cards };
        default: return state;
    }
}

export default cardsReducer;