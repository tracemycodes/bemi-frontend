import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import CheckModal from "./CheckModal";
import { useForm } from "react-hook-form";
import Error from "../../shared/Error/Error";

const Information = ({ changeTabIndex, user }) => {
  const navigate = useNavigate()
  const [modal, setModal] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onTouched" });
  // } = useForm({ mode: "onTouched", defaultValues: {...user.address} });

  const handleOpenModal = () => {
    setModal(!modal);
  };

  const handleShipping = (data) => {
    console.log(data, errors);
    if (!user) {
      setModal(true);
    } else {
      changeTabIndex(1, data);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login');
  }

  return (
    <div className="">
      <div className="flex justify-between mt-3 sm:mt-8">
        <h2>Contact information</h2>
        <div className="hidden">
          <p>Already have an account?</p>
          <Link to={"/login"} className="text-skyblue">
            Log in
          </Link>
        </div>
      </div>

      <div className="mt-4 flex items-center">
        <MdAccountCircle className="sm:text-6xl text-5xl text-ash" />
        {user ? (
          <div className="ml-3">
            <p>{`${user?.firstName + " " + user?.lastName} (${
              user?.email
            })`}</p>
            <button className="text-skyblue" onClick={handleLogout}>Log out</button>
          </div>
        ) : (
          <div className="ml-3 text-sm sm:text-base">
            <p>Login to continue with checkout</p>
            <Link to={"/login"} className=" text-skyblue">
              Log in
            </Link>
          </div>
        )}
      </div>

      <form
        className="sm:mt-12 mt-6 border-b border-darkgray"
        onSubmit={handleSubmit(handleShipping)}
      >
        <h2 className="sm:mb-5 mb-4">Shipping address</h2>

        <div className="relative">
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

        <div className="flex gap-4 sm:my-7 my-5">
          <div className="relative w-1/2">
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

          <div className="relative w-1/2">
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

        <div className="relative">
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

        <div className="sm:my-7 my-5 relative">
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

        <div className="flex gap-4">
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

        <div className="sm:my-7 my-5 relative">
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

        <div className="flex flex-col gap-2 my-3 sm:my-0">
          <div className="flex gap-3 items-center">
            <input type="checkbox" name="addinfo" id="addinfo" />
            <label
              htmlFor="addinfo"
              className="opacity-60 text-sm sm:text-base"
            >
              Save this information for next time
            </label>
          </div>
          <div className="flex gap-3 items-center">
            <input type="checkbox" name="newsLetter" id="newsLetter" />
            <label
              htmlFor="newsLetter"
              className="opacity-60 text-sm sm:text-base"
            >
              Email me with news and offers
            </label>
          </div>
        </div>

        <div className="flex justify-end mt-4 sm:mb-12 mb-5">
          <button
            className="bg-skyblue text-white sm:py-3 py-2 sm:px-7 px-5 rounded text-sm sm:text-base"
            type="submit"
          >
            Continue to shipping
          </button>
        </div>
      </form>

      <CheckModal modal={modal} handleOpenModal={handleOpenModal} />
    </div>
  );
};

export default Information;
