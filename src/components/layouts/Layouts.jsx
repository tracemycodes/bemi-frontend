import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ProductCart from "./ProductCart/productCart";
import BemiIvoryContext from "../../context/BemiIvory/bemiIvoryContext";
import useReactPath from "../../hooks/useReactPath";

function Layouts() {
  const bemiIvoryContext = useContext(BemiIvoryContext);
  const { state, dispatch } = bemiIvoryContext;

  const path = useReactPath()

  useEffect(() => {
    if (path !== "/") {
      dispatch({type: "NAVBAR_SHED", payload: true})
    } else {
      dispatch({type: "NAVBAR_SHED", payload: false})
      
    }
  }, [path, dispatch])

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
      {state?.cartState && <ProductCart />}
    </div>
  );
}

export default Layouts;
