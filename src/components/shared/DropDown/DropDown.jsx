import { Fragment, useContext, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import BemiIvoryContext from "../../../context/BemiIvory/bemiIvoryContext";
import { PROFILE_CHECK } from "../../../context/types";



export default function DropDown() {
  const navigate = useNavigate();
  const bemiIvoryContext = useContext(BemiIvoryContext);
  const { state, dispatch } = bemiIvoryContext;
  const [userToken, setUserToken] = useState(() =>
    localStorage.getItem("token")
  );

  useEffect(() => {
    setUserToken(localStorage.token);
  }, [state.profile]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserToken(null);
    navigate("/");
  };

  return (
    <Menu
      as="div"
      className="relative inline-flex self-center items-center justify-center text-left"
    >
      <div>
        <Menu.Button className="">
          <FiUser />
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
        <Menu.Items className="absolute right-0 top-0 z-10 mt-8 w-24 sm:w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-2 sm:p-3 flex flex-col gap-2">
            {userToken ? (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      className="flex items-center text-black gap-3 text-base"
                      to={"/account"}
                    >
                      <MdDashboard />
                      Dashboard
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className="flex items-center text-black gap-3 text-base"
                      onClick={handleLogout}
                    >
                      <BiLogIn />
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </>
            ) : (
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={"/login"}
                    className="flex items-center text-black gap-3 text-sm sm:text-base"
                  >
                    <BiLogIn /> Login
                  </Link>
                )}
              </Menu.Item>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
