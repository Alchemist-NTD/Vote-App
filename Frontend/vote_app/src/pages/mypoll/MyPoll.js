import React, { useState, useEffect } from "react";
import { getMyPoll, deletePoll } from "../../services/service";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";

function MyPoll() {
  const [myPolls, setMyPolls] = useState([]);
  
  useEffect(() => {
    let isMounted = true;
    const fetchDataMyPoll = async () => {
      try {
        const res = await getMyPoll();
        if (res) {
          setMyPolls(res.data.data);
        }
      } catch (error) {
        if (isMounted) {
          toast.error("An error occurred!");
        }
      }
    };
    fetchDataMyPoll();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleDeletePoll = async (id) => {
    if (window.confirm("Are you sure to delete this poll?")) {
      try {
        const res = await deletePoll(id);
        if (res.status === 200) {
          toast.success("Delete poll successfully!");
          let newArray = [...myPolls];
          newArray = newArray.filter((poll) => poll.id !== id);
          setMyPolls(newArray);
        }
      } catch (error) {
        toast.error("Delete poll failed!");
      }
    }
  };
  return (
    <div className="w-4/5 mx-auto">
      <div className="p-2">
        <h2 className="text-start font-semibold text-xl">Poll avaiable</h2>
      </div>
      <div>
        {myPolls.map((poll) => (
          <div
            key={poll.id}
            className="flex justify-between gap-5 w-full md:w-1/2 border-2 rounded-md shadow-sm cursor-pointer px-2 py-3 my-3"
          >
            <Link to={`/poll/detail/${poll.id}`}>{poll.title}</Link>
            <span onClick={() => handleDeletePoll(poll.id)}>
              <ClearIcon />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPoll;
