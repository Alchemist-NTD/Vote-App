import React from "react";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import useDataContext from "../../context/useDataContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  const { user } = useDataContext();
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
            <Link to="/poll/create/"><p className="font-semibold text-base">Create Poll</p></Link>
          </div>
          <div className="p-4 hidden cursor-pointer md:block hover:border-b-2 hover:border-b-gray-500" onClick={() => {navigate('/poll/create/')}}>
          <Link to="/poll/mypoll/"><p className="font-semibold text-base">My Poll</p></Link>
          </div>
        </div>

        <div className="px-4 flex items-center gap-2">
          <div className="hidden md:block">
            <img
              src={user?.avatar}
              alt=""
              className="rounded-full border-2 border-gray-500 h-10 w-10"
            />
          </div>
          <p className="">Hello, {user?.name}</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
