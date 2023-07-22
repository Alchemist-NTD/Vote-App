import React, { useState } from 'react'

const fakeData = {
  id: 1,
  options: [
    {
      id: 1,
      name: "1",
      voted: 10,
    },
    {
      id: 2,
      name: "2",
      voted: 3
    }
  ],
  title: "What will eat today?",
  totalVoted: 15,
  time_exp: "25-07-2023 15:30:00",
  allow_create_new_option : true,
  is_multivote: true,
}
function PollDetail() {
  const [vote, setVote] = useState({
    votes: []
  });
  return (
    <div className="w-11/12 md:w-3/5 xl:w-1/2 mx-auto">
      <div>
        {/* For vote and add vote if allow */}

      </div>

      <div>
        {/* Result */}
      </div>
    </div>
  )
}

export default PollDetail