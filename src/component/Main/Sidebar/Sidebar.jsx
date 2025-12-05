/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/features/auth/authSlice";
import LogoImage from "../../../assets/logo/Logo.png";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FaBriefcase, FaBuilding, FaCheckSquare,   FaCog,   FaHeadphones,   FaTh,  FaUserTie } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { PiExcludeSquareLight } from "react-icons/pi";

const dynamicSidebarItems = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaTh className="size-6" />,
  },
  {
    path: "/Employee",
    name: "Employee",
    icon: <FaUserTie  className="size-6" />,
  },
  {
    path: "/Payroll",
    name: "Payroll",
    icon: <PiExcludeSquareLight className="size-6" />,
  },
  {
    path: "/Pay Slip",
    name: "Pay Slip",
    icon: <FaCheckSquare className="size-6" />,
  },
  {
    path: "/Attendance",
    name: "Attendance",
    icon: <FaBriefcase className="size-6" />,
  },
  {
    path: "/Request Center",
    name: "Request Center",
    icon: <FaBuilding className="size-6" />,
  },
  {
    path: "/Career Database",
    name: "Career Database",
    icon: <FaHeadphones className="size-6" />,
  },
  
  {
    path: "/Document manager",
    name: "Document manager",
    icon: <FaCog className="size-6" />,
  },
  {
    path: "/add-notice",
    name: "Notice Board",
    icon: <FaCog className="size-6" />,
  },
  
  {
    path: "/Activity Log",
    name: "Activity Log",
    icon: <FaCog className="size-6" />,
  },
  {
    path: "/Exit Interview",
    name: "Exit Interview",
    icon: <FaCog className="size-6" />,
  },
  
  {
    path: "/Profile",
    name: "Profile",
    icon: <FaCog className="size-6" />,
  },
  
  

 
];

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/auth");
  };



  return (
    <div>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-[320px] h-[100vh] bg-[#fff] fixed shadow-2xl z-20 ">
        <div className="flex-col flex justify-between items-center py-3 text-[rgba(0,0,0,0.7)] flex-grow">
          <img src={LogoImage} alt="logo" className=" w-[150px] h-[27.55555534362793PX]   " />
        </div>
       
        <div className="flex flex-col justify-between h-[100%] pt-5">
          <div>
            <ul className="w-full flex flex-col gap-1">
              {dynamicSidebarItems.map((item) => (
                <NavLink
                  to={item.path}
                  key={item.name}
                  className={({ isActive }) =>
                    `w-[60%] mx-auto px-1 py-2 flex justify-start items-center gap-3 transition duration-100 ease-linear hover:pl-3 ${
                      isActive
                        ? "bg-[#F5F6FA] text-[rgba(0,0,0,0.7)] rounded-md border-l-4 border-[#FEFEFE]]"
                        : "text-[rgba(0,0,0,0.7)]"
                    }`
                  }
                >
                  {item.icon}
                  <h>{t(item.name)}</h>
                </NavLink>
              ))}
            </ul>
          </div>
          <div>
            {/* <div className="border-b border-gray-500"></div> */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-10 py-4 text-rose-500 mt-4 ml-9"
            >
              <RiLogoutCircleRLine className="size-8" />
              <span>{t("Logout")}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 w-64 h-full bg-[#fff] shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex flex-col justify-center items-center pt-5 gap-2 text-[rgba(0,0,0,0.8)]">
          <img src={LogoImage} alt="logo" className="w-32 h-12 bg-[#FEFEFE] " />
        </div>
        <ul className="w-full flex flex-col gap-3 mt-[15px]">
          {dynamicSidebarItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              className={({ isActive }) =>
                `w-[60%] mx-auto px-2 py-2 flex justify-start items-center gap-3 transition duration-100 ease-linear hover:pl-3 ${
                  isActive
                    ? "bg-[#F5F6FA] text-[rgba(0,0,0,0.7)] rounded-md border-l-4 border-[#98DED9]"
                    : "text-[rgba(0,0,0,0.8)]"
                }`
              }
            >
              {item.icon}
              <h>{t(item.name)}</h>
            </NavLink>
          ))}
        </ul>
        <button
          onClick={() => {
            handleLogout();
            toggleSidebar();
          }}
          className="flex items-center gap-2 px-10 py-4 text-rose-500 ml-9"
        >
          <RiLogoutCircleRLine className="size-8" />
          <span>{t("Logout")}</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
