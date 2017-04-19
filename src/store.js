import { combinedReducers, initialState } from './reducers'
import { createStore } from 'redux'

const store = createStore(combinedReducers, initialState)
export default store
