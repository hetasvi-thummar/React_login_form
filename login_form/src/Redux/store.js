import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import loginReducer from "./reducers/login";
import addPasteReducer from "./reducers/addpaste";
import fetchPasteReducer from "./reducers/fetchpaste";
import deletePasteReducer from "./reducers/deletepaste";
import editPasteReducer from "./reducers/editpaste";

const rootReducer = combineReducers({
  loginReducer,
  addPasteReducer,
  fetchPasteReducer,
  deletePasteReducer,
  editPasteReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export { store };
