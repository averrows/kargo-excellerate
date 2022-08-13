import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { LoginStore } from "./Login/reducer";
import { composeWithDevTools } from "@redux-devtools/extension";

export const RootReducer = combineReducers({
  LoginStore,
});

const middleware = [thunk];
const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
