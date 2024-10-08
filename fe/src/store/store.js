import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { autReducer } from "./Auth/Reducer";

const rootReducers = combineReducers({

    auth:autReducer,
    
})

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));