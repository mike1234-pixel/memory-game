interface State {
    turns: number,
    choiceOne: null | string,
    choiceTwo: null | string,
    currentCardKey: string,
    prevCardKey: string,
    numberOfPlayers: number
    scores: Array<number>,
    gameStarted: string
}

interface Action {
    type: String,
    turns?: number,
    cardId?: null | string,
    currentCardKey?: string,
    prevCardKey?: string,
    score: number,
    gameStarted?: string
}

const INITIAL_STATE = {
    turns: 0,
    choiceOne: null,
    choiceTwo: null,
    currentCardKey: '',
    prevCardKey: '',
    numberOfPlayers: 1,
    scores: [],
    gameStarted: ''
};

const turnsReducer = (state: State = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case 'SET_TURNS':
            return { ...state, turns: action.turns }
        case 'SET_CHOICE_ONE':
            return { ...state, choiceOne: action.cardId }
        case 'SET_CHOICE_TWO':
            return { ...state, choiceTwo: action.cardId }
        case 'SET_CURRENT_CARD_KEY':
            return { ...state, currentCardKey: action.currentCardKey }
        case 'SET_PREV_CARD_KEY':
            return { ...state, prevCardKey: action.prevCardKey }
        case 'INCREMENT_PLAYERS':
            return { ...state, numberOfPlayers: state.numberOfPlayers + 1 }
        case 'DECREMENT_PLAYERS':
            return { ...state, numberOfPlayers: state.numberOfPlayers - 1 }
        case 'ADD_SCORE':
            console.log("turnsReducer")
            console.log(action)
            console.log(state.scores)
            state.scores.push(action.score)
            return { ...state, scores: state.scores }
        case 'SET_GAME_STARTED':
            return { ...state, gameStarted: action.gameStarted }
        case 'RESET_GAME':
            return INITIAL_STATE
        default: return state;
    }
}

export default turnsReducer