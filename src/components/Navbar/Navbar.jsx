import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiSearch,
  FiMenu,
  FiHeart,
} from "react-icons/fi";
import { BiShoppingBag } from "react-icons/bi";
import { BemiNav } from "./NavbarStyle";
import bemiLogo from "../../assets/images/bemi-logo.png";
import SideNavMenu from "../layouts/SideNavMenu/SideNavMenu";
import BemiIvoryContext from "../../context/BemiIvory/bemiIvoryContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import DropDown from "../shared/DropDown/DropDown";

function Navbar() {
  const bemiIvoryContext = useContext(BemiIvoryContext);
  const { state, dispatch } = bemiIvoryContext;

  const [navBar, setNavbar] = useState(false);
  const [storage, setStorage] = useLocalStorage("ivoryStore", []);
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    changeBackground();
    dispatch({ type: "UPDATE_COUNT", payload: storage.length });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setCartItems(state.cartBag);
  }, [state.cartBag]);

  const changeBackground = () => {
    if (window.scrollY >= 20) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBackground);

  let activeStyle = {
    textDecoration: "underline",
  };

  let activeClassName = "underline";

  return (
    <BemiNav>
      <header
        className={`px-4 text-darkgray text-xl fixed top-0 left-0 lg:relative ${
          navBar && "bg-black nav-active"
        } w-full flex flex-row items-center justify-between lg:px-6 pb-1 pt-2 ${
          state.navBarShed && "bg-black nav-active"
        }`}
      >
        <FiMenu
          size={"25"}
          className="cursor-pointer lg:hidden"
          onClick={() => dispatch({ type: "TOGGLE_NAVBAR" })}
        />

        <div
          className={
            navBar
              ? "hidden lg:flex text-center text-lg gap-x-2"
              : "mediaIcons hidden lg:flex text-center text-lg gap-x-2"
          }
        >
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

        <Link
          to={"/"}
          onClick={() => dispatch({ type: "NAVBAR_SHED", payload: false })}
        >
          <div className="w-28 md:w-40 lg:w-48">
            <img src={bemiLogo} alt="logo" srcSet="" />
          </div>
        </Link>

        <div className="flex text-center text-lg gap-x-2 ">
          <DropDown />
          <FiHeart />

          <div className="shop-cart" onClick={() => dispatch({ type: "TOGGLE_CART" })}>
            <BiShoppingBag />
            <div className="cart-num">
              {cartItems > 0 && (
                <span>
                  {cartItems}
                </span>
              )}
            </div>
          </div>

          <FiSearch className="hidden md:block" />
        </div>
      </header>

      <nav
        className={
          navBar
            ? `px-4 text-darkgray text-xl hidden lg:flex flex-row justify-between text-center items-center lg:px-6 py-3 fixed top-0 left-0 right-0 bg-black`
            : `px-4 text-darkgray text-xl hidden lg:flex flex-row justify-between text-center items-center lg:px-6 py-3 ${
                state.navBarShed ? "bg-black" : ""
              }`
        }
      >
        <div
          className={
            navBar ? "hidden lg:flex text-center text-lg gap-x-2" : "hidden"
          }
        >
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

        <ul className="w-6/12 m-auto flex flex-row justify-between text-navlink text-xs font-bold items-center text-center lg:w-7/12 xl:w-6/12">
          <li className="">
            <NavLink
              to="category"
              onClick={() => dispatch({ type: "NAVBAR_SHED", payload: true })}
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              ALL PRODUCTS
            </NavLink>
          </li>
          <li>
            <NavLink
              to="category"
              onClick={() => dispatch({ type: "NAVBAR_SHED", payload: true })}
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              NEW IN
            </NavLink>
          </li>
          <li>
            <NavLink
              to="category"
              onClick={() => dispatch({ type: "NAVBAR_SHED", payload: true })}
            >
              {({ isActive }) => (
                <span className={isActive ? activeClassName : undefined}>
                  SIGNATURE COLLECTION
                </span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="category"
              onClick={() => dispatch({ type: "NAVBAR_SHED", payload: true })}
            >
              {({ isActive }) => (
                <span className={isActive ? activeClassName : undefined}>
                  KIDS
                </span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="category"
              onClick={() => dispatch({ type: "NAVBAR_SHED", payload: true })}
            >
              {({ isActive }) => (
                <span className={isActive ? activeClassName : undefined}>
                  BEST SELLERS
                </span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="about-us"
              onClick={() => dispatch({ type: "NAVBAR_SHED", payload: true })}
            >
              {({ isActive }) => (
                <span className={isActive ? activeClassName : undefined}>
                  ABOUT US
                </span>
              )}
            </NavLink>
          </li>
        </ul>

        <div
          className={
            navBar ? "hidden lg:flex text-center text-lg gap-x-2" : "hidden"
          }
        >
          <DropDown />

          <FiHeart />

          <div className="shop-cart" onClick={() => dispatch({ type: "TOGGLE_CART" })}>
            <BiShoppingBag />
            <div className="cart-num">
              {state.cartBag > 0 && (
                <span>
                  {state.cartBag}
                </span>
              )}
            </div>
          </div>

          <FiSearch className="hidden md:block" />
        </div>
      </nav>

      <SideNavMenu />
    </BemiNav>
  );
}
export default Navbar;
