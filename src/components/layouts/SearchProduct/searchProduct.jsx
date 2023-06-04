/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react"
import Button from "../../shared/Button/button"
import InputLabel from "../../shared/inputLabel/inputLabel"
import RightSideBar from "../../shared/RightSideBar/rightSideBar"

const searchProduct = () => {
  const [showDialog, setShowDialog] = useState(true)

  return (
    <div>
      <RightSideBar
        setShowRightSidebar={setShowDialog}
        showRightSidebar={showDialog}
        title={"Search Products"}
      >
        <form className="addVoterManualForm">
          <InputLabel
            // labelValue={"search"}
            inputType={"text"}
            inputName={"password"}
            placeHolder={"Search products"}
            // handleInputChange={handleOnChange}
            // inputValue={password}
          />
          <Button buttonText={"Search"} classnames="searchBtn" />
        </form>
      </RightSideBar>
    </div>
  )
}

export default searchProduct
