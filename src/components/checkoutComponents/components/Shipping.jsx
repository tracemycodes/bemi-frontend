import React from "react";
import { FiChevronLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

const Shipping = ({changeTabIndex, user, shipAddress}) => {
  return (
    <div className="mt-5 sm:mt-0">
      <div className="border border-darkgray rounded-md sm:px-6 px-3 sm:mb-12 mb-7 text-sm sm:text-base">
        <div className="py-3 flex border-b border-darkgray">
          <p className="w-20">Contact</p>
          <p>{user?.email}</p>
          <Link onClick={() => changeTabIndex(0)} className="ml-auto text-skyblue">change</Link>
        </div>

        <div className="py-3 flex">
          <p className="w-20">Ship to</p>
          <p>{`${shipAddress?.address}, ${shipAddress?.state}, ${shipAddress?.country}`}</p>
          <Link onClick={() => changeTabIndex(0)} className="text-skyblue ml-auto">change</Link>
        </div>
      </div>
      
      <h2 className="my-6 sm:text-xl text-lg">Shipping method</h2>

      <div className="border border-darkgray rounded-md sm:px-6 px-3 py-3 flex items-center gap-4 text-sm sm:text-base">
        <div className="border-4 border-skyblue h-3 w-3 p-1 rounded-full"></div>
        <p>Free Shipping</p>
        <p className="ml-auto">Free</p>
      </div>

      <div className="flex justify-between items-center mt-6 text-xs sm:text-base">
        <button onClick={() => changeTabIndex(0)} className="flex gap-2 text-skyblue items-center">
          <FiChevronLeft />
          <p>Return to information</p>
        </button>
        <button onClick={() => changeTabIndex(2)} className="sm:py-4 py-3 sm:px-8 px-5 rounded-md text-white bg-skyblue">Continue to payment</button>
      </div>
    </div>
  );
};

export default Shipping;
