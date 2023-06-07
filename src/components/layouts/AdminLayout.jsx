import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader/AdminHeader";
import AdminSidebar from "./AdminSidebar/AdminSidebar";
import SideBar from "./SideBar/SideBar";

const AdminLayout = () => {
  const [navState, setNavState] = useState(false)

  const handleToggle = () => {
    setNavState(!navState)
  }

  return (
    <>
    <SideBar navState={navState} handleToggle={handleToggle}/>
    <div className="ml-0 lg:ml-[13rem] min-h-screen bg-[#F4F4F6] bg-opacity-90 flex">
      <AdminSidebar />
      <div className={`basis-full h-screen relative overflow-y-scroll`}>
        <div className="fixed z-10 pl-0 lg:pl-[13rem] flex right-0 w-full">
          <AdminHeader handleToggle={handleToggle} />
        </div>
        <div className="sm:px-8 px-4 py-10 mt-14">
          <Outlet />
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminLayout;
