import {
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Checkbox } from "@mui/material";
import RejectModal from "../../components/modal/RejectModal";
import BasicModal from "../../components/modal/Modal";
import useDataContext from "../../context/useDataContext";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import ClearIcon from "@mui/icons-material/Clear";
import { createPoll } from "../../services";
import { toast } from "react-toastify";
function PollCreate() {
  const navigate = useNavigate();
  const { modal, setModal } = useDataContext();
  const schema = yup.object({
    title: yup.string().required("Title is required!"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [pollData, setPollData] = useState({
    is_multivote: false,
    allow_create_new_option: false,
    time_exp: null,
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
    // setModal({...modal, isOpen: true, title : "Lolllll"})
    const data = {
      ...pollData,
      time_exp: dayjs(pollData.time_exp).format("DD-MM-YYYY HH:mm:ss"),
    };

    if (
      data.options.includes("") ||
      data.time_exp === "Invalid Date" ||
      !data.time_exp
    ) {
      setModal({
        ...modal,
        isOpen: true,
        title: "Poll is no completed",
        content:
          "Please complete the empty field of options or choose datetime!",
      });
    } else {
      try {
        const response = await createPoll(data);
        if (response.status === 200) {
          setPollData({
            is_multivote: false,
            allow_create_new_option: false,
            time_exp: null,
            options: [""],
            title: "",
          });
          toast.success("Create Poll Successfully!");
        }
      } catch(error) {
        toast.error("Create Poll Error!");
      }
    }
    console.log(data);
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
                setPollData({ ...pollData, is_multivote: event.target.checked })
              }
            />
          </div>

          <div className="my-2 flex justify-start items-center">
            <span className="text-base font-bold">Allow Create New Option</span>
            <Checkbox
              onChange={(event) =>
                setPollData({
                  ...pollData,
                  allow_create_new_option: event.target.checked,
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
              <h2 className="text-base font-bold">Choose Time Poll Expired</h2>
            </div>

            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DateTimePicker
                    value={pollData.time_exp}
                    onChange={(newValue) =>
                      setPollData({ ...pollData, time_exp: newValue })
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

      <BasicModal />
    </div>
  );
}

export default PollCreate;
