import React, { useState, useCallback, useEffect } from "react";
import styles from "./timepicker.module.scss";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { AiOutlineClose } from "react-icons/ai";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import InputLabel from "@mui/material/InputLabel";
import dayjs from "dayjs";
import ModalBtn from "../../../SheredComponents/ModalButtons/ModalBtn";
import DataPicker from "../../../SheredComponents/DataPicker/DataPicker";

export default function TimePickerModal({ open, onClose }) {
  const [date, setDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
 const [btnclick,setBtnclick]=useState(false)

  const resetForm = useCallback(() => {
    setDate(null);
    setSelectedTime(null);
  }, []);

  useEffect(() => {
    if (!open) resetForm();
  }, [open, resetForm]);

  const handleAccept = () => {
    timeSlots.times!==null?setBtnclick(false):setBtnclick(true)
    if (date && selectedTime) {
      const formattedTime = dayjs(selectedTime).format("HH:mm");
      const formattedDate = dayjs(date).format("YYYY-MM-DD");

      const isDuplicate = timeSlots.some((elem) =>
          elem.date === formattedDate && elem.times.includes(formattedTime)
      );

      if (!isDuplicate) {
        setTimeSlots((prev) => {
          const existing = prev.find((elem) => elem.date === formattedDate);
          if (existing) {
            return prev.map((elem) =>
              elem.date === formattedDate
                ? { ...elem, times: [...elem.times, formattedTime].sort() }
                : elem
            );
          }
          return [...prev, { date: formattedDate, times: [formattedTime] }];
        });
      }
      setSelectedTime(null);
    }
  };

  const addTimes = () => {
    handleAccept();
  };

  const deletime = (dateToDelete, timeToDelete) => {
    setTimeSlots((prev) =>
      prev
        .map((elem) =>
          elem.date === dateToDelete
            ? { ...elem, times: elem.times.filter((t) => t !== timeToDelete) }
            : elem
        )
        .filter((elem) => elem.times.length > 0)
    );
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
                  setDate={setDate}
                  error={null}
                  value={date}
                  label={"Select Date"}
                />
                {date && (
                  <div className={styles.timepicker}>
                    <div className={styles.timePickerWrapper}>
<div  className={styles.timePickerWrapperNext}>
                      <label className={styles.inputlabel}>lael</label>
               
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      className={styles.time}
                    >
                      <DemoContainer
                      label={ " Select Time"}
                        components={["TimePicker"]}
                        className={styles.time}
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
                          onChange={(newValue) => setSelectedTime(newValue)}
                      
                          value={selectedTime}
                          className={styles.textInput}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    </div>
                    <button onClick={addTimes} className={styles.add}  disabled={btnclick}  >
                      Add Time
                    </button>
                    </div>
                    <div className={styles.addedTime}>
                      <h3>
                        Added times for {dayjs(date).format("DD.MM.YYYY")}:
                      </h3>
                      <div className={styles.list}>
                        {timeSlots
                          .find(
                            (slot) =>
                              slot.date === dayjs(date).format("YYYY-MM-DD")
                          )
                          ?.times?.map((time, id) => (
                            <div key={id} className={styles.Listwrapper}>
                              <span>{time}</span>
                              <p
                                onClick={() =>
                                  deletime(
                                    dayjs(date).format("YYYY-MM-DD"),
                                    time
                                  )
                                }
                              >
                                <AiOutlineClose className={styles.icon} />
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <ModalBtn onClose={onClose} handleSave={null} edit={null} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
