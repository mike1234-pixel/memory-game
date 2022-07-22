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

export interface SetTurnAction {
    type: 'SET_TURNS',
    payload: number,
}

export interface SetChoiceOneAction {
    type: 'SET_CHOICE_ONE',
    payload: null | string
}

export interface SetChoiceTwoAction {
    type: 'SET_CHOICE_TWO',
    payload: null | string
}

export interface SetCurrentCardKeyAction {
    type: 'SET_CURRENT_CARD_KEY',
    payload: string,
}

export interface SetPrevCardKeyAction {
    type: 'SET_PREV_CARD_KEY',
    payload: string,
}

export interface IncrementPlayersAction {
    type: 'INCREMENT_PLAYERS'
}

export interface DecrementPlayersAction {
    type: 'DECREMENT_PLAYERS'
}

export interface AddScoreAction {
    type: 'ADD_SCORE',
    payload: number
}

export interface SetGameStartedAction {
    type: 'SET_GAME_STARTED',
    payload: string,
}

export interface ResetGameAction {
    type: 'RESET_GAME'
}

type TurnsAction = 
    SetTurnAction 
    | SetChoiceOneAction 
    | SetChoiceTwoAction 
    | SetCurrentCardKeyAction 
    | SetPrevCardKeyAction 
    | IncrementPlayersAction 
    | DecrementPlayersAction
    | AddScoreAction
    | SetGameStartedAction
    | ResetGameAction

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

const turnsReducer = (state: State = INITIAL_STATE, action: TurnsAction) => {
    switch (action.type) {
        case 'SET_TURNS':
            return { ...state, turns: action.payload }
        case 'SET_CHOICE_ONE':
            return { ...state, choiceOne: action.payload }
        case 'SET_CHOICE_TWO':
            return { ...state, choiceTwo: action.payload }
        case 'SET_CURRENT_CARD_KEY':
            return { ...state, currentCardKey: action.payload }
        case 'SET_PREV_CARD_KEY':
            return { ...state, prevCardKey: action.payload }
        case 'INCREMENT_PLAYERS':
            return { ...state, numberOfPlayers: state.numberOfPlayers + 1 }
        case 'DECREMENT_PLAYERS':
            return { ...state, numberOfPlayers: state.numberOfPlayers - 1 }
        case 'ADD_SCORE':
            return { ...state, scores: state.scores.concat([action.payload]) }
        case 'SET_GAME_STARTED':
            return { ...state, gameStarted: action.payload }
        case 'RESET_GAME':
            return INITIAL_STATE
        default: return state;
    }
}

export default turnsReducer