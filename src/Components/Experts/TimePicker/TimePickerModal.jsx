import React, { useState } from "react";
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

export default function TimePickerModal({ open, onClose }) {
  const [value, setValue] = useState(dayjs("2022-04-17T15:30"));

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

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimePicker"]}>
                  <InputLabel variant="standard" className={styles.inputlabel}>
                  Free Time
                  </InputLabel>
                  <TimePicker
                  //  sx={{
                  //   '& .MuiOutlinedInput-notchedOutline': {
                  //     border: 'none', 
                  //   },
                  // }}
                    className={styles.textInput}
                    label="Free Time"
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>

              </div>
              
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
