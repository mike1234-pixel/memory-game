import rootReducer from '../reducers/index'
import { configureStore } from '@reduxjs/toolkit' // configure store creates a store and provides redux dev tools, used in place of the standard createStore
import thunk from 'redux-thunk'

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
})

export default store;