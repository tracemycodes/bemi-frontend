import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";

export default function AccountModal({ handleOpenModal, modal, product }) {
  const [open, setOpen] = useState(false);
  const [deliveryState, setDeliveryState] = useState({});

  useEffect(() => {
    setOpen(modal);
    // console.log(product);
  }, [modal]);

  const cancelButtonRef = useRef(null);

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
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                <div className="bg-white px-6 pt-4">
                  <div className="sm:flex sm:items-start flex-col border-b border-text-para/30">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <Dialog.Title
                        as="h3"
                        className="flex justify-between mb-4 w-full"
                      >
                        <h2 className="text-lg font-medium leading-6 text-text-header">
                          Order summary
                        </h2>

                        <IoMdClose
                          className="cursor-pointer text-2xl block"
                          onClick={() => handleOpenModal(false)}
                        />
                      </Dialog.Title>
                    </div>
                  </div>
                </div>

                <div className="w-full flex justify-between items-center px-6 py-3 font-normal">
                  <p className="bg-red/70 px-3 py-1 text-white text-sm rounded-lg shadow-md">
                    {product?.orderStatus.status}
                  </p>
                  <p className=" text-sm">
                    updated at{" "}
                    {new Date(Number(product?.updatedAt)).toDateString()}
                  </p>
                </div>

                <div className="px-6">
                  <h2>cart items</h2>
                  <div className="py-1 border-[#BEBEC6] border-opacity-60 h-[10rem] overflow-auto">
                    {product?.products.map((item) => (
                      <dl className="" key={item.name}>
                        <div className="bg-gray-50 py-2 flex sm:gap-6 gap-3">
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
                      </dl>
                    ))}
                  </div>

                  <div className="mt-auto mb-4 border-t pt-3 border-[#BEBEC6] flex justify-between gap-4">
                    <div className="sm:flex gap-4">
                      <dt className="text-sm font-medium text-text-header flex-none">
                        Order note
                      </dt>

                      <dd className="mt-1 sm:text-sm text-xs text-gray-900 sm:col-span-2 sm:mt-0 flex flex-col flex-auto">
                        <p className="text-text-para text-xs max-w-[16rem]">
                          Ship all the ordered items together by friday and I
                          send you an email please check. Thanks!
                        </p>
                      </dd>
                    </div>

                    <dd className="mt-1 sm:text-sm text-xs text-text-header sm:col-span-2 sm:mt-0 flex flex-col gap-2 flex-none self-center">
                      <div className="flex justify-between gap-8">
                        <p>Total</p>
                        <p>
                          $
                          {product?.products
                            .map(
                              (item) =>
                                parseInt(item.count) * parseInt(item.price)
                            )
                            .reduce((acc, curr) => acc + curr, 0)}
                        </p>
                      </div>
                    </dd>
                  </div>
                </div>

                <div className="px-6 text-sm sm:text-base">
                  <div className="flex justify-between">
                    <p>shipping address</p>
                    <p>{product?.shippingAdd.apartment}</p>
                  </div>

                  <div className="flex justify-between my-2">
                    <p>contact</p>
                    <p>{product?.shippingAdd.phone}</p>
                  </div>

                  <div className="flex gap-4 items-center">
                    <input
                      type="checkbox"
                      name="checkdelivery"
                      id="checkdelivery"
                    />
                    <label
                      className=" text-sm cursor-pointer"
                      htmlFor="checkdelivery"
                    >
                      click to approve delivery
                    </label>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 sm:py-6 py-4 flex gap-4 flex-row-reverse sm:px-6">
                  {/* <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border-2 border-border-blue px-4 py-2 text-base font-medium text-text-header shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-border-blue/20 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {true && (
                      <ReactLoading
                        type="cylon"
                        color="#0B90E2"
                        className="border-border-blue"
                        height={20}
                        width={20}
                      />
                    )}
                    Update
                  </button> */}

                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border-2 border-red bg-white px-4 py-2 text-base font-medium text-text-header shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red/20 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
