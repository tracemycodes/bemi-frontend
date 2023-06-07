import { useQuery } from "@apollo/client";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { BsCart, BsChevronDown, BsChevronUp } from "react-icons/bs";
import { FiChevronRight } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
// import useLocalStorage from "../../hooks/useLocalStorage";
import { SINGLE_ORDER } from "../../queries/orderQuery";
import Information from "./components/Information";
import Payment from "./components/Payment";
import Shipping from "./components/Shipping";
import { GET_USER } from "../../queries/userQuery";
import BemiIvoryContext from "../../context/BemiIvory/bemiIvoryContext";
import { PURCHASE_REDIRECT } from "../../context/types";

const CheckoutLayout = () => {
  const bemiIvoryContext = useContext(BemiIvoryContext);
  const { dispatch } = bemiIvoryContext;
  const { orderID } = useParams();
  const [screen, setScreen] = useState(0);
  const [shipAddress, setShipAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "",
    state: "",
    zipCode: "",
    phone: "",
    uuid: "",
  });
  const { loading, error, data } = useQuery(SINGLE_ORDER, {
    variables: { orderId: orderID },
  });
  const {
    loading: userLoading,
    data: userData,
    error: userError,
  } = useQuery(GET_USER);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userData) {
      setUser(userData?.getUser);
      setShipAddress({ ...shipAddress, uuid: userData?.getUser._id });
    }
    dispatch({ type: PURCHASE_REDIRECT, payload: true });
    //eslint-disable-next-line
  }, [userLoading, userData, userError]);

  const [summary, setSummary] = useState(false);

  const changeTabIndex = (tab, data) => {
    setScreen(tab);
    if (tab === 1) {
      setShipAddress({ ...shipAddress, ...data });
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row align-middle relative">
      <div className="sm:w-11/12 w-full mx-auto pt-6 md:pt-16 px-4 sm:pl-8 xl:pl-40 h-screen overflow-auto sm:pr-6 xl:pr-12 md:w-6/12 lg:w-7/12 flex flex-col">
        <Link className="text-2xl hidden md:flex">BEMI IVORY</Link>
        <div className="flex items-center gap-2 mb-4 md:my-4">
          <p className="flex items-center gap-2">
            Shipping <FiChevronRight />
          </p>
          <p
            className={`flex items-center gap-2 ${
              screen < 1 ? "opacity-40" : ""
            }`}
          >
            Information <FiChevronRight />
          </p>
          <p
            className={`flex items-center gap-2 ${
              screen < 2 ? "opacity-40" : ""
            }`}
          >
            Payment <FiChevronRight />
          </p>
        </div>

        {screen === 0 ? (
          <Information changeTabIndex={changeTabIndex} user={user} />
        ) : screen === 1 ? (
          <Shipping
            changeTabIndex={changeTabIndex}
            user={user}
            shipAddress={shipAddress}
          />
        ) : (
          <Payment
            changeTabIndex={changeTabIndex}
            user={user}
            orderID={orderID}
            shipAddress={shipAddress}
            productData={data?.singleOrder?.products}
          />
        )}

        <div className="my-3 mt-auto grid sm:grid-cols-4 grid-cols-2 place-content-between border-t border-darkgray pt-3">
          <Link className="text-sm text-skyblue">Refund policy</Link>
          <Link className="text-sm text-skyblue">Shipping policy</Link>
          <Link className="text-sm text-skyblue">Privacy policy</Link>
          <Link className="text-sm text-skyblue">Terms of service</Link>
        </div>
      </div>

      <div
        className={`md:w-6/12 lg:w-5/12 md:pt-16 pr-8 xl:pr-40 pl-6 xl:pl-12 border-l ${
          summary ? "h-fit" : "h-0"
        } md:min-h-screen border-darkgray overflow-y-auto bg-gray relative`}
      >
        <div className="max-h-64 overflow-y-auto">
          {data?.singleOrder?.products?.map((item, idx) => (
            <div
              className="border-b border-darkgray pb-5 mt-5 flex align-middle relative"
              key={item.name + idx}
            >
              <div className="w-16 h-20 relative object-cover">
                <img src={item.image} alt="img" className="w-full h-full" />
                <p className=" absolute top-[-0.35rem] right-[-0.35rem] text-white bg-ash text-xs h-4 w-4 flex align-middle justify-center self-center rounded-full">
                  {item.count}
                </p>
              </div>
              <div className="self-center ml-6">
                <p>{item.name}</p>
                <p>{item.color}</p>
              </div>
              <p className="self-center ml-auto">${item.price}</p>
            </div>
          ))}
        </div>

        <div className="py-5 border-b border-darkgray">
          <p className="flex justify-between">
            Subtotal{" "}
            <span>
              $
              {data?.singleOrder?.products?.reduce(
                (acc, cur) => acc + +cur.price,
                0
              )}
            </span>
          </p>
          <p className="flex mt-3">
            Shipping
            <span className="ml-2 w-4 h-4 text-sm rounded-full bg-ash text-white flex align-middle justify-center self-center">
              ?
            </span>
            <span className="ml-auto">Calculated at next step</span>
          </p>
        </div>

        <div className="flex align-middle justify-between my-5">
          <p>Total</p>
          <p>
            USD{" "}
            <span className="text-lg font-bold">
              $
              {data?.singleOrder?.products?.reduce(
                (acc, cur) => acc + +cur.price,
                0
              )}
            </span>
          </p>
        </div>
      </div>

      <div className="md:hidden">
        <h2 className="text-2xl py-7 px-4 md:hidden">BEMI IVORY</h2>
        <div className="flex justify-between sm:py-6 py-4 sm:px-6 px-3 border border-darkgray  bg-gray md:hidden text-sm">
          <div
            className="flex items-center align-middle cursor-pointer"
            onClick={() => setSummary(!summary)}
          >
            <BsCart className="text-skyblue text-xl" />
            <p className="mx-3 text-skyblue">Show order summary</p>

            {summary ? (
              <BsChevronUp className="font-extrabold text-skyblue self-center" />
            ) : (
              <BsChevronDown className="font-extrabold text-skyblue self-center" />
            )}
          </div>
          <p>
            $
            {data?.singleOrder?.products?.reduce(
              (acc, cur) => acc + +cur.price,
              0
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutLayout;
