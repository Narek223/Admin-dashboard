import React, { useState, useEffect,useCallback} from "react";
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

export default function TimePickerModal({
  open,
  onClose,
  onAddtime,
  initialFreeTime,
  edit,
}) {
  const [date, setDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [timeSlots, setTimeSlots] = useState(initialFreeTime || []);

  useEffect(() => {
  if (open) {
    setTimeSlots(initialFreeTime || []);
 if (!edit && (!initialFreeTime || initialFreeTime.length === 0)) {
      setDate(null);
      setSelectedTime(null);
    }
  }
}, [open, initialFreeTime, edit]);

  const handleAccept = () => {
    if (date && selectedTime) {
      const formattedTime = dayjs(selectedTime).format("HH:mm");
      const formattedDate = dayjs(date).format("YYYY-MM-DD");

      const isDuplicate = timeSlots.some(
        (elem) =>
          elem.date === formattedDate && elem.times.includes(formattedTime)
      );

      if (!isDuplicate) {
        setTimeSlots((prev) => {
          const existing = prev.find((elem) => elem.date === formattedDate);
          if (existing) {
            return prev.map((elem) =>
              elem.date === formattedDate
                ? {
                    ...elem,
                    times: [...elem.times, formattedTime].sort(),
                  }
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

  const deleteTime = (dateToDelete, timeToDelete) => {
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

  const saveTime = () => {
    onAddtime(timeSlots);
    onClose();
  };

  const resetForm = useCallback(() => {
    setSelectedTime(selectedTime ? dayjs(edit.selectedTime, "HH:mm") : null);
    setDate("");
    setTimeSlots("");
  }, []);


  
  useEffect(() => {
    if (edit) {
      setDate(edit.date || null);
      setSelectedTime(
        edit.selectedTime ? dayjs(edit.selectedTime, "HH:mm") : null
      );
      setTimeSlots(edit.timeSlots || []);
    } else {
      resetForm()
    }
  }, [edit])



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
                              onChange={(newValue) => setSelectedTime(newValue)}
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
                          Added times for{" "}
                          {dayjs(slot.date).format("DD.MM.YYYY")}:
                        </h3>
                        {slot.times.map((time, index) => (
                          <div className={styles.addedTime} key={index}>
                            <div className={styles.list}>
                              <div className={styles.Listwrapper}>
                                <span>{time}</span>
                                <p onClick={() => deleteTime(slot.date, time)}>
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
