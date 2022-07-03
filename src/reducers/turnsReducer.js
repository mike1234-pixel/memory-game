const INITIAL_STATE = {
    turns: 0,
    choiceOne: null,
    choiceTwo: null,
};

const turnsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_TURNS':
            return { ...state, turns: action.turns }
        case 'SET_CHOICE_ONE':
            return { ...state, choiceOne: action.cardId };
        case 'SET_CHOICE_TWO':
            return { ...state, choiceTwo: action.cardId };
        default: return state;
    }
}

export default turnsReducer;