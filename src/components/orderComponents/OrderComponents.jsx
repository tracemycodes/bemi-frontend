import React, { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { BsFillTelephoneFill } from "react-icons/bs";
import errorIcon from "../../assets/images/error.png";
import OrderModal from "./OrderModal";
import { useQuery } from "@apollo/client";
import { SINGLE_ORDER } from "../../queries/orderQuery";
import { useParams } from "react-router-dom";
import BemiIvoryContext from "../../context/BemiIvory/bemiIvoryContext";

const OrderComponents = () => {
  const bemiIvoryContext = useContext(BemiIvoryContext);
  const { saveOrder } = bemiIvoryContext;
  const { orderID } = useParams();
  const { loading, error, data } = useQuery(SINGLE_ORDER, {
    variables: { orderId: orderID.trim() },
  });
  const [modal, setModal] = useState(false);

  const handleOpenModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    if (data) {
      saveOrder({
        id: data?.singleOrder?.transactionId,
        orderDate: data?.singleOrder?.createdAt,
      });
    }
    //eslint-disable-next-line
  }, [data]);

  return (
    <div>
      <div className="flex sm:gap-6 flex-col lg:flex-row">
        <div className="lg:flex-auto lg:w-[80rem] min-h-[32rem] relative ...">
          <div className="overflow-hidden h-full flex flex-col px-5 py-1 bg-white shadow-md sm:rounded-lg">
            <div className="py-4 flex gap-6">
              <h3 className="sm:text-lg text-md font-medium leading-6 text-text-header">
                Ordered Items
              </h3>
              <p className="mt-1 max-w-2xl sm:text-sm text-xs text-text-para">
                list of purchased items.
              </p>
            </div>

            <div className="border-t py-2 border-[#BEBEC6] border-opacity-60 max-h-[22rem] overflow-auto">
              <dl>
                {data &&
                  data?.singleOrder?.products.map((item) => (
                    <div
                      className="bg-gray-50 sm:py-4 py-3 flex sm:gap-6 gap-3"
                      key={item._id}
                    >
                      <dt className="text-sm font-medium text-gray-500 flex-none">
                        <div className="sm:w-14 w-12 sm:h-16 h-14 object-cover">
                          <img
                            src={item.image}
                            alt=""
                            className="w-full h-full"
                          />
                        </div>
                      </dt>
                      
                      <dd className="mt-1 sm:text-sm text-xs text-gray-900 sm:col-span-2 sm:mt-0 flex flex-col flex-auto">
                        <h3 className="text-text-header">{item.name}</h3>
                        <p className="text-text-header">{item.color}</p>
                      </dd>

                      <dd className="mt-1 sm:text-sm text-xs text-text-header sm:col-span-2 sm:mt-0 self-center">
                        {item.price} × {item.count}
                      </dd>

                      <dd className="mt-1 sm:text-sm text-xs text-text-header sm:col-span-2 sm:mt-0 flex-none self-center">
                        {parseInt(item.price) * parseInt(item.count)}
                      </dd>
                    </div>
                  ))}
              </dl>
            </div>

            <div className="mt-auto mb-4 border-t pt-3 border-[#BEBEC6] flex gap-4">
              <div className="sm:flex">
                <dt className="text-sm font-medium text-text-header flex-none">
                  Order note
                </dt>

                <dd className="mt-1 sm:text-sm text-xs text-gray-900 sm:col-span-2 sm:mt-0 flex flex-col flex-auto">
                  <p className="text-text-para text-xs max-w-[16rem]">
                    Ship all the ordered items together by friday and I send you
                    an email please check. Thanks!
                  </p>
                </dd>
              </div>

              <dd className="mt-1 sm:text-sm text-xs text-text-header sm:col-span-2 sm:mt-0 flex flex-col gap-2 flex-none self-center">
                <div className="flex justify-between gap-12">
                  <p>Subtotal</p>
                  <p>
                    {data?.singleOrder?.products
                      .map(
                        (item) => parseInt(item.count) * parseInt(item.price)
                      )
                      .reduce((acc, curr) => acc + curr, 0)}
                  </p>
                </div>
                <div className="flex justify-between gap-12">
                  <p>Shipping</p>
                  <p>$0.00</p>
                </div>
                <div className="flex justify-between gap-12">
                  <p>Tax</p>
                  <p>$0.00</p>
                </div>
                <div className="flex justify-between gap-12 border-t pt-2 border-border-light border-opacity-60">
                  <p>Total</p>
                  <p>
                    $
                    {data?.singleOrder?.products
                      .map(
                        (item) => parseInt(item.count) * parseInt(item.price)
                      )
                      .reduce((acc, curr) => acc + curr, 0)}
                  </p>
                </div>
              </dd>
            </div>
          </div>
        </div>

        <div class="flex-auto lg:w-[20rem] flex flex-col bg-white lg:min-h-[32rem] sm:px-5 px-3 lg:py-1 sm:py-4 py-2 shadow-md sm:rounded-lg relative ...">
          <div className="sm:py-4 py-2 flex gap-6 border-b border-[#BEBEC6] border-opacity-60">
            <h3 className="sm:text-lg text-base font-medium sm:mt-1 leading-6 text-text-header">
              Order History
            </h3>
          </div>

          <div className="flex lg:flex-col my-4 lg:my-0 align-top lg:justify-start justify-around">
            <div className="flex flex-col sm:flex-row gap-10 sm:gap-6 mt-8 mb-8 lg:mb-2">
              <div
                className={`flex align-middle justify-center border w-10 rounded-full ${
                  data?.singleOrder?.orderStatus?.status === "placed"
                    ? "border-border-blue"
                    : "border-text-header"
                } bg-[#ECF7FE] relative before:absolute before:border-l-2 ${
                  data?.singleOrder?.orderStatus?.status === "placed"
                    ? "before:border-border-blue"
                    : "before:border-text-header"
                } before:border-border-blue before:border-dashed before:h-[1.8rem] before:top-10 before:flex before:align-middle before:justify-center before:translate-x-1/2 before:w-full h-10`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  className="fill-border-blue w-5 self-center font-black"
                >
                  <path
                    fill="#3F4662"
                    fill-rule="evenodd"
                    className="fill-border-blue"
                    d="M58.177 80H8.346A7.155 7.155 0 0 1 .99 73.083V6.916A7.155 7.155 0 0 1 8.346 0h49.831a7.155 7.155 0 0 1 7.358 6.916V18.15a1.991 1.991 0 0 1-3.982 0V6.916A3.176 3.176 0 0 0 58.177 4H8.346a3.174 3.174 0 0 0-3.374 2.916v66.167A3.174 3.174 0 0 0 8.346 76h49.831a2 2 0 1 1 0 4zM37.6 44.149h-7.965a2 2 0 1 1 0-4H37.6a2 2 0 1 1 0 4zm-17.92 0h-7.964a2 2 0 1 1 0-4h7.964a2 2 0 1 1-.004 4h.004zm17.92 8h-7.965a2 2 0 1 1 0-4H37.6a2 2 0 1 1 0 4zm-17.92 0h-7.964a2 2 0 1 1 0-4h7.964a2 2 0 0 1-.004 4h.004zm17.92 8h-7.965a2 2 0 1 1 0-4H37.6a2 2 0 1 1 0 4zm-17.92 0h-7.964a2 2 0 1 1 0-4h7.964a2 2 0 0 1-.004 4h.004zm35.363-40h-7.488a2 2 0 1 1 0-4h7.488a2 2 0 0 1-.004 4h.004zm-17.443 0h-7.965a2 2 0 1 1 0-4H37.6a2 2 0 1 1 0 4zm-17.92 0h-7.964a2 2 0 1 1 0-4h7.964a2 2 0 0 1-.004 4h.004zm17.92 8h-7.965a2 2 0 1 1 0-4H37.6a2 2 0 1 1 0 4zm-17.92 0h-7.964a2 2 0 1 1 0-4h7.964a2 2 0 0 1-.004 4h.004zm17.92 8h-7.965a2 2 0 1 1 0-4H37.6a2 2 0 1 1 0 4zm-17.92 0h-7.964a2 2 0 1 1 0-4h7.964a2 2 0 0 1-.004 4h.004zm57.142 37.478c-.1 0-.352-.019-.449-.033-11.029-1.627-21.81-4.838-22.588-23.772h-8.443a2 2 0 0 1-1.567-3.234l14.958-19.151a1.988 1.988 0 0 1 3.135 0l14.956 19.151a2 2 0 0 1-1.567 3.234h-8.518c-.407 10.127 3.465 14.041 11.431 18.213a2.966 2.966 0 0 1-1.352 5.592h.004zM49.435 45.822h6.3a1.994 1.994 0 0 1 1.991 1.991c.061 14.4 5.633 18.774 13.6 20.765-6.156-4.357-9.345-10.038-8.439-20.922a1.992 1.992 0 0 1 1.983-1.834h6.3L60.3 31.912l-10.865 13.91z"
                  />
                </svg>
              </div>
              <div className="flex flex-col justify-between">
                <h3 className="text-sm">Order Placed</h3>
                <p className="text-xs text-text-para">
                  {data?.singleOrder?.orderStatus?.placed?.orderDate
                    ? new Date(
                        data?.singleOrder?.orderStatus?.placed?.orderDate
                      ).toDateString()
                    : ""}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-10 sm:gap-6 mt-8 mb-8 lg:mb-2">
              <div
                className={`flex align-middle justify-center border w-10 rounded-full ${
                  data?.singleOrder?.orderStatus?.packed?.status === true
                    ? "border-border-blue bg-[#ECF7FE] before:border-border-blue"
                    : "border-text-header bg-[#F4F4F6] before:border-text-header"
                } relative before:absolute before:border-l-2 before:border-dashed before:h-[1.8rem] before:top-10 before:flex before:align-middle before:justify-center before:translate-x-1/2 before:w-full h-10`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  className={`${
                    data?.singleOrder?.orderStatus?.packed?.status === true
                      ? "fill-border-blue"
                      : "fill-text-header"
                  } w-5 self-center font-black`}
                >
                  <path
                    fill="#000"
                    fill-rule="evenodd"
                    className={`${
                      data?.singleOrder?.orderStatus?.shipped?.status === true
                        ? "fill-border-blue"
                        : "fill-text-header"
                    }`}
                    d="M1 4.27v7.47c0 .45.3.84.75.97l6.5 1.73c.16.05.34.05.5 0l6.5-1.73c.45-.13.75-.52.75-.97V4.27c0-.45-.3-.84-.75-.97l-6.5-1.74a1.4 1.4 0 0 0-.5 0L1.75 3.3c-.45.13-.75.52-.75.97zm7 9.09l-6-1.59V5l6 1.61v6.75zM2 4l2.5-.67L11 5.06l-2.5.67L2 4zm13 7.77l-6 1.59V6.61l2-.55V8.5l2-.53V5.53L15 5v6.77zm-2-7.24L6.5 2.8l2-.53L15 4l-2 .53z"
                  />
                </svg>
              </div>
              <div className="flex flex-col justify-between">
                <h3 className="text-sm">Packed</h3>
                <p className="text-xs text-text-para">
                  {data?.singleOrder?.orderStatus?.packed?.orderDate
                    ? new Date(
                        data?.singleOrder?.orderStatus?.packed?.orderDate
                      ).toDateString()
                    : ""}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-10 sm:gap-6 mt-8 mb-8 lg:mb-2">
              <div
                className={`flex align-middle justify-center border w-10 rounded-full ${
                  data?.singleOrder?.orderStatus?.shipped?.status === true
                    ? "border-border-blue bg-[#ECF7FE] before:border-border-blue"
                    : "border-text-header bg-[#F4F4F6] before:border-text-header"
                } relative before:absolute before:border-l-2 before:border-dashed before:h-[1.8rem] before:top-10 before:flex before:align-middle before:justify-center before:translate-x-1/2 before:w-full h-10`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Layer 2"
                  viewBox="0 0 35 35"
                  className={`${
                    data?.singleOrder?.orderStatus?.shipped?.status === true
                      ? "fill-border-blue"
                      : "fill-text-header"
                  } w-5 self-center font-black`}
                >
                  <path
                    className={`${
                      data?.singleOrder?.orderStatus?.shipped?.status === true
                        ? "fill-border-blue"
                        : "fill-text-header"
                    }`}
                    d="M32.55 17.33a1.24 1.24 0 0 1-1.17-.83l-2-5.56a.6.6 0 0 0-.47-.25H23a1.25 1.25 0 0 1 0-2.5h5.91a3.08 3.08 0 0 1 2.7 1.62 1.42 1.42 0 0 1 .08.18l2 5.67a1.26 1.26 0 0 1-.76 1.6A1.54 1.54 0 0 1 32.55 17.33zM28.53 30.65a4.55 4.55 0 1 1 4.55-4.55A4.55 4.55 0 0 1 28.53 30.65zm0-6.6a2.05 2.05 0 1 0 2 2.05A2.05 2.05 0 0 0 28.53 24.05zM10 30.65a4.55 4.55 0 1 1 4.55-4.55A4.55 4.55 0 0 1 10 30.65zm0-6.6a2.05 2.05 0 1 0 2.05 2.05A2.05 2.05 0 0 0 10 24.05z"
                  />
                  <path
                    className={`${
                      data?.singleOrder?.orderStatus?.shipped?.status === true
                        ? "fill-border-blue"
                        : "fill-text-header"
                    }`}
                    d="M25.24 25.31H13.3a1.25 1.25 0 0 1 0-2.5H25.24a1.25 1.25 0 0 1 0 2.5zM32.12 25.31h-.3a1.25 1.25 0 0 1 0-2.5h.3a.62.62 0 0 0 .63-.62V17.9a.63.63 0 0 0-.48-.61H24.9a3.13 3.13 0 0 1-3.13-3.12V7.47a.61.61 0 0 0-.62-.62H6.42a1.25 1.25 0 0 1 0-2.5H21.15a3.12 3.12 0 0 1 3.12 3.12v6.68a.62.62 0 0 0 .63.62h7.22a3.82 3.82 0 0 1 .68.07l.22.07a3.1 3.1 0 0 1 2.23 3v4.29A3.13 3.13 0 0 1 32.12 25.31z"
                  />
                  <path
                    className={`${
                      data?.singleOrder?.orderStatus?.shipped?.status === true
                        ? "fill-border-blue"
                        : "fill-text-header"
                    }`}
                    d="M23 25.31a1.24 1.24 0 0 1-1.25-1.25V13.13a1.25 1.25 0 1 1 2.5 0V24.06A1.24 1.24 0 0 1 23 25.31zM10.19 13.17H2a1.25 1.25 0 0 1 0-2.5h8.19a1.25 1.25 0 0 1 0 2.5zM11.73 18.75H7.45a1.25 1.25 0 1 1 0-2.5h4.28a1.25 1.25 0 0 1 0 2.5z"
                  />
                </svg>
              </div>
              <div className="flex flex-col justify-between">
                <h3 className="text-sm">Shipped</h3>
                <p className="text-xs text-text-para">
                  {data?.singleOrder?.orderStatus?.shipped?.orderDate
                    ? new Date(
                        data?.singleOrder?.orderStatus?.shipped?.orderDate
                      ).toDateString()
                    : ""}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-10 sm:gap-6 mt-8 mb-8 lg:mb-2">
              <div
                className={`flex align-middle justify-center border w-10 rounded-full ${
                  data?.singleOrder?.orderStatus?.delivered?.status === true
                    ? "border-border-blue bg-[#ECF7FE]"
                    : "border-text-header bg-[#F4F4F6]"
                } h-10`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25}>
                  <path
                    style={{
                      lineHeight: "normal",
                      textIndent: 0,
                      textAlign: "start",
                      textDecorationLine: "none",
                      textDecorationStyle: "solid",
                      textDecorationColor: "#000",
                      textTransform: "none",
                      blockProgression: "tb",
                      whiteSpace: "normal",
                      isolation: "auto",
                      mixBlendMode: "normal",
                      solidColor: "#000",
                      solidOpacity: 1,
                    }}
                    className={`${
                      data?.singleOrder?.orderStatus?.delivered?.status === true
                        ? "fill-border-blue"
                        : "fill-text-header"
                    }`}
                    fillRule="evenodd"
                    d="M15.979 3.002a.5.5 0 0 0-.243.072L1.242 12.07a.5.5 0 0 0 .264.924H3v15.504a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5V14.994h18v13.504a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5V12.994h1.494a.5.5 0 0 0 .264-.924L16.264 3.074a.5.5 0 0 0-.285-.072zM16 4.09l12.738 7.906H28.5a.5.5 0 0 0-.5.5V28h-2V14.496a.5.5 0 0 0-.5-.5h-19a.5.5 0 0 0-.5.5V28H4V12.496a.5.5 0 0 0-.5-.5h-.238L16 4.09zM12.95 8A.5.5 0 0 0 13 9h6a.5.5 0 1 0 0-1h-6a.5.5 0 0 0-.05 0zm-2 2a.5.5 0 0 0 .05 1h10a.5.5 0 1 0 0-1H11a.5.5 0 0 0-.05 0zm5.542 6.994a.5.5 0 0 0-.074.006H14.5a.5.5 0 0 0-.5.5v4.064l-2.227-.96a.5.5 0 0 0-.294-.075.5.5 0 0 0-.233.067l-2.844 1.226a.5.5 0 0 0-.265.153.5.5 0 0 0-.055.066.5.5 0 0 0-.006.01.5.5 0 0 0-.074.347v3.76a.5.5 0 0 0 .006.13.5.5 0 0 0 .004.013.5.5 0 0 0 .002.015.5.5 0 0 0 .007.03.5.5 0 0 0 .004.01.5.5 0 0 0 .014.039.5.5 0 0 0 .004.007.5.5 0 0 0 .018.04.5.5 0 0 0 .01.015.5.5 0 0 0 .29.229l2.895 1.25a.5.5 0 0 0 .012.005.5.5 0 0 0 .074.032.5.5 0 0 0 .213.021.5.5 0 0 0 .002 0 .5.5 0 0 0 .035-.006.5.5 0 0 0 .015-.002.5.5 0 0 0 .034-.007.5.5 0 0 0 .013-.004.5.5 0 0 0 .047-.02.5.5 0 0 0 .045-.021.5.5 0 0 0 .004-.002L14 26.96v.539a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5h-1.922a.5.5 0 0 0-.086-.006.5.5 0 0 0-.074.006h-1.84a.5.5 0 0 0-.086-.006zM15 18h1v1.406a.5.5 0 0 0 .557.588.5.5 0 0 0 .043-.008.5.5 0 0 0 .007-.002.5.5 0 0 0 .086-.029.5.5 0 0 0 .008-.002.5.5 0 0 0 .016-.008l.03-.013a.5.5 0 0 0 .007-.004l.738-.371.778.388a.5.5 0 0 0 .287.05.5.5 0 0 0 .052-.01.5.5 0 0 0 .016-.005.5.5 0 0 0 .03-.007.5.5 0 0 0 .003-.002.5.5 0 0 0 .088-.04.5.5 0 0 0 .002-.001.5.5 0 0 0 .041-.026.5.5 0 0 0 .002-.002.5.5 0 0 0 .04-.03.5.5 0 0 0 .032-.032.5.5 0 0 0 .137-.35V18h1v4h-1.383a.5.5 0 0 0-.125-.014.5.5 0 0 0-.113.014h-1.762a.5.5 0 0 0-.125-.014.5.5 0 0 0-.113.014H15v-4zm2 0h1v.691l-.283-.14a.5.5 0 0 0-.242-.053.5.5 0 0 0-.205.053l-.27.135V18zm-5.5 3.576 1.734.748-1.734.748-.707-.304-1.03-.444 1.737-.748zM15 23h1v1.406a.5.5 0 0 0 .408.586.5.5 0 0 0 .041.006.5.5 0 0 0 .059.002.5.5 0 0 0 .26-.078l.724-.361.778.386a.5.5 0 0 0 .093.035.5.5 0 0 0 .045.01.5.5 0 0 0 .1.008.5.5 0 0 0 .004 0 .5.5 0 0 0 .004 0 .5.5 0 0 0 .484-.506V23h1v4h-5v-.762a.5.5 0 0 0 0-.05V23zm2 0h1v.695l-.283-.142a.5.5 0 0 0-.242-.051.5.5 0 0 0-.205.05l-.27.136V23zm-7.998.084.303.13 1.091.472.604.26v2.79l-1.998-.863v-2.789zm4.996 0v2.789L12 26.736v-2.79l1.998-.862z"
                    color="#000"
                    enableBackground="accumulate"
                    fontFamily="sans-serif"
                    fontWeight={400}
                    overflow="visible"
                  />
                </svg>
              </div>
              <div className="flex flex-col justify-between">
                <h3 className="text-sm text-text-para">Delivered</h3>
                <p className="text-xs text-text-para">
                  {data?.singleOrder?.orderStatus?.delivered?.orderDate
                    ? new Date(
                        data?.singleOrder?.orderStatus?.delivered?.orderDate
                      ).toDateString()
                    : ""}
                </p>
              </div>
            </div>
          </div>

          <button
            className="mt-auto mb-4 bg-border-blue py-2 text-white shadow-md rounded w-full"
            onClick={handleOpenModal}
          >
            Update
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-8">
        <div className="flex-auto lg:w-[80rem] relative h-full flex flex-col px-5 py-1 bg-white shadow-md sm:rounded-lg ...">
          <div className="sm:py-4 py-3 flex gap-6">
            <h3 className="sm:text-lg text-md font-medium leading-6 text-text-header">
              Shipping Details
            </h3>
          </div>

          <div className="border-t flex gap-2 border-text-para border-opacity-60 py-6">
            <div className="flex flex-col sm:gap-4 gap-3 flex-auto">
              <div className="flex gap-2 items-center">
                <FaUser />
                <p className=" text-text-header text-xs sm:text-sm">Olivia Parker</p>
              </div>

              <div className="flex gap-2 items-center">
                <HiMail />
                <p className=" text-text-header text-xs sm:text-sm">Olivia Parker</p>
              </div>

              <div className="flex gap-2 items-center">
                <BsFillTelephoneFill />
                <p className=" text-text-header text-xs sm:text-sm">+1 212 8772900</p>
              </div>
            </div>

            <div className="flex flex-col sm:gap-4 gap-3 flex-auto">
              <div className="flex gap-2 items-center">
                <p className=" text-text-header text-xs sm:text-sm">
                  United States, San Francisco
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <p className=" text-text-header text-xs sm:text-sm">
                  490 Post St, Suite 900, San Francisco, CA
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <p className=" text-text-header text-xs sm:text-sm">94762</p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex-auto lg:w-[20rem] flex flex-col bg-white px-5 py-1 shadow-md sm:rounded-lg relative ...">
          <div className="sm:py-4 py-3 flex sm:gap-6 gap-3">
            <h3 className="sm:text-lg text-md font-medium leading-6 text-text-header">
              Delivery Details
            </h3>
          </div>

          <div className="border-t flex gap-2 border-text-para border-opacity-60 py-6">
            <div className="object-cover w-24 mx-auto text-black text-left sm:text-sm text-xs">
              {data?.singleOrder?.orderStatus.orderUrl !== "" ? (
                data?.singleOrder?.orderStatus.orderUrl
              ) : (
                <img src={errorIcon} alt="" />
              )}
            </div>
          </div>
        </div>
      </div>

      <OrderModal
        handleOpenModal={handleOpenModal}
        modal={modal}
        orderId={orderID}
        orderData={data?.singleOrder}
      />
    </div>
  );
};

export default OrderComponents;
