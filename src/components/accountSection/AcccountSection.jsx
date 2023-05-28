import { useQuery } from "@apollo/client";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GET_USER } from "../../queries/userQuery";
import ReactLoading from "react-loading";
import { GET_ORDER } from "../../queries/orderQuery";
import { toast } from "react-toastify";
import { BsEye } from "react-icons/bs";
import AccountModal from "./AccountModal";

const AcccountSection = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [product, setProduct] = useState(null);
  const { loading, data, error } = useQuery(GET_USER);
  const {
    loading: orderLoading,
    data: orderData,
    error: errorData,
  } = useQuery(GET_ORDER);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (data) {
      setUser(data?.getUser);
    }
    if (error) {
      toast.error(error.message, {
        pauseOnFocusLoss: false,
        position: toast.POSITION.TOP_RIGHT,
      });
      localStorage.removeItem("token");
      navigate("/login");
    }
    //eslint-disable-next-line
  }, [loading, data, error]);

  // useEffect(() => {
  //   console.log(orderData);
  // }, [orderData]);

  const deliveredOrder = useMemo(
    () =>
      orderData?.getOrders.filter(
        (item) => item.orderStatus.status !== "delivered"
      ),
    [orderData]
  );
  const pendingOrder = useMemo(
    () =>
      orderData?.getOrders.filter(
        (item) => item.orderStatus.status === "delivered"
      ),
    [orderData]
  );

  const handleView = (item) => {
    console.log(item);
    setProduct(item);
    setModal(true);
  };

  return (
    <div className="sm:p-20 pt-20 px-5">
      <h2 className=" text-center font-bold text-2xl">My Account</h2>
      <div className="mt-2 border-b border-b-black pb-4 flex justify-center align-middle gap-7">
        <p>welcome {user?.firstName + " " + user?.lastName}</p>
        <button className=" text-sm border-b" onClick={() => navigate("/")}>
          log out
        </button>
      </div>
      {!loading ? (
        <div className="sm:flex sm:align-middle py-8 gap-2">
          <div className="sm:basis-1/4">
            <h3 className=" mb-4 text-center text-3xl">Profile</h3>
            <div className="">
              <h5 className="text-xs">NAME</h5>
              <p>{user?.firstName + " " + user?.lastName}</p>
            </div>
            <div className="my-6">
              <h5 className="text-xs">EMAIL ADDRESS</h5>
              <p>{user?.email}</p>
            </div>
            <div className="mb-6">
              <h5 className="text-xs">ADDRESS</h5>
              <p>
                {user?.address
                  ? `${user?.address?.apartment}, ${user?.address?.city}; ${user?.address?.country}`
                  : "click below to add your shipping address"}
              </p>
            </div>
            <Link to={"/account/address"}>
              <button className=" py-2 px-5 bg-black text-white">
                Add Address
              </button>
            </Link>
          </div>

          <div className="border self-center h-48 hidden sm:block"></div>

          <div className="sm:basis-3/4 sm:px-8 pt-8 sm:pt-0">
            <div className="">
              <h2 className="text-3xl">Order History</h2>
              {pendingOrder?.length === 0 || !pendingOrder ? (
                <div className=" mt-3 mb-8">
                  You haven't placed any orders yet.
                </div>
              ) : null}

              <div className="border border-opacity-30 rounded shadow-lg max-h-80 mb-8 overflow-auto">
                <ul className="min-w-[56rem]">
                  <li className="flex bg-gray">
                    <h3 className="grow w-24 border-0 py-2 px-3">id</h3>
                    <h3 className="grow w-24 border-0 py-2 px-3">price</h3>
                    <h3 className="grow w-20 border-0 py-2 px-3">No</h3>
                    <h3 className="grow w-36 border-0 py-2 px-3">Status</h3>
                    <h3 className="grow w-36 border-0 py-2 px-3">Place</h3>
                    <h3 className="grow w-36 border-0 py-2 px-3">
                      Last updated
                    </h3>
                    <p className="grow w-20 border-0 py-2 px-3"></p>
                  </li>
                  {pendingOrder &&
                    pendingOrder.map((item, index) => (
                      <li
                        className={`flex ${index % 2 !== 1 ? "" : "bg-gray"}`}
                        key={item.transactionId}
                      >
                        <p className="grow w-24 border-0 py-2 px-3">
                          {item.transactionId}
                        </p>
                        <p className="grow w-24 border-0 py-2 px-3">
                          {item.transactionId}
                        </p>
                        <p className="grow w-20 border-0 py-2 px-3">{`#${item.products.reduce(
                          (acc, curr) => acc + parseInt(curr.price),
                          0
                        )}`}</p>
                        <p className="grow w-36 border-0 py-2 px-3">
                          {item.orderStatus.status}
                        </p>
                        <p className="grow w-36 border-0 py-2 px-3">
                          {new Date(Number(item?.createdAt)).toDateString()}
                        </p>
                        <p className="grow w-36 border-0 py-2 px-3">
                          {new Date(Number(item?.updatedAt)).toDateString()}
                        </p>
                        <button
                          className="grow w-fit text-bl self-center border-b text-border-blue border-border-blue cursor-pointer"
                          onClick={() => handleView(item)}
                        >
                          details
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            <div className="">
              <h2 className="text-3xl">In Store Orders</h2>
              {deliveredOrder?.length === 0 || !deliveredOrder ? (
                <div className=" my-3">You haven't placed any orders yet.</div>
              ) : null}
              <div className="border border-opacity-30 rounded shadow-lg max-h-80 overflow-auto">
                <ul className="min-w-[56rem]">
                  <li className="flex bg-gray">
                    <h3 className="grow w-24 border-0 py-2 px-3">id</h3>
                    <h3 className="grow w-24 border-0 py-2 px-3">price</h3>
                    <h3 className="grow w-20 border-0 py-2 px-3">No</h3>
                    <h3 className="grow w-36 border-0 py-2 px-3">Status</h3>
                    <h3 className="grow w-36 border-0 py-2 px-3">Place</h3>
                    <h3 className="grow w-36 border-0 py-2 px-3">
                      Last updated
                    </h3>
                    <p className="grow w-20 border-0 py-2 px-3"></p>
                  </li>
                  {deliveredOrder &&
                    deliveredOrder.map((item, index) => (
                      <li
                        className={`flex ${index % 2 !== 1 ? "" : "bg-gray"}`}
                        key={item.transactionId}
                      >
                        <p className="grow w-24 border-0 py-2 px-3">
                          {item.transactionId}
                        </p>
                        <p className="grow w-24 border-0 py-2 px-3">
                          {item.transactionId}
                        </p>
                        <p className="grow w-20 border-0 py-2 px-3">{`#${item.products.reduce(
                          (acc, curr) => acc + parseInt(curr.price),
                          0
                        )}`}</p>
                        <p className="grow w-36 border-0 py-2 px-3">
                          {item.orderStatus.status}
                        </p>
                        <p className="grow w-36 border-0 py-2 px-3">
                          {new Date(Number(item?.createdAt)).toDateString()}
                        </p>
                        <p className="grow w-36 border-0 py-2 px-3">
                          {new Date(Number(item?.updatedAt)).toDateString()}
                        </p>
                        <button
                          className="grow w-fit text-bl self-center border-b text-border-blue border-border-blue cursor-pointer"
                          onClick={() => handleView(item)}
                        >
                          details
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
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
      <AccountModal
        handleOpenModal={() => setModal(!modal)}
        modal={modal}
        product={product}
      />
    </div>
  );
};

export default AcccountSection;
