import { combineReducers, createStore } from "redux";
import movementsLocations from "./movementsLocations";
import products from "./products";
import root from "./root";

export const store = createStore(combineReducers({ products, movementsLocations, root }));

export const dispatchAction = (actionType, payload) => {
    store.dispatch({ type: actionType, payload });
}