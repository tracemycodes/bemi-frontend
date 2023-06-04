import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoMdClose, IoMdWarning } from "react-icons/io";

export default function CheckModal({ handleOpenModal, modal }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(modal);
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl">
                <div className="bg-white px-6 pt-6">
                  <div className="border-b border-text-para/30 pb-4">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left flex flex-col align-middle">
                      <Dialog.Title
                        as="h3"
                        className="flex mb-4 w-full items-center"
                      >
                        <div className="border border-red h-10 w-10 rounded-full flex align-middle items-center justify-center">
                          <IoMdWarning className=" text-xl text-red/50" />
                        </div>
                        <h2 className="text-lg font-medium ml-4 leading-6 text-text-header">
                          {true
                            ? "Login into your account"
                            : "Update shippment details"}
                        </h2>
                        <IoMdClose
                          className="cursor-pointer text-2xl ml-auto"
                          onClick={() => handleOpenModal(false)}
                        />
                      </Dialog.Title>

                      <div className="pb-2">
                        <p className="text-sm text-text-para w-full">
                          {true
                            ? "Login into your account to continue with the purchase of your cart items"
                            : "Please update your correct shipping information to continue to checkout"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-6 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border-2 border-red bg-white px-4 py-2 text-base font-medium text-text-header shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red/20 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => handleOpenModal(false)}
                    ref={cancelButtonRef}
                  >
                    Back
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
