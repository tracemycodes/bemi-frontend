import React from "react";
import { IoMdHome } from "react-icons/io";
import { FiPackage } from "react-icons/fi";
import { CgShutterstock } from "react-icons/cg";
import bemiLogo from "../../../assets/images/bemi-logo.png";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation()
  console.log(location.pathname.includes('product'));


  return (
    <div className="lg:w-52 hidden lg:block w-44 fixed top-0 left-0 bg-[#0E2B43] h-screen">
      <div className="flex items-center align-middle h-12">
        <div className="m-auto w-24 md:w-32">
          <img src={bemiLogo} alt="" srcSet="" />
        </div>
      </div>

      <ul className="my-6">
        <Link to="/admin">
          <li className={`flex text-white hover:bg-[#DDECF8]/20 relative ${location.pathname === '/admin' && 'before:top-0 before:left-0 before:w- before:border-[0.24rem] before:border-border-blue before:h-full before:rounded before:absolute bg-[#DDECF8] bg-opacity-20'} gap-4 my-7 align-middle items-center rounded px-3 py-2`}>
            <IoMdHome size={22} />
            <h3>Dashboard</h3>
          </li>
        </Link>

        <Link to='/admin/product'>
          <li className={`flex text-white hover:bg-[#DDECF8]/20 relative ${location.pathname.includes('product') && 'before:top-0 before:left-0 before:w- before:border-[0.24rem] before:border-border-blue before:h-full before:rounded before:absolute bg-[#DDECF8] bg-opacity-20'} gap-4 my-7 align-middle items-center rounded px-3 py-2`}>
            <FiPackage size={22} />
            <h3>Product</h3>
          </li>
        </Link>

        <Link to="/admin/order">
          <li className={`flex text-white hover:bg-[#DDECF8]/20 relative ${location.pathname.includes('order') && 'before:top-0 before:left-0 before:w- before:border-[0.24rem] before:border-border-blue before:h-full before:rounded before:absolute bg-[#DDECF8] bg-opacity-20'} gap-4 my-7 align-middle items-center rounded px-3 py-2`}>
            <CgShutterstock size={22} />
            <h3>Orders</h3>
          </li>
        </Link>

        {/* <li className="flex text-white hover:bg-bs-light gap-4 my-7 align-middle items-center rounded px-3 py-2">
          <FiUsers size={22} />
          <h3>Clients</h3>
        </li> */}
      </ul>
    </div>
  );
};

export default AdminSidebar;
