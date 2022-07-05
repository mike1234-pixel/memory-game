import { combineReducers } from 'redux'
import cardsReducer from './cardsReducer'
import turnsReducer from './turnsReducer'

const rootReducer = combineReducers({
    turnsState: turnsReducer,
    cardsState: cardsReducer,

});

export default rootReducer;