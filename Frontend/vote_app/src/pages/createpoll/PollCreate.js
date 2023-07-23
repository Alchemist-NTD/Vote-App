import {
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Checkbox } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { createPoll } from "../../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function PollCreate() {
  console.log(process.env.REACT_APP_API_BASE_URL)
  const schema = yup.object({
    title: yup.string().required("Title is required!"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const [pollData, setPollData] = useState({
    is_multiple_vote_context: false,
    allow_create_extra_ops: false,
    date_expired: null,
    options: [""],
    title: "",
  });

  const handleAddOption = () => {
    setPollData({ ...pollData, options: [...pollData.options, ""] });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...pollData.options];
    updatedOptions[index] = value;
    setPollData({ ...pollData, options: [...updatedOptions] });
  };

  const deleteOption = (index) => {
    const updatedOptions = [...pollData.options];
    updatedOptions.splice(index, 1);
    setPollData({ ...pollData, options: [...updatedOptions] });
  };

  const onSubmit = async () => {
    const data = {
      ...pollData,
      date_expired: pollData.date_expired
        ? pollData.date_expired.toISOString()
        : null,
    };

    if (data.options.includes("")) {
      toast.error("Please complete the empty field of options!");
    } else {
      try {
        const response = await createPoll(data);
        if (response.status === 200) {
          setPollData({
            is_multiple_vote_context: false,
            allow_create_extra_ops: false,
            date_expired: null,
            options: [""],
            title: "",
          });
          toast.success("Create Poll Successfully!");
          navigate("/");
        }
      } catch (error) {
        toast.error("Create Poll Error!");
      }
    }
  };
  return (
    <div className="w-11/12 md:w-3/5 xl:w-1/2 mx-auto">
      <div className="my-5">
        <h3 className="text-center text-3xl font-bold">Create a Poll</h3>
        <p className="text-center text-gray-400">
          Complete the below fields to create your poll.
        </p>
      </div>
      <div className="border border-t-2 border-t-orange-300 rounded-md p-2 lg:p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-2">
            <h2 className="text-start text-xl font-bold">
              Title <i className="text-red-500">*</i>
            </h2>
            <div className="my-2">
              <TextField
                fullWidth
                size="small"
                type="text"
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title && errors.title.message}
                onChange={(event) => {
                  setPollData({ ...pollData, title: event.target.value });
                }}
                placeholder="Title"
                value={pollData.title}
              />
            </div>
          </div>

          <div className="my-2 flex justify-start items-center">
            <span className="text-base font-bold">MultiVote Choice</span>
            <Checkbox
              onChange={(event) =>
                setPollData({ ...pollData, is_multiple_vote_context: event.target.checked })
              }
            />
          </div>

          <div className="my-2 flex justify-start items-center">
            <span className="text-base font-bold">Allow Create New Option</span>
            <Checkbox
              onChange={(event) =>
                setPollData({
                  ...pollData,
                  allow_create_extra_ops: event.target.checked,
                })
              }
            />
          </div>

          <div className="my-2">
            <p className="text-start text-base font-bold">Answer Options</p>
            <div className="my-2">
              {pollData.options.map((option, index) => (
                <div className="my-2 flex items-center gap-5" key={index}>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={"text"}
                    fullWidth
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={(index) => deleteOption(index)}
                          edge="end"
                        >
                          <ClearIcon fontSize="medium" />
                        </IconButton>
                      </InputAdornment>
                    }
                    size="small"
                    placeholder="Option"
                  />
                </div>
              ))}
              <div className="flex justify-start">
                <Button
                  type="button"
                  variant="outlined"
                  color="primary"
                  onClick={handleAddOption}
                >
                  <AddIcon className="text-black" />
                  <p className="text-black">Add Option</p>
                </Button>
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex justify-start">
              <h2 className="text-base font-bold">Choose Time Expired</h2>
            </div>

            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DateTimePicker
                    value={pollData.date_expired}
                    onChange={(newValue) =>
                      setPollData({ ...pollData, date_expired: newValue})
                    }
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </div>
          <div className="flex justify-start my-5">
            <Button type="submit" variant="contained">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PollCreate;
