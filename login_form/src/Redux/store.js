import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import loginReducer from "./reducers/login";
import addPasteReducer from "./reducers/addpaste";
import fetchPasteReducer from "./reducers/fetchpaste";
import deletePasteReducer from "./reducers/deletepaste";

const rootReducer = combineReducers({
  loginReducer,
  addPasteReducer,
  fetchPasteReducer,
  deletePasteReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export { store };
