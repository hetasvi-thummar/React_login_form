import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import LoginReducer from "./reducers/login";

const rootReducer = combineReducers({ LoginReducer });

const store = createStore(rootReducer, applyMiddleware(thunk));

export { store };