import React, { useContext, useEffect, useState } from "react"
import { FaTimes } from "react-icons/fa"
import BemiIvoryContext from "../../../context/BemiIvory/bemiIvoryContext"
import { SideBarModal } from "./rightSideBarStyle"

const RightSideBar = ({
  title,
  children,
}) => {

  const bemiIvoryContext = useContext(BemiIvoryContext)
  const {state, dispatch} = bemiIvoryContext
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    setToggle(state.cartState)
  }, [state.cartState])

  return (
    <>
        <SideBarModal toggle={toggle}>
          <div className="rightSideBar-container">
            <div className="rightSideBar-Header">
              <h3 className="profileDetailsHeader-title">{title}</h3>
              <FaTimes
                className="faTimesCancel"
                onClick={() => dispatch({type: "TOGGLE_CART"})}
              />
            </div>
            {children}
          </div>
        </SideBarModal>
    
    </>
  )
}

export default RightSideBar
