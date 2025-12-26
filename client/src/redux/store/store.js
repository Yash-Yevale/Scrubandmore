import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { cartReducer } from "../features/cart/reducer";
import { homeReducer } from "../features/home/reducer";
import { pathReducer } from "../features/path/reducers";
import { prodReducer } from "../features/products/reducers";
import { favouriteReducer } from "../features/favourite/reducer";

/* ---------- ROOT REDUCER ---------- */
const rootReducer = combineReducers({
  prodReducer,
  pathReducer,
  homeReducer,
  cartReducer,
  favouriteReducer,
});

/* ---------- STORE ---------- */
export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
