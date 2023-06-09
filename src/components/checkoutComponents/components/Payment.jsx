import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import visa from "../../../assets/images/visa.svg";
import masterCard from "../../../assets/images/mastercard.svg";
import discover from "../../../assets/images/discover.svg";
import { BsCreditCard2Back } from "react-icons/bs";
import { FiChevronLeft } from "react-icons/fi";
import { useState } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import Error from "../../shared/Error/Error";
import { useForm } from "react-hook-form";
import { UPDATE_ORDER } from "../../../mutations/orderMutations";
import { useMutation } from "@apollo/client";

const Payment = ({
  changeTabIndex,
  user,
  shipAddress,
  productData,
  orderID,
}) => {
  const navigate = useNavigate();
  const [billing, setBilling] = useState(false);
  const [updateOrder, { data, loading, error }] = useMutation(UPDATE_ORDER);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  useEffect(() => {
    if (data) {
      localStorage.removeItem("ivoryStore");
      navigate("/");
    }
    //eslint-disable-next-line
  }, [data]);

  const config = {
    public_key: "FLWPUBK_TEST-0ea81657dd1b7e881d2c4cf8e4492338-X",
    tx_ref: Date.now(),
    amount: productData.reduce((acc, cur) => acc + +cur.price, 0),
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: "agbaayoh@gmail.com",
      // email: user.email,
      phone_number: shipAddress.phone,
      name: `${user.firstName} ${user.lastName}`,
    },
    customizations: {
      title: "Bemi store purchase",
      description: "Payment for clothing items",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handleBilling = (bool) => {
    if (bool) {
      setBilling(true);
    } else {
      setBilling(false);
    }
  };

  const handlePayment = () => {
    const values = getValues();
    console.log(values, shipAddress);

    handleFlutterPayment({
      callback: async (response) => {
        const resObj = {
          orderId: orderID,
          user: user._id,
          shippingAdd: shipAddress,
          billing: billing ? { ...values, uuid: user._id } : shipAddress,
          paid: true,
          orderStatus: { status: "placed", orderUrl: "" },
          products: productData.map((item) => {
            return {
              color: item.color,
              count: item.count,
              size: item.size,
              name: item.name,
              price: item.price,
              image: item.image,
            };
          }),
          transactionId: response.transaction_id.toString(),
        };
        await updateOrder({ variables: { ...resObj } });
        closePaymentModal(); // this will close the modal programmatically
      },
      onClose: () => {
        closePaymentModal();
      },
    });
  };

  return (
    <div>
      <div className="border border-darkgray rounded-md ms:px-6 px-3 mt-4 sm:mb-12 mb-7 text-sm sm:text-base">
        <div className="py-3 flex border-b border-darkgray">
          <p className="w-20">Contact</p>
          <p>{user?.email}</p>
          <Link
            onClick={() => changeTabIndex(0)}
            className="ml-auto text-skyblue"
          >
            change
          </Link>
        </div>

        <div className="py-3 flex border-b border-darkgray">
          <p className="w-20">Ship to</p>
          <p>{`${shipAddress?.address}, ${shipAddress?.state}, ${shipAddress?.country}`}</p>
          <Link
            onClick={() => changeTabIndex(0)}
            className="text-skyblue ml-auto"
          >
            change
          </Link>
        </div>

        <div className="py-3 flex">
          <p className="w-20">Method</p>
          <p>Free Shipping</p>
        </div>
      </div>

      <h2>Payment</h2>
      <p className="mt-2 mb-5 text-xs sm:text-base">All transactions are secure and encrypted.</p>

      <div className="border bg-gray border-darkgray mb-12 text-sm sm:text-base">
        <div className="flex items-center justify-between bg-white">
          <h2 className="my-3 sm:ml-6 ml-3">Credit/Debit Card</h2>
          <div className="flex gap-2 ml-auto my-3 sm:mr-6 mr-3">
            <div className="sm:w-12 w-9">
              <img src={visa} alt="card" />
            </div>
            <div className="sm:w-12 w-9">
              <img src={masterCard} alt="card" />
            </div>
            <div className="sm:w-12 w-9">
              <img src={discover} alt="card" />
            </div>
            <p>...more</p>
          </div>
        </div>

        <div className="my-5 mx-6 bg-gray">
          <div className="flex align-middle justify-center">
            <BsCreditCard2Back className="sm:text-9xl text-6xl" />
          </div>
          <p className="mx-5 text-center text-xs sm:text-base">
            After clicking “Complete order”, you will be redirected to
            Credit/Debit Card to complete your purchase securely.
          </p>
        </div>
      </div>

      <h2>Billing address</h2>

      <p className="mt-2 mb-5 text-xs sm:text-base">
        Select the address that matches your card or payment method.
      </p>

      <div className="border border-darkgray rounded-md sm:mb-12 mb-8 text-sm sm:text-base">
        <div className="py-3 flex items-center border-b border-darkgray">
          <div
            className={`border-4 ${
              !billing ? "border-skyblue" : "border-darkgray"
            } h-3 w-3 p-1 sm:ml-6 ml-3 rounded-full cursor-pointer`}
            onClick={() => handleBilling(false)}
          ></div>
          <p className="ml-4">Same as shipping address</p>
        </div>

        <div className="py-3 flex items-center">
          <div
            className={`border-4 ${
              billing ? "border-skyblue" : "border-darkgray"
            } h-3 w-3 p-1 sm:ml-6 ml-3 rounded-full cursor-pointer`}
            onClick={() => handleBilling(true)}
          ></div>
          <p className="ml-4">Use a different billing address</p>
        </div>

        <div
          className={`${billing ? "block" : "hidden"} bg-gray sm:p-6 p-3 rounded-b-md`}
        >
          <form
            className={`${billing ? "block" : "hidden"} text-sm sm:text-base`}
            onSubmit={handleSubmit()}
          >
            <div className="relative text-sm sm:text-base">
              <select
                name="country"
                id="country"
                className="w-full py-2 px-5 border border-ash rounded opacity-50 text-sm sm:text-base"
                {...register("country", {
                  required: "Required",
                })}
              >
                <option className="opacity-50" value="">
                  Country/region
                </option>
                <option value="Nigeria">Nigeria</option>
                <option value="Ghana">Ghana</option>
              </select>

              <Error>{errors.country && errors.country.message}</Error>
            </div>

            <div className="flex gap-4 sm:my-7 my-5 text-sm sm:text-base">
              <div className="relative w-1/2 text-sm sm:text-base">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First name"
                  className="py-2 px-5 w-full block border border-ash rounded opacity-90 text-sm sm:text-base"
                  {...register("firstName", {
                    required: "Required",
                  })}
                />
                <Error>{errors.firstName && errors.firstName.message}</Error>
              </div>

              <div className="relative w-1/2 text-sm sm:text-base">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last name"
                  className="py-2 px-5 w-full border border-ash rounded opacity-90 text-sm sm:text-base"
                  {...register("lastName", {
                    required: "Required",
                  })}
                />
                <Error>{errors.lastName && errors.lastName.message}</Error>
              </div>
            </div>

            <div className="relative text-sm sm:text-base">
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Address"
                className="w-full py-2 px-5 border border-ash rounded opacity-90 text-sm sm:text-base"
                {...register("address", {
                  required: "Required",
                })}
              />

              <Error>{errors.address && errors.address.message}</Error>
            </div>

            <div className="sm:my-7 my-5 relative text-sm sm:text-base">
              <input
                type="text"
                name="apartment"
                id="suite"
                placeholder="Apartment, suite, etc. (optional)"
                className="w-full py-2 px-5 border border-ash rounded opacity-90 text-sm sm:text-base"
                {...register("apartment", {
                  required: "Required",
                })}
              />

              <Error>{errors.apartment && errors.apartment.message}</Error>
            </div>

            <div className="flex gap-4 text-sm sm:text-base">
              <div className="relative w-1/3">
                <input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="City"
                  className="w-full py-2 px-5 border border-ash rounded opacity-90 text-sm sm:text-base"
                  {...register("city", {
                    required: "Required",
                  })}
                />
                <Error>{errors.city && errors.city.message}</Error>
              </div>

              <div className="relative w-1/3">
                <select
                  name="country"
                  id="state"
                  className="w-full py-2 px-5 border border-ash rounded opacity-50 text-sm sm:text-base"
                  {...register("state", {
                    required: "Required",
                  })}
                >
                  <option className="opacity-50" value="">
                    State
                  </option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Ghana">Ghana</option>
                </select>

                <Error>{errors.state && errors.state.message}</Error>
              </div>

              <div className="relative w-1/3">
                <input
                  type="text"
                  name="zipCode"
                  id="zipCode"
                  placeholder="ZIP code"
                  className="w-full py-2 px-5 border border-ash rounded opacity-90 text-sm sm:text-base"
                  {...register("zipCode", {
                    required: "Required",
                  })}
                />
                <Error>{errors.zipCode && errors.zipCode.message}</Error>
              </div>
            </div>

            <div className="sm:my-7 my-5 relative text-sm sm:text-base">
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Phone"
                className="w-full py-2 px-5 border border-ash rounded opacity-90 text-sm sm:text-base"
                {...register("phone", {
                  required: "Required",
                })}
              />
              <Error>{errors.phone && errors.phone.message}</Error>
            </div>
          </form>
        </div>
      </div>

      <div className="flex justify-between items-center my-5 text-xs sm:text-base">
        <button className="flex gap-2 text-skyblue items-center">
          <FiChevronLeft />
          <p onClick={() => changeTabIndex(1)}>Return to information</p>
        </button>

        <button
          className="sm:py-4 py-3 sm:px-8 px-5 rounded-md text-white bg-skyblue"
          onClick={() => {
            handlePayment();
          }}
        >
          Complete order
        </button>
      </div>
    </div>
  );
};

export default Payment;
