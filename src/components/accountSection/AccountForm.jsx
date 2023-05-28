import React, { useEffect, useRef, useState } from "react";
import { FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProtectedRoute from "../../utils/ProtectedRoute";
import InputLabel from "../shared/inputLabel/inputLabel";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ADDRESS } from "../../queries/userQuery";
import useExternalClick from "../../hooks/useExternalHook";
import { DELETE_ADDRESS, UPDATE_USER } from "../../mutations/clientMutations";
import Button from "../shared/Button/button";
import LightBox from "../shared/LightBox/LightBox";
import { ImWarning } from "react-icons/im";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";

const AccountForm = () => {
  const [state, setState] = useState(false);
  const [editState, setEditState] = useState(false);
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "",
    state: "",
    zipCode: "",
    phone: "",
    default: false,
  });
  const [modal, setModal] = useState(false);
  const [addressId, setAddressId] = useState("");

  const {
    lastName,
    firstName,
    address,
    apartment,
    city,
    country,
    state: daState,
    zipCode,
    phone,
    default: daDefault,
  } = formState;

  const [
    updateUser,
    { loading: updateLoading, data: updateData, error: updateError },
  ] = useMutation(UPDATE_USER, {
    variables: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      apartment: apartment,
      city: city,
      country: country,
      state: daState,
      zipCode: zipCode,
      phone: phone,
      default: daDefault,
    },
  });

  const [
    deleteAddress,
    { data: delData, loading: delLoading, error: delError },
  ] = useMutation(DELETE_ADDRESS, {
    variables: {
      addressId: addressId,
    },
  });

  const ref = useRef(null);
  const cancelButtonRef = useRef(null);

  const { loading, data, error } = useQuery(GET_ADDRESS);

  const handleAddressClose = () => {
    setEditState(false);
    setState(false);
  };

  useEffect(() => {
    handleAddressClose();
  }, [updateData]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleOpenModal = (bool, addID) => {
    if (addID) {
      setAddressId(addID);
    }
    setModal(bool);
  };

  useEffect(() => {
    if (delData) {
      toast.success("item deleted successfully", {
        pauseOnFocusLoss: false,
        position: toast.POSITION.TOP_RIGHT,
      });

      handleOpenModal(false, "");
    }
    if (delError) {
      toast.error(delError.message, {
        pauseOnFocusLoss: false,
        position: toast.POSITION.TOP_RIGHT,
      });
      localStorage.removeItem("token");
    }
    //eslint-disable-next-line
  }, [delLoading, delData]);

  const handleAddAddress = (e) => {
    e.preventDefault();
    updateUser(
      lastName,
      firstName,
      address,
      city,
      country,
      daState,
      zipCode,
      phone,
      daDefault
    );
    console.log(formState);
  };

  const handleEditAddress = (item) => {
    setFormState({ ...formState, ...item });
    setEditState(true);
    setState(true);
  };

  useExternalClick(ref, handleAddressClose);

  const handleForm = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleCheck = (e) => {
    console.dir(typeof e.target.checked);
    setFormState({ ...formState, default: e.target.checked });
  };

  const handleDelete = () => {
    deleteAddress(addressId);
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
          {data &&
            data.getAddress.map((item, index) => (
              <li
                className={`flex align-middle justify-end gap-7 py-3 px-3 ${
                  index % 2 === 1 ? " bg-gray" : ""
                }`}
                key={item._id}
              >
                <div className=" mr-auto">
                  <p>{item?.address}</p>
                  <p>{item?.city}</p>
                </div>

                <button
                  className="flex gap-3 align-middle justify-between"
                  onClick={() => handleEditAddress(item)}
                >
                  <div className="self-center">
                    <FaEdit />
                  </div>
                  <p className="self-center">edit</p>
                </button>

                <button
                  className="flex gap-3 align-middle justify-between"
                  onClick={() => handleOpenModal(true, item._id)}
                >
                  <div className="self-center">
                    <FaTrash />
                  </div>
                  <p className="self-center">delete</p>
                </button>
              </li>
            ))}
        </ul>

        <button
          className=" text-sm my-5 py-3 px-6 bg-black text-white"
          onClick={() => setState(true)}
        >
          ADD A NEW ADDRESS
        </button>

        {state && (
          <div className="absolute h-screen w-screen overflow-y-scroll border z-10 bg-black-opacity top-0 left-0">
            <div
              className="max-w-xl p-10 z-20 my-28 m-auto bg-white border"
              ref={ref}
            >
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
                  inputName={"firstName"}
                  inputValue={formState.firstName}
                  handleInputChange={handleForm}
                />
                <InputLabel
                  labelValue={"Last name"}
                  placeHolder={"last name"}
                  inputName={"lastName"}
                  inputValue={formState.lastName}
                  handleInputChange={handleForm}
                />
                <InputLabel
                  labelValue={"Address"}
                  placeHolder={"your address"}
                  inputName={"address"}
                  inputValue={formState.address}
                  handleInputChange={handleForm}
                />
                <InputLabel
                  labelValue={"Apartment, suite, etc."}
                  placeHolder={"apartment"}
                  inputName={"apartment"}
                  inputValue={formState.apartment}
                  handleInputChange={handleForm}
                />
                <InputLabel
                  labelValue={"City"}
                  placeHolder={"city"}
                  inputName={"city"}
                  inputValue={formState.city}
                  handleInputChange={handleForm}
                />
                <InputLabel
                  labelValue={"Country/Region"}
                  placeHolder={"Enter your country/region"}
                  inputName={"country"}
                  inputValue={formState.country}
                  handleInputChange={handleForm}
                />
                <InputLabel
                  labelValue={"State"}
                  placeHolder={"Enter your state"}
                  inputName={"state"}
                  inputValue={formState.state}
                  handleInputChange={handleForm}
                />
                <InputLabel
                  labelValue={"Postal/Zip Code"}
                  placeHolder={"Enter your zip code"}
                  inputName={"zipCode"}
                  inputValue={formState.zipCode}
                  handleInputChange={handleForm}
                />
                <InputLabel
                  labelValue={"Phone"}
                  placeHolder={"Enter your phone number"}
                  inputName={"phone"}
                  inputValue={formState.phone}
                  handleInputChange={handleForm}
                />
                <input
                  type="checkbox"
                  name="checkbox"
                  id="checkbox"
                  onChange={handleCheck}
                />
                <label htmlFor="checkbox">set as default address</label>
                <Button
                  buttonText={editState ? "UPDATE ADDRESS" : "ADD ADDRESS"}
                  classnames="loginBtn mt-4"
                  handleClick={handleAddAddress}
                  loading={updateLoading}
                />
              </form>
            </div>
          </div>
        )}
      </div>

      <LightBox
        modal={modal}
        handleOpenModal={handleOpenModal}
        cancelButtonRef={cancelButtonRef}
      >
        <div className="sm:my-8 px-6">
          <div className="flex gap-4 items-center">
            <div className="p-2 rounded-full bg-red/20">
              <ImWarning className="text-red text-lg" />
            </div>
            <h2>Delete Address</h2>
          </div>

          <p className="text-sm text-text-para my-4">
            Are you sure you want to permanently delete this address
          </p>

          <div className="bg-gray-50 sm:flex sm:flex-row-reverse mt-8">
            <button
              type="button"
              className="mt-3 inline-flex gap-2 w-full justify-center rounded-md border-2 border-red/80 bg-red/70 text-white bg-white px-4 py-2 text-base font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red/20 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleDelete}
            >
              {delLoading && (
                <ReactLoading
                  type="cylon"
                  color="#fff"
                  className=""
                  height={20}
                  width={20}
                />
              )}
              Delete
            </button>

            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md border-2 border-border-blue px-4 py-2 text-base font-medium text-text-header shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-border-blue/20 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => handleOpenModal(false)}
              ref={cancelButtonRef}
            >
              Cancel
            </button>
          </div>
        </div>
      </LightBox>
    </ProtectedRoute>
  );
};

export default AccountForm;
