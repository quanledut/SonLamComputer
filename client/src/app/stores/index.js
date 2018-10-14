import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import rootSaga from './sagas/index'

const logger = store => next => action => {
    let result
    console.groupCollapsed("dispatching", action.type)
    console.log('prev state', store.getState())
    console.log('action', action)
    result = next(action)
    console.log('next state', store.getState())
    console.groupEnd()
    return result
}

const sagaMiddleware = createSagaMiddleware()

const store = applyMiddleware(logger, sagaMiddleware)(createStore)(reducers)

sagaMiddleware.run(rootSaga)

export default store