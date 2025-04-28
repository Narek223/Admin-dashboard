import React, { useState, useCallback, useEffect } from "react";
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
import dayjs from "dayjs";

export default function AvailabilityModal({
  open,
  handleClose,
  onadd,
  selectedDate,
  edit,
  error,
  setError,
}) {
  const [date, setDate] = useState(null);
  const [fullname, setfullname] = useState("");
  const [status, setStatus] = useState("Booked");
  const [startime, setstartime] = useState(null);
  const [endtime, setendtime] = useState(null);

  const [id, setid] = useState(0);

  const resetForm = useCallback(() => {
    setStatus("Booked");
    setfullname("");
    setDate(null);
    setstartime(null);
    setendtime(null);
    setid(0);
  }, []);

  useEffect(() => {
    if (edit) {
      setfullname(edit.title || "");
      setDate(edit.date || "");
      setStatus(edit.status || "Booked");

      setstartime(dayjs(edit.start) || null);
      setendtime(dayjs(edit.end) || null);
      setid(edit.id || 0);
    } else {
      resetForm();
    }
  }, [edit, resetForm]);

  const save = () => {
    const hasEmptyFields =
      !(date || selectedDate) || !fullname || !status || !startime || !endtime;

    if (hasEmptyFields) {
      setError(true);
      return;
    }
    if (!startime || !endtime || !startime.isBefore(endtime)) {
      setError(true);
      return;
    }
    const selected = moment(date || selectedDate);
    const startDate = selected.clone().toDate();
    startDate.setHours(startime.hour(), startime.minute());

    const endDate = selected.clone().toDate();
    endDate.setHours(endtime.hour(), endtime.minute());

    const availability = {
      id,
      date: date || selectedDate,
      title: fullname,
      status,
      start: startDate,
      end: endDate,
    };

    if (edit) {
      onadd(availability, true);
    } else {
      onadd(availability, false);
    }

    handleClose();
    resetForm();
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
              <h1 className={styles.title}>
                {edit ? "Edit Availability" : "Add Availability"}
              </h1>
              <div className={styles.nameandStatus}>
                <Inputs
                  error={error && !fullname}
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
                  error={
                    error &&
                    (!endtime ||
                      (startime && endtime && !startime.isBefore(endtime)))
                  }
                />

                <TimePickerComp
                  labalName={"End Time"}
                  setstate={setendtime}
                  state={endtime}
                  error={
                    error &&
                    (!endtime ||
                      (startime && endtime && !startime.isBefore(endtime)))
                  }
                />
              </div>
              <DataPicker
                setDate={setDate}
                error={error && !(date || selectedDate)}
                value={date || new Date(selectedDate)}
                label={"Select Date"}
              />
              <ModalBtn onClose={handleClose} handleSave={save} edit={edit} />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
