import { combineReducers } from 'redux'
import cardsReducer from './cardsReducer'
import turnsReducer from './turnsReducer'
import { StateType } from 'typesafe-actions'

const rootReducer = combineReducers({
    turnsState: turnsReducer,
    cardsState: cardsReducer,

});

export type RootState = StateType<typeof rootReducer>

export default rootReducer;