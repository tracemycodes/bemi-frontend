import React from "react";
import {
  TOGGLE_CART,
  TOGGLE_NAVBAR,
  UPDATE_COUNT,
  NAVBAR_SHED,
  SAVE_ORDER,
  PROFILE_CHECK
} from "../types";

const bemiIvoryReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_CART:
      return {
        ...state,
        cartState: state.cartState ? false : true,
      };
    case TOGGLE_NAVBAR:
      return {
        ...state,
        navBarState: state.navBarState ? false : true,
      };
    case UPDATE_COUNT:
      return {
        ...state,
        cartBag: action.payload,
      };
    case NAVBAR_SHED:
      return {
        ...state,
        navBarShed: action.payload,
      };
    case SAVE_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case PROFILE_CHECK:
      console.log('check');
      return {
        ...state,
        profile: state.profile ? false : true,
      };

    default:
      break;
  }
};

export default bemiIvoryReducer;
