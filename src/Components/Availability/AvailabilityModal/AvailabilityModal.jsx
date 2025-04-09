import React, { useState,useCallback } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styles from "./availability.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import DataPicker from "../../../SheredComponents/DataPicker/DataPicker";
import Inputs from "../../../SheredComponents/Inputs/Inputs";
import SelectComponent from "../../../SheredComponents/Select/SelectComponent";
import { statusobj } from "../../../Services/availability/status";
import ModalBtn from "../../../SheredComponents/ModalButtons/ModalBtn";
import TimePickerComp from "../../../SheredComponents/TimePicker/TimePickerComp";
import moment from "moment";

export default function AvailabilityModal({ open, handleClose, onadd,selectedDate }) {
  const [date, setDate] = useState(null);
  const [fullname, setfullname] = useState("");
  const [status, setStatus] = useState("Booked");
  const [startime, setstartime] = useState(null);
  const [endtime, setendtime] = useState(null);

  const resetForm = useCallback(() => {
    setStatus("Booked");
    setfullname("");
    setDate(null);
    setstartime(null);
    setendtime(null);
  }, []);

  const save = () => {
    const selected = moment(date || selectedDate);
  const startDate = selected.clone().toDate();
  startDate.setHours(startime.hour(), startime.minute());

  const endDate = selected.clone().toDate();
  endDate.setHours(endtime.hour(), endtime.minute());
 console.log(selected.format("MM/DD/YYYY"))


    const availability = {
      date:date || selectedDate,
      title: fullname,
      status,
      start: startDate,
      end: endDate,
    };
    onadd(availability);
    handleClose();
    resetForm()
  };
  return (
    <div className={styles.availabilityModal}>
      <Modal
        open={open}
        onClose={handleClose}
        disablePortal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={styles.modal}
      >
        <Box>
          <div className={styles.availabilityModal}>
            <p className={styles.close}>
              <AiOutlineClose onClick={handleClose} className={styles.icon} />
            </p>

            <div className={styles.availabilityWrapper}>
              <h1 className={styles.title}>Add Availability</h1>
              <div className={styles.nameandStatus}>
                <Inputs
                  error={null}
                  value={fullname}
                  state={setfullname}
                  placeholder="Anna Smith"
                  type="text"
                  label="Full Name"
                />
                <SelectComponent
                  fullWidth={false}
                  deafultvalue={"Booked"}
                  servicename="Select Status"
                  service={status}
                  sets={setStatus}
                  services={statusobj[0].options}
                />
              </div>
              <div className={styles.Demo}>
                <TimePickerComp
                  labalName={"Start Time"}
                  setstate={setstartime}
                  state={startime}
                  error={null}
                />

                <TimePickerComp
                  labalName={"End Time"}
                  setstate={setendtime}
                  state={endtime}
                  error={null}
                />
              </div>
              <DataPicker
                setDate={setDate }
                error={null}
                value={date || (selectedDate ? new Date(selectedDate) : null)}
                label={"Select Date"}
              />
              <ModalBtn onClose={handleClose} handleSave={save} edit={null} />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
