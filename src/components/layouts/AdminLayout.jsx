import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader/AdminHeader";
import AdminSidebar from "./AdminSidebar/AdminSidebar";
import SideBar from "./SideBar/SideBar";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../queries/userQuery";
import { toast } from "react-toastify";

const AdminLayout = () => {
  const navigate = useNavigate()
  const [navState, setNavState] = useState(false);
  const { loading, error, data } = useQuery(GET_USER);

  const handleToggle = () => {
    setNavState(!navState);
  };

  useEffect(() => {
    if ((data && !data.getUser.isAdmin ) || !localStorage.token) {
      navigate('/login')
      localStorage.removeItem('token')
    }
    if (error) {
      toast.error(error.message, {
        pauseOnFocusLoss: false,
        position: toast.POSITION.TOP_RIGHT,
      })
      localStorage.removeItem('token')
      navigate('/login')
    }
    //eslint-disable-next-line
  },[data, error])

  return (
    <div>
      <SideBar navState={navState} handleToggle={handleToggle} />
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
    </div>
  );
};

export default AdminLayout;
