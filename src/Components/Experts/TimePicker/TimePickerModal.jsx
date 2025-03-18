import React, { useState, useCallback,useEffect } from "react";
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
  const [value, setValue] = useState([]);
  const [date, setDate] = useState();
  const [freetimes, setfreeTimes] = useState([]);
  const [tempValue, setTempValue] = useState(null);

  const handleTimeChange = (newValue) => {
    setTempValue(newValue);
  };

  const resetForm = useCallback(() => {
    setDate("");
  }, []);

  useEffect(() => {
    setDate("");
  }, [onClose,resetForm]);

  const handleAccept = () => {
    if (tempValue) {
      setValue((prev) => [...prev, dayjs(tempValue).format("HH:mm")]);
    }
  };

  const dateSave = () => {};

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
                  label={"Date"}
                />
                {date && (
                  <div className={styles.timepicker}>
                    <InputLabel
                      variant="standard"
                      className={styles.inputlabel}
                    >
                      Free Time
                    </InputLabel>

                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      className={styles.time}
                    >
                      <DemoContainer
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
                          onChange={handleTimeChange}
                          onAccept={handleAccept}
                          value={tempValue}
                          className={styles.textInput}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                )}
              </div>
            </div>
            <ModalBtn onClose={onClose} handleSave={dateSave} edit={null} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
