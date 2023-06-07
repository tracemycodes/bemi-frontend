/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "../../shared/Button/button";
import RightSideBar from "../../shared/RightSideBar/rightSideBar";
import { BemiBag } from "./productCartStyle";
import { AiOutlinePlus } from "react-icons/ai";
import CartItem from "../CartItem/cartItem";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_ORDER } from "../../../mutations/orderMutations";
import BemiIvoryContext from "../../../context/BemiIvory/bemiIvoryContext";

function ProductCart() {
  const bemiIvoryContext = useContext(BemiIvoryContext);
  const { dispatch } = bemiIvoryContext;
  const navigate = useNavigate();
  const [showNote, setShowNote] = useState(false);

  const [storage, setStorage] = useLocalStorage("ivoryStore", []);

  const [addOrder, { data, loading, error }] = useMutation(ADD_ORDER, {
    variables: {
      products: storage,
    },
  });

  useEffect(() => {
    dispatch({ type: "UPDATE_COUNT", payload: storage.length });
    //eslint-disable-next-line
  }, [storage]);

  const handleCount = (check, dress) => {
    let { name, count, stock } = dress;

    if (check && count < stock) {
      setStorage(
        storage.map((item) => {
          if (item.name === name) {
            return { ...item, count: item.count + 1 };
          } else {
            return item;
          }
        })
      );
    } else if (!check && count > 0) {
      setStorage(
        storage.map((item) => {
          if (item.name === name) {
            return { ...item, count: item.count - 1 };
          } else {
            return item;
          }
        })
      );
    } else {
      return;
    }
  };

  const handleRemove = (item) => {
    setStorage(storage.filter((idx) => idx.name !== item.name));
  };

  useEffect(() => {
    if (data) {
      navigate(`/checkout/${data.addOrder._id}`);
    }
    //eslint-disable-next-line
  }, [loading, data]);

  const handleCheckOut = () => {
    addOrder([storage]);
    dispatch({ type: "TOGGLE_CART" })
  };

  return (
    <BemiBag>
      <RightSideBar title={"Your cart"}>
        <div className={"cartContainer"}>
          {storage.length > 0 &&
            storage.map((item, index) => (
              <CartItem
                key={item + index}
                product={item}
                handleCount={handleCount}
                handleRemove={() => handleRemove(item)}
              />
            ))}
        </div>

        <div
          className="orderNote  flex my-6 items-center gap-x-2 cursor-pointer mt-auto"
          onClick={() => setShowNote(!showNote)}
        >
          <div className="iconPlus">
            <AiOutlinePlus />
          </div>
          <span className="underline text-sm">Add order notes</span>
        </div>

        {showNote && (
          <div className="orderNoteForm">
            <label htmlFor="orderNote">Order note</label>
            <textarea
              name=""
              id="orderNote"
              className="w-full bg-gray-50 border border-darkgray text-gray-900 text-sm outline-none  focus:border focus:border-black focus:text-black transition duration-200 rounded-sm pb-4"
            ></textarea>
          </div>
        )}

        <div className="cartFooter">
          <div className="cartFootetSubTotal flex justify-between mb-2">
            <h3>SubTotal</h3>
            <span>
              €{" "}
              {storage.length > 0
                ? storage.reduce((a, b) => a + b.count * +b.price, 0)
                : "0.00"}
            </span>
          </div>
          <p className="mb-2 text-sm text-ash">
            Taxes and shipping calculated at checkout
          </p>
          <Button
            buttonText="CHECKOUT"
            classnames="cartBtn mt-5"
            handleClick={handleCheckOut}
            loading={loading}
          />
        </div>
      </RightSideBar>
    </BemiBag>
  );
}

export default ProductCart;
