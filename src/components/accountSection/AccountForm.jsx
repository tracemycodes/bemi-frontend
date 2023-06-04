import React, { useState } from "react";
import { FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProtectedRoute from "../../utils/ProtectedRoute";
import InputLabel from "../shared/inputLabel/inputLabel";

const AccountForm = () => {
  const [state, setState] = useState(false);
  const [editState, setEditState] = useState(false);

  const handleAddAddress = () => {
    setState(false);
    setEditState(false);
  };

  const handleEditAddress = () => {
    setEditState(true);
    setState(true);
  };
  const handleAddressClose = () => {
    setEditState(false);
    setState(false);
  };

  return (
    <ProtectedRoute>
      <div className="max-w-6xl p-10 my-4 m-auto">
        <div className="flex align-middle justify-between">
          <h2 className="text-3xl">Your Addresses</h2>
          <Link to={"/account"}>
            <button className=" border-b">My account</button>
          </Link>
        </div>
        <ul className="my-6 border-t border-b py-4">
          <li className="flex align-middle justify-end gap-7">
            <div className=" mr-auto">
              <p>lagos</p>
              <p>Nigeria</p>
            </div>
            <button
              className="flex gap-3 align-middle justify-between"
              onClick={handleEditAddress}
            >
              <div className="self-center">
                <FaEdit />
              </div>
              <p className="self-center">edit</p>
            </button>
            <button className="flex gap-3 align-middle justify-between">
              {" "}
              <div className="self-center">
                {" "}
                <FaTrash />{" "}
              </div>{" "}
              <p className="self-center">delete</p>
            </button>
          </li>
        </ul>
        <button
          className=" text-sm my-5 py-3 px-6 bg-black text-white"
          onClick={() => setState(true)}
        >
          ADD A NEW ADDRESS
        </button>

        {state && (
          <div className="absolute h-screen w-screen overflow-y-scroll border z-10 bg-black-opacity top-0 left-0">
            <div className=" max-w-xl p-10 z-20 my-28 m-auto bg-white border">
              <div className="float-right" onClick={handleAddressClose}>
                <FaTimes />
              </div>
              <h2 className="text-3xl my-4 text-center">
                {editState ? "Edit address" : "Add a new address"}
              </h2>
              <form>
                <InputLabel
                  labelValue={"First name"}
                  placeHolder={"first name"}
                />
                <InputLabel
                  labelValue={"Last name"}
                  placeHolder={"last name"}
                />
                <InputLabel
                  labelValue={"Address"}
                  placeHolder={"your address"}
                />
                <InputLabel
                  labelValue={"Apartment, suite, etc."}
                  placeHolder={"first name"}
                />
                <InputLabel labelValue={"City"} placeHolder={"city"} />
                <InputLabel
                  labelValue={"Country/Region"}
                  placeHolder={"Enter your country/region"}
                />
                <InputLabel
                  labelValue={"State"}
                  placeHolder={"Enter your state"}
                />
                <InputLabel
                  labelValue={"Postal/Zip Code"}
                  placeHolder={"Enter your zip code"}
                />
                <InputLabel
                  labelValue={"Phone"}
                  placeHolder={"Enter your phone number"}
                />
                <input type="checkbox" name="checkbox" id="checkbox" />
                <label htmlFor="checkbox">set as default address</label>
                <button
                  className=" block p-3 bg-black text-white text-center w-full my-4"
                  onClick={handleAddAddress}
                >
                  {editState ? "UPDATE ADDRESS" : "ADD ADDRESS"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default AccountForm;
