/* eslint-disable react/prop-types */
import { FiMenu } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";

const Header = ({ toggleSidebar }) => {
  return (
    <div className="w-full   bg-[#FEFEFE]  flex justify-between items-center py-3 px-5 shadow-lg relative">
      {/* Left Side */}

      <div>
        <button
          className="md:hidden text-gray-500 text-2xl"
          onClick={toggleSidebar}
        >
          <FiMenu />
        </button>

        <h2 className="text-sm font-semibold text-gray-700">
          Good Afternoon Asif
        </h2>
        <div className="lg:flex items-center space-x-4 mx-auto sm: hidden">
          <span className="text-blue-600 text-center">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className="w-6 h-6 rounded-full border border-purple-400 flex items-center justify-center">
          <IoIosNotificationsOutline className="!text-[40px]" />
        </div>

        {/* Name + Role */}
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-700">Asif Raj</p>
          <p className="text-xs text-gray-500">Hr</p>
        </div>

        {/* Avatar */}
        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="w-10 h-10 rounded-full border"
        />
      </div>
    </div>
  );
};

export default Header;
