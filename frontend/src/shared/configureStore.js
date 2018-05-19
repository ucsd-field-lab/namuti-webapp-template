import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import { createLogger } from 'redux-logger'
import promise from 'redux-promise-middleware'

const middleware = applyMiddleware(promise(), thunk, createLogger())

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        middleware
    )
} 


