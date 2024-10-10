import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { autReducer } from "./Auth/Reducer";
import { postReducer } from "./Post/Reducer";

const rootReducers = combineReducers({

    auth:autReducer,
    post:postReducer
})

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));