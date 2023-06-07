import React, { useReducer } from "react";
import BemiIvoryContext from "./bemiIvoryContext";
import BemiIvoryReducer from "./bemiIvoryReducer";
import { SAVE_ORDER } from "../types";

const BemiIvoryState = ({ children }) => {
  const initialState = {
    cartState: false,
    navBarState: false,
    navBarShed: false,
    cartBag: 0,
    order: null,
    profile: false,
    purchase: false,
  };

  const [state, dispatch] = useReducer(BemiIvoryReducer, initialState);

  const saveOrder = (order) => {
    dispatch({ type: SAVE_ORDER, payload: order });
  };

  return (
    <BemiIvoryContext.Provider value={{ state, dispatch, saveOrder }}>
      {children}
    </BemiIvoryContext.Provider>
  );
};

export default BemiIvoryState;
