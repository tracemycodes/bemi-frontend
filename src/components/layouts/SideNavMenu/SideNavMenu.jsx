import React, { useContext, useEffect, useState } from "react";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiUser,
  FiX,
  FiChevronRight,
} from "react-icons/fi";
import { BiShoppingBag } from "react-icons/bi";
import { SideNav } from "./sideNavStyle";
import { NavLink, Link } from "react-router-dom";
import BemiIvoryContext from "../../../context/BemiIvory/bemiIvoryContext";

const SideNavMenu = () => {
  const bemiIvoryContext = useContext(BemiIvoryContext);
  const { state, dispatch } = bemiIvoryContext;
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setToggle(state.navBarState);
  }, [state.navBarState]);

  return (
    <>
      {state.navBarState && (
        <SideNav toggle={toggle}>
          <nav
            className={`sideNav h-screen w-72 bg-black text-white md:w-80 px-4 pt-8 `}
          >
            <FiX
              onClick={() => dispatch({ type: "TOGGLE_NAVBAR" })}
              size={"28"}
              className="cancelIcon flex justify-right text-right items-end cursor-pointer"
            />
            <div className="flex flex-row text-darkgray gap-x-4 text-lg justify-center mt-5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="socialLink"
              >
                <FiFacebook />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="socialLink"
              >
                <FiInstagram />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="socialLink"
              >
                <FiTwitter />
              </a>
              <a
                href="https://youtube.com/"
                target="_blank"
                rel="noreferrer"
                className="socialLink"
              >
                <FiYoutube />
              </a>
            </div>
            <input
              type="text"
              className="w-full text-navlink bg-black outline-none searchInput mt-5 p-2 mb-2"
              placeholder="search"
            />
            <ul className="text-navlink text-xs">
              <li className="navLinkItem">
                <NavLink
                  to="category"
                  className="flex flex-row justify-between items-center text-center py-3"
                >
                  ALL PRODUCTS
                  <FiChevronRight size={"20"} />
                </NavLink>
              </li>
              <li className="navLinkItem">
                <NavLink
                  to="category"
                  className="flex flex-row justify-between items-center text-center py-4"
                >
                  NEW IN
                  <FiChevronRight size={"20"} />
                </NavLink>
              </li>
              <li className="navLinkItem">
                <NavLink
                  to="category"
                  className="flex flex-row justify-between items-center text-center py-4"
                >
                  SIGNATURE COLLECTION
                  <FiChevronRight size={"20"} />
                </NavLink>
              </li>
              <li className="navLinkItem">
                <NavLink
                  to="category"
                  className="flex flex-row justify-between items-center text-center py-4"
                >
                  KIDS
                  <FiChevronRight size={"20"} />
                </NavLink>
              </li>
              <li className="navLinkItem">
                <NavLink
                  to="category"
                  className="flex flex-row justify-between items-center text-center py-4"
                >
                  BEST SELLERS
                  <FiChevronRight size={"20"} />
                </NavLink>
              </li>
              <li className="navLinkItem">
                <NavLink
                  to="about-us"
                  className="flex flex-row justify-between items-center text-center py-4"
                >
                  ABOUT US
                  <FiChevronRight size={"20"} />
                </NavLink>
              </li>
              <li className="navLinkItem flex flex-row  items-center text-center py-4">
                <FiUser size={"20"} />
                <Link to="/login" className="pl-4">
                  Login In/
                </Link>
                <Link to="/signup" className="">
                  Register
                </Link>
              </li>
              <li className="navLinkItem cartLink mt-4">
                <NavLink
                  to="about-us"
                  className="flex flex-row justify-between items-center text-center py-2.5 px-2"
                >
                  CART
                  <BiShoppingBag size={"20"} />
                </NavLink>
              </li>
            </ul>
          </nav>
        </SideNav>
      )}
    </>
  );
};

export default SideNavMenu;
