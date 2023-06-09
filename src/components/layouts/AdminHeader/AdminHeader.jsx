import { Fragment, useContext } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { IoMdMenu } from "react-icons/io";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import BemiIvoryContext from "../../../context/BemiIvory/bemiIvoryContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminHeader({ handleToggle }) {
  const bemiIvoryContext = useContext(BemiIvoryContext);
  const {
    state: { order: orderData },
  } = bemiIvoryContext;
  const { orderID } = useParams();
  const navigate = useNavigate();

  return (
    <Disclosure as="nav" className="bg-gray-800 basis-full">
      {({ open }) => (
        <>
          <div className="bg-white shadow-md px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  <div className="" onClick={handleToggle}>
                    <IoMdMenu className=" text-3xl" />
                  </div>
                </Disclosure.Button>
              </div>

              <div className="flex flex-1 flex-col items-center justify-center sm:items-stretch sm:justify-start">
                {orderID && orderData && (
                  <>
                    <div
                      className="flex gap-2 items-center cursor-pointer"
                      onClick={() => navigate("/admin/order")}
                    >
                      <FiArrowLeft />
                      <h2 className="text-text-header">Order</h2>
                      <p className="text-border-blue">#{orderData.id}</p>
                    </div>
                    <p className="text-text-para text-xs">
                      {/* Jul 17, 2021 at 09:44am */}
                      {new Date(parseInt(orderData.orderDate)).toDateString()}
                    </p>
                  </>
                )}
              </div>

              <div className="absolute justify-self-end inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={'/'}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
