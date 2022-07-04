const INITIAL_STATE = {
    turns: 0,
    choiceOne: null,
    choiceTwo: null,
    currentCardKey: '',
    prevCardKey: ''
};

const turnsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_TURNS':
            return { ...state, turns: action.turns }
        case 'SET_CHOICE_ONE':
            return { ...state, choiceOne: action.cardId };
        case 'SET_CHOICE_TWO':
            return { ...state, choiceTwo: action.cardId };
        case 'SET_CURRENT_CARD_KEY':
            return { ...state, currentCardKey: action.currentCardKey };
        case 'SET_PREV_CARD_KEY':
            return { ...state, prevCardKey: action.prevCardKey };
        default: return state;
    }
}

export default turnsReducer;