import React, { useState } from "react";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import useDataContext from "../../context/useDataContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./header.css";
function Header() {
  const navigate = useNavigate();
  const { user } = useDataContext();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const handleOpenMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  }
  const redirectHomePage = () => {
    navigate("");
  };
  return (
    <div className="fixed h-20 w-full border-b-2 px-8 top-0 bg-white">
      <div className="h-full flex justify-between items-center md:mx-16 lg:mx-28">
        <div className="flex justify-start items-center">
          <div
            className="flex items-center justify-start gap-1 cursor-pointer md:px-4"
            onClick={redirectHomePage}
          >
            <PollOutlinedIcon className="text-lime-700" />
            <p className="font-bold text-lime-700 leading-8 text-3xl">ZPOLL</p>
          </div>

          <div className="p-4 hidden cursor-pointer md:block hover:border-b-2 hover:border-b-gray-500">
            <Link to="/poll/create/">
              <p className="font-semibold text-base">Create Poll</p>
            </Link>
          </div>
          <div className="p-4 hidden cursor-pointer md:block hover:border-b-2 hover:border-b-gray-500">
            <Link to="/poll/mypoll/">
              <p className="font-semibold text-base">My Poll</p>
            </Link>
          </div>
        </div>

        <div className="px-4 hidden sm:flex sm:items-center sm:gap-2 ">
          <div className="">
            <img
              src={user?.avatar}
              alt=""
              className="rounded-full border-2 border-gray-500 h-10 w-10"
            />
          </div>
          <div className="">
            <p>Hello, {user?.name}</p>
          </div>
        </div>

        <div className="sm:hidden">
          <div
            className="flex flex-col cursor-pointer "
            onClick={handleOpenMenu}
          >
            <div className="w-9 h-2 bg-lime-700 mt-1"></div>
            <div className="w-9 h-2 bg-lime-700 mt-1"></div>
            <div className="w-9 h-2 bg-lime-700 mt-1"></div>
          </div>

          <div
            className={`menu absolute top-16 w-[150px] rounded-md shadow-md bg-slate-50 ${isOpenMenu ? 'right-8': 'right-[-150px]'}`}
          >
            <ul className="flex flex-col items-center justify-end">
              <li className="w-full border border-b-indigo-500 p-3">
                <Link to="/poll/create/">
                  <p className="font-semibold text-base text-end">Create Poll</p>
                </Link>
              </li>

              <li className="w-full border border-b-indigo-500 p-3">
                <Link to="/poll/mypoll/">
                  <p className="font-semibold text-base text-end">My Poll</p>
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Header;
