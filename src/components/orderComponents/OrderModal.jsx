import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import { useMutation } from "@apollo/client";
import { UPDATE_ORDER } from "../../mutations/orderMutations";
import ReactLoading from "react-loading";

export default function OrderModal({
  handleOpenModal,
  modal,
  orderID,
  orderData,
}) {
  const [updateOrder, { data, loading, error }] = useMutation(UPDATE_ORDER);
  const [open, setOpen] = useState(false);
  const [urlCheck, setUrlCheck] = useState(false)
  const [deliveryState, setDeliveryState] = useState({});

  useEffect(() => {
    setOpen(modal);
  }, [modal]);

  useEffect(() => {
    setDeliveryState(orderData?.orderStatus);
  }, [orderData]);

  const cancelButtonRef = useRef(null);

  const handleProgress = (idx, progress) => {
    if (progress) {
      return;
    }
    if (idx === 'shipped') {
      setUrlCheck(true)
    }
    setDeliveryState({
      ...deliveryState,
      [idx]: { status: true, orderDate: String(new Date()) },
    });
    // setPackageState(idx);
  };

  const handleUrlChange = (e) => {
    setDeliveryState({ ...deliveryState, orderUrl: e.target.value });
  };

  const handleOrderUpdate = async () => {
    if (urlCheck) {
      alert('Add order delivery URL')
      return
    }
    try {
      const updateObj = {
        status: deliveryState?.status,
        orderUrl: deliveryState?.orderUrl ? deliveryState?.orderUrl : '',
        placed: {
          orderDate: deliveryState?.placed?.orderDate
            ? deliveryState?.placed?.orderDate
            : "",
          status: deliveryState?.placed?.status ? true : false,
        },
        packed: {
          orderDate: deliveryState?.packed?.orderDate
            ? deliveryState?.packed?.orderDate
            : "",
          status: deliveryState?.packed?.status ? true : false,
        },
        shipped: {
          orderDate: deliveryState?.shipped?.orderDate
            ? deliveryState?.shipped?.orderDate
            : "",
          status: deliveryState?.shipped?.status ? true : false,
        },
        delivered: {
          orderDate: deliveryState?.delivered?.orderDate
            ? deliveryState?.delivered?.orderDate
            : "",
          status: deliveryState?.delivered?.status ? true : false,
        },
      };

      await updateOrder({
        variables: { orderStatus: updateObj, orderId: orderData._id },
      });
      handleOpenModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={handleOpenModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed top-0 left-0 w-full h-full bg-black/30  transition-opacity"
            style={{ backdropFilter: "blur(1.5px)" }}
          />
        </Transition.Child>

        <div className="fixed border transition-opacity inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                <div className="bg-white px-6 pt-5">
                  <div className="sm:flex sm:items-start flex-col border-b border-text-para/30">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="flex justify-between mb-4"
                      >
                        <h2 className="text-lg font-medium leading-6 text-text-header">
                          Update shippment details
                        </h2>
                        <IoMdClose
                          className="cursor-pointer text-2xl"
                          onClick={() => handleOpenModal(false)}
                        />
                      </Dialog.Title>

                      {/* <div className="pb-2 border border-red">
                        <p className="text-sm text-text-para">
                          
                        </p>
                      </div> */}

                      <div className="flex flex-wrap items-center gap-2 mt-7 pb-7">
                        <div className="border flex-auto border-border-blue"></div>

                        <div className="flex gap-2 items-center">
                          <p className="text-text-header">Order Placed</p>
                        </div>

                        <div className="border min-w-[1.2rem] border-border-blue"></div>

                        <div className="rounded-full border-4 border-border-blue outline outline-border-blue/20 outline-offset-2 w-4 h-4 flex-none cursor-pointer"></div>

                        <div className="border min-w-[1.2rem] border-border-blue"></div>

                        <div className="flex gap-2 items-center">
                          <p
                            className={`${
                              deliveryState?.packed?.status ||
                              deliveryState?.shipped?.status ||
                              deliveryState?.delivered?.status
                                ? "text-text-header"
                                : "text-text-para"
                            }`}
                          >
                            Packed
                          </p>
                        </div>

                        <div
                          className={`border min-w-[1.2rem] ${
                            deliveryState?.packed?.status ||
                            deliveryState?.shipped?.status ||
                            deliveryState?.delivered?.status
                              ? "border-border-blue"
                              : "border-border-blue/20 border-dashed"
                          }`}
                        ></div>

                        <div
                          className={`rounded-full ${
                            deliveryState?.packed?.status ||
                            deliveryState?.shipped?.status ||
                            deliveryState?.delivered?.status
                              ? "border-4"
                              : "border-2 border-dashed"
                          } border-border-blue outline outline-border-blue/20 outline-offset-2 w-4 h-4 flex-none cursor-pointer`}
                          onClick={() =>
                            handleProgress(
                              "packed",
                              deliveryState?.packed?.status
                            )
                          }
                        ></div>

                        <div
                          className={`border min-w-[1.2rem] ${
                            deliveryState?.packed?.status ||
                            deliveryState?.shipped?.status ||
                            deliveryState?.delivered?.status
                              ? "border-border-blue"
                              : "border-border-blue/20 border-dashed"
                          }`}
                        ></div>

                        <div className="flex gap-2 items-center">
                          <p
                            className={`${
                              deliveryState?.shipped?.status ||
                              deliveryState?.delivered?.status
                                ? "text-text-header"
                                : "text-text-para"
                            }`}
                          >
                            Shipped
                          </p>
                        </div>

                        <div
                          className={`border min-w-[1.2rem] ${
                            deliveryState?.shipped?.status ||
                            deliveryState?.delivered?.status
                              ? "border-border-blue"
                              : "border-border-blue/20 border-dashed"
                          }`}
                        ></div>

                        <div
                          className={`rounded-full ${
                            deliveryState?.shipped?.status ||
                            deliveryState?.delivered?.status
                              ? "border-4"
                              : "border-2 border-dashed"
                          } border-border-blue outline outline-border-blue/20 outline-offset-2 w-4 h-4 flex-none cursor-pointer`}
                          onClick={() =>
                            handleProgress(
                              "shipped",
                              deliveryState?.shipped?.status
                            )
                          }
                        ></div>

                        <div
                          className={`border min-w-[1.2rem] ${
                            deliveryState?.shipped?.status ||
                            deliveryState?.delivered?.status
                              ? "border-border-blue"
                              : "border-border-blue/20 border-dashed"
                          }`}
                        ></div>

                        <div className="flex gap-2 items-center">
                          <p
                            className={`${
                              deliveryState?.delivered?.status
                                ? "text-text-header"
                                : "text-text-para"
                            }`}
                          >
                            Delivered
                          </p>
                        </div>

                        <div
                          className={`border min-w-[1.2rem] ${
                            deliveryState?.delivered?.status
                              ? "border-border-blue"
                              : "border-border-blue/20 border-dashed"
                          }`}
                        ></div>

                        <div
                          className={`rounded-full ${
                            deliveryState?.delivered?.status
                              ? "border-4"
                              : "border-2 border-dashed"
                          } border-border-blue outline outline-border-blue/20 outline-offset-2 w-4 h-4 flex-none cursor-pointer`}
                          onClick={() =>
                            handleProgress(
                              "delivered",
                              deliveryState?.delivered?.status
                            )
                          }
                        ></div>

                        <div
                          className={`border min-w-[1.2rem] ${
                            deliveryState?.delivered?.status
                              ? "border-border-blue"
                              : "border-border-blue/20 border-dashed"
                          }`}
                        ></div>
                      </div>

                      {/* DELIVERY URL */}
                      {deliveryState?.shipped?.status && (
                        <div className="flex flex-col gap-2 mb-6">
                          <label
                            htmlFor="orderUrl"
                            className="text-sm text-text-para"
                          >
                            Delivery URL
                          </label>
                          <input
                            type="text"
                            id="orderUrl"
                            name="orderUrl"
                            value={deliveryState.orderUrl}
                            className="focus:ring-border-blue py-1 px-4 rounded-md border border-text-para/60"
                            onChange={handleUrlChange}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-6 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border-2 border-border-blue px-4 py-2 text-base font-medium text-text-header shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-border-blue/20 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleOrderUpdate}
                  >
                    {loading && (
                      <ReactLoading
                        type="cylon"
                        color="#0B90E2"
                        className="border-border-blue"
                        height={20}
                        width={20}
                      />
                    )}
                    Update
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border-2 border-red bg-white px-4 py-2 text-base font-medium text-text-header shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red/20 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => handleOpenModal(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
