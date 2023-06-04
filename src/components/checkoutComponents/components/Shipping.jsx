import React from "react";
import { FiChevronLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

const Shipping = ({changeTabIndex, user, shipAddress}) => {
  return (
    <div>
      <div className="border border-darkgray rounded-md px-6 mb-12">
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
      
      <h2 className="my-6 text-xl">Shipping method</h2>

      <div className="border border-darkgray rounded-md px-6 py-3 flex items-center gap-4">
        <div className="border-4 border-skyblue h-3 w-3 p-1 rounded-full"></div>
        <p>Free Shipping</p>
        <p className="ml-auto">Free</p>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button onClick={() => changeTabIndex(0)} className="flex gap-2 text-skyblue items-center">
          <FiChevronLeft />
          <p>Return to information</p>
        </button>
        <button onClick={() => changeTabIndex(2)} className="py-4 px-8 rounded-md text-white bg-skyblue">Continue to payment</button>
      </div>
    </div>
  );
};

export default Shipping;
