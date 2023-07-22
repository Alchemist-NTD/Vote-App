import React, { useEffect, useState } from "react";
import { Button, Checkbox } from "@mui/material";
import { TextField } from "@mui/material";
import { updatePollVote, createVote, fetchDetailPoll } from "../../services";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const fakeData = {
  id: 1,
  options: ["1", "2", "3"],
  title: "What will eat today?",
  time_exp: "20-07-2023 15:30:00",
  is_multiple_vote_context: false,
  allow_create_extra_ops: true,
};

function PollDetail() {
  const { id } = useParams();
  const [voteData, setVoteData] = useState({
    vote_context: id,
    vote_sequence: [],
  });
  const [checkExp, setCheckExp] = useState(false);

  const [vote_context, setVote_context] = useState(fakeData);
  const [newOption, setNewOption] = useState("");
  
  useEffect(() => {
    if(vote_context.time_exp){
      const dateTime = new Date(vote_context.time_exp);
      const currentDate = new Date();
      console.log(dateTime);
      if(dateTime < currentDate){
        setCheckExp(true);
        toast.error('This poll expired!');
      }
    }
  }, [vote_context]);
  const handleVoteChange = (option) => {
    if (!voteData.vote_sequence.includes(option)) {
      setVoteData({
        ...voteData,
        vote_sequence: [...voteData.vote_sequence, option],
      });
    } else {
      let arrayVote = [...voteData.vote_sequence];
      arrayVote = arrayVote.filter((value) => value !== option);
      setVoteData({ ...voteData, vote_sequence: arrayVote });
    }
  };

  const handleCreateOption = async () => {
    if (!newOption) {
      toast.error('Please input new vote option!');
    } else {
      try {
        const response = await updatePollVote(id, newOption);
        if (response.status === 200) {
          toast.success("Update vote option successfully!");
        }
      } catch (error) {
        toast.error("Create vote option error!");
      }
    }
  };

  const submitPoll = async () => {

    if (!voteData.vote_sequence.length) {
      toast.error('Please choose option!')
    }

    if (
      !vote_context.is_multiple_vote_context &&
      voteData.vote_sequence.length &&
      voteData.vote_sequence.length < 2
    ) {
      toast.error("You must choose an option, please!");
      return;
    }

    try {
      const res = await createVote(voteData);
      if(res.status === 200){
        toast.success('Vote successfully!');
      }
    } catch (error) {
      toast.error('Vote failed!');
    }
  };
  return (
    <div className="w-11/12 md:w-3/5 xl:w-1/2 mx-auto">
      <div className="border border-t-2 rounded-md p-2 lg:p-5">
        <div>
          {/* For vote and add vote if allow */}
          <div className="mb-4">
            <h2 className="text-start text-base font-bold">
              {vote_context.title}
            </h2>
          </div>
          {vote_context.options.map((option, index) => (
            <div key={index} className="flex justify-start items-center">
              <Checkbox
                checked={voteData.vote_sequence.includes(option)}
                onChange={() => {
                  handleVoteChange(option);
                }}
              />
              <p>{option}</p>
            </div>
          ))}
          <div>
            {vote_context.allow_create_extra_ops ? (
              <div>
                <div className="flex justify-start mb-4">
                  <h3 className="font-bold">Create a new option</h3>
                </div>
                <div className="flex items-center gap-5">
                  <TextField
                    fullWidth
                    size="small"
                    type="text"
                    onChange={(event) => {
                      setNewOption(event.target.value);
                    }}
                    placeholder="New Option"
                  />
                  <Button
                    onClick={handleCreateOption}
                    variant="contained"
                    color="primary"
                  >
                    Create
                  </Button>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>

          <div className="my-3 flex justify-start items-center">
            <Button variant="contained" onClick={() => submitPoll()}>
              Submit
            </Button>
          </div>
        </div>

        <div>{/* Result */}</div>
      </div>
    </div>
  );
}

export default PollDetail;
