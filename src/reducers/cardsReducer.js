const INITIAL_STATE = {
    cards: [],
};

const cardsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SAVE_CARDS':
            return { ...state, cards: action.cards };
        default: return state;
    }
}

export default cardsReducer;