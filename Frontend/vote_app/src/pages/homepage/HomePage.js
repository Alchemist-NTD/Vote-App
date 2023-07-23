import React from "react";
import { useState, useEffect } from "react";
import { getAllPoll } from "../../services/service";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const mockData = [
  {
    id: 1,
    title:
      "Hôm nay ăn gì? It very comfotable for work. So what we should eat in Friday night?",
  },
  {
    id: 2,
    title: "Liên hoan D1",
  },
];
function HomePage() {
  const [polls, setPolls] = useState(mockData);
  useEffect(() => {
    let isMounted = true;
    const fetchPollData = async () => {
      try {
        const res = await getAllPoll();
        if (res) {
          setPolls(res.data.data);
        }
      } catch (error) {
        if (isMounted) {
          toast.error("get poll list failed!");
        }
      }
    };
    fetchPollData();
    return () => {
      isMounted = false; 
    };
  }, []);
  return (
    <div className="w-4/5 mx-auto">
      <div className="p-2">
        <h2 className="text-start font-semibold text-xl">Poll avaiable</h2>
      </div>
      <div>
        {polls.map((poll) => (
          <div
            key={poll.id}
            className="flex justify-start w-full md:w-1/2 border-2 rounded-md shadow-sm cursor-pointer px-2 py-3 my-3"
          >
            <Link to={`/poll/detail/${poll.id}`}>{poll.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
