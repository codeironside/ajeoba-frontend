import reduxThunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import reducer from "./index";

export const store = createStore(reducer, applyMiddleware(reduxThunk));
