import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GET_USER } from "../../queries/userQuery";
import ReactLoading from "react-loading";

const AcccountSection = () => {
  const navigate = useNavigate()
  const { loading, data, error } = useQuery(GET_USER);
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (data) {
      setUser(data?.getUser)
    }
  }, [loading, data, error]);

  return (
    <div className="p-20">
      <h2 className=" text-center font-bold text-2xl">My Account</h2>
      <div className="mt-2 border-b border-b-black pb-4 flex justify-center align-middle gap-7">
        <p>welcome {user?.firstName + ' ' + user?.lastName}</p>
        <button className=" text-sm border-b" onClick={() => navigate('/')}>log out</button>
      </div>
      {!loading ? (
        <div className="flex align-middle py-8 gap-2">
          <div className="basis-1/4">
            <h3 className=" mb-4 text-center text-3xl">Profile</h3>
            <div className="">
              <h5 className="text-xs">NAME</h5>
              <p>{user?.firstName + ' ' + user?.lastName}</p>
            </div>
            <div className=" my-6">
              <h5 className="text-xs">EMAIL ADDRESS</h5>
              <p>{user?.email}</p>
            </div>
            <div className="mb-6">
              <h5 className="text-xs">ADDRESS</h5>
              <p>{user?.address ? `${user?.address?.apartment}, ${user?.address?.city}; ${user?.address?.country}` : 'click below to add your shipping address'}</p>
            </div>
            <Link to={"/account/address"}>
              <button className=" py-2 px-5 bg-black text-white">
                Add Address
              </button>
            </Link>
          </div>
          <div className="border self-center h-48"></div>
          <div className="basis-3/4 px-8">
            <div className="">
              <h2 className="text-3xl">Order History</h2>
              <div className=" mt-3 mb-8">
                You haven't placed any orders yet.
              </div>
            </div>
            <div className="">
              <h2 className="text-3xl">In Store Orders</h2>
              <div className=" my-3">You haven't placed any orders yet.</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center align-middle items-center min-h-[20rem]">
          <ReactLoading
            type="spin"
            color="#000"
            className=""
            height={75}
            width={75}
          />
        </div>
      )}
    </div>
  );
};

export default AcccountSection;
