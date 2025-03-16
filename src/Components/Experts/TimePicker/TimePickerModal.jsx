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
import ModalBtn from "../../../SheredComponents/ModalButtons/ModalBtn";

export default function TimePickerModal({ open, onClose }) {
  const [value, setValue] = useState([]);
  

  const handleTimeChange = (newValue) => {
    if (newValue) {
      setValue((prev) => [...prev, dayjs(newValue).format("HH:mm")]);
    }
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
                <label className={styles.inputlabel}> Free Time</label>
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
                      className={styles.textInput}
                    
                      onChange={handleTimeChange }
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>
            <ModalBtn onClose={onClose} handleSave={null} edit={null} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
