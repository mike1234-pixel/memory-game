import { combineReducers } from 'redux'
import cardsReducer from './cardsReducer'
import turnsReducer from './turnsReducer'

const rootReducer = combineReducers({
    cardsState: cardsReducer,
    turnsState: turnsReducer,
});

export default rootReducer;