import React, { useContext, useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import BemiIvoryContext from "../../../context/BemiIvory/bemiIvoryContext";
import { SideBarModal } from "./rightSideBarStyle";
import useExternalClick from "../../../hooks/useExternalHook";

const RightSideBar = ({ title, children }) => {
  const bemiIvoryContext = useContext(BemiIvoryContext);
  const { state, dispatch } = bemiIvoryContext;
  const [toggle, setToggle] = useState(false);
  const ref = useRef();

  useExternalClick(ref, () => dispatch({ type: "TOGGLE_CART" }));

  useEffect(() => {
    setToggle(state.cartState);
  }, [state.cartState]);

  return (
    <SideBarModal toggle={toggle}>
      <div className="rightSideBar-container" ref={ref}>
        <div className="rightSideBar-Header">
          <h3 className="profileDetailsHeader-title">{title}</h3>
          <FaTimes
            className="faTimesCancel text-2xl cursor-pointer"
            onClick={() => dispatch({ type: "TOGGLE_CART" })}
          />
        </div>
        {children}
      </div>
    </SideBarModal>
  );
};

export default RightSideBar;
