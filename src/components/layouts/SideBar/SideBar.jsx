import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md";

export default function SideBar({ navState, handleToggle }) {
  const [open, setOpen] = useState(navState);

  useEffect(() => {
    setOpen(navState);
  }, [navState]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleToggle}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-gray-500 bg-black/40 bg-opacity-75 transition-opacity"
            style={{ backdropFilter: "1rem" }}
          />
        </Transition.Child>
        <div
          className="fixed inset-0 overflow-hidden"
          style={{ backdropFilter: "blur(2px)" }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-[20rem]">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                      <button type="button" className="" onClick={handleToggle}>
                        <MdClose className=" text-white text-3xl" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-[#0E2B43] py-6 shadow-xl">
                    <ul className="text-white text-xl min-h-[28rem] flex flex-col justify-around align-middle items-center">
                      <li>
                        <Link to={"/admin"} onClick={handleToggle}>
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link to={"/admin/product"} onClick={handleToggle}>
                          Product
                        </Link>
                      </li>
                      <li>
                        <Link to={"/admin/order"} onClick={handleToggle}>
                          Order
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
