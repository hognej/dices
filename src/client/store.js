import { compose, applyMiddleware, createStore } from "redux"

import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import { save, load } from "redux-localstorage-simple"

import reducer from "./reducers"

const createStoreWithMiddleware 
    = applyMiddleware(
        promise(), thunk, logger(), save()
    )(createStore)


const store = createStoreWithMiddleware(
    reducer,    
    load()
)    

export default store
