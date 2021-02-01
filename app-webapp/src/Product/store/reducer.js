import React from "react";

export const StoreContext = React.createContext(null);

export const actions = {
  GET_PRODUCTS: "get products",
  GET_PRODUCTS_SUCCESS: "get products success",
};

export const createAction = (type, payload) => {
  return {
    type,
    payload,
  };
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.GET_PRODUCTS:
      return {
        ...state,
        loadingItems: true,
      };
    case actions.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loadingItems: false,
      };
    default:
      return state;
  }
};
