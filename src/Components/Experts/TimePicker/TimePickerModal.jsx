import React, { useState, useEffect, useCallback } from "react";
import styles from "./timepicker.module.scss";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { AiOutlineClose } from "react-icons/ai";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import ModalBtn from "../../../SheredComponents/ModalButtons/ModalBtn";
import DataPicker from "../../../SheredComponents/DataPicker/DataPicker";

import { useSelector, useDispatch } from "react-redux";
import {
  setDate,
  setSelectedTime,
  addTimeSlot,
  deleteTimeSlot,
  setTimeSlots,
  reset,
} from "../../../Redax/Slices/Experts/TimePickerSlice";


export default function TimePickerModal({ open, onClose, onAddtime, edit,initialFreeTime }) {
  const dispatch = useDispatch();
  const { date, selectedTime, timeSlots } = useSelector((state) => state.timePicker);



useEffect(() => {
  if (open) {
    dispatch(setTimeSlots(initialFreeTime && initialFreeTime.length > 0 ? initialFreeTime : []));
    if (edit) {
      dispatch(setDate(edit.date || null));
    }
  }
}, [open, edit, initialFreeTime, dispatch]);
  
  

  const handleAccept = () => {
    if (date && selectedTime) {
      const formattedTime = dayjs(selectedTime).format("HH:mm");
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      dispatch(addTimeSlot({ date: formattedDate, time: formattedTime }));
      dispatch(setSelectedTime(null));
    }
  };

  const addTimes = () => {
    handleAccept();
  };

  const handleDeleteTime = (dateToDelete, timeToDelete) => {
    dispatch(deleteTimeSlot({ date: dateToDelete, time: timeToDelete }));
  };

  const saveTime = () => {
    onAddtime(timeSlots);
    onClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        disablePortal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={styles.modal}
      >
        <Box>
          <div className={styles.timePicker}>
            <p className={styles.close}>
              <AiOutlineClose onClick={onClose} className={styles.icon} />
            </p>
            <div className={styles.timePickerWrapper}>
              <h1>Free time</h1>
              <div className={styles.chooseTime}>
                <DataPicker
                  setDate={(val) => dispatch(setDate(val))}
                  error={null}
                  value={date || ""}
                  label={"Select Date"}
                />
                {date && (
                  <div className={styles.timepicker}>
                    <div className={styles.timePickerWrapper}>
                      <div className={styles.timePickerWrapperNext}>
                        <label className={styles.inputlabel}>Select Time</label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer
                            label={"Select Time"}
                            components={["TimePicker"]}
                            slotProps={{
                              popper: {
                                sx: {
                                  "& .MuiStack-root": {
                                    display: "flex",
                                  },
                                },
                              },
                            }}
                          >
                            <TimePicker
                              fullWidth
                              ampm={false}
                              onChange={(newValue) => dispatch(setSelectedTime(newValue))}
                              value={selectedTime}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </div>
                      <button onClick={addTimes} className={styles.add}>
                        Add Time
                      </button>
                    </div>
                    {timeSlots.map((slot) => (
                      <div key={slot.date}>
                        <h3>
                          Added times for {dayjs(slot.date).format("DD.MM.YYYY")}:
                        </h3>
                        {slot.times.map((time, index) => (
                          <div className={styles.addedTime} key={index}>
                            <div className={styles.list}>
                              <div className={styles.Listwrapper}>
                                <span>{time}</span>
                                <p onClick={() => handleDeleteTime(slot.date, time)}>
                                  <AiOutlineClose className={styles.icon} />
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <ModalBtn onClose={onClose} handleSave={saveTime} edit={null} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}