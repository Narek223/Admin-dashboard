import React, { useCallback, useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import * as ModalSlice from "../../../Redax/Slices/Availability/AvailabilityModalSlice";

export default function AvailabilityModal({
  open,
  handleClose,
  onadd,
  selectedDate,
  edit,
  error: parentError,
  setError: setParentError,
}) {
  const dispatch = useDispatch();
  const {
    fullname,
    status,
    date,
    startime,
    endtime,
    id,
    error,
  } = useSelector((state) => state.availabilityModal);

 
  const handleResetForm = useCallback(() => {
    dispatch(ModalSlice.resetForm());
  }, [dispatch]);

  
  useEffect(() => {
    if (edit) {
      dispatch(
        ModalSlice.setAll({
          fullname: edit.title || "",
          date: edit.date || "",
          status: edit.status || "Booked",
          startime: edit.start || null,
          endtime: edit.end || null,
          id: edit.id || 0,
        })
      );
    } else {
      handleResetForm();
    }
  }, [edit, handleResetForm, dispatch]);


  const save = () => {
    const hasEmptyFields =
      !(date || selectedDate) || !fullname || !status || !startime || !endtime;

    if (hasEmptyFields) {
      dispatch(ModalSlice.setError(true));
      setParentError && setParentError(true);
      return;
    }
    if (!startime || !endtime || !dayjs(startime).isBefore(dayjs(endtime))) {
      dispatch(ModalSlice.setError(true));
      setParentError && setParentError(true);
      return;
    }
    const selected = moment(date || selectedDate);
    const startDate = selected.clone().toDate();
    startDate.setHours(dayjs(startime).hour(), dayjs(startime).minute());

    const endDate = selected.clone().toDate();
    endDate.setHours(dayjs(endtime).hour(), dayjs(endtime).minute());

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
    handleResetForm();
    dispatch(ModalSlice.setError(false));
    setParentError && setParentError(false);
  };

  return (
    <div className={styles.availabilityModal}>
      <Modal
        open={open}
        onClose={() => {
          handleClose();
          handleResetForm();
          dispatch(ModalSlice.setError(false));
          setParentError && setParentError(false);
        }}
        disablePortal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={styles.modal}
      >
        <Box>
          <div className={styles.availabilityModal}>
            <p className={styles.close}>
              <AiOutlineClose
                onClick={() => {
                  handleClose();
                  handleResetForm();
                  dispatch(ModalSlice.setError(false));
                  setParentError && setParentError(false);
                }}
                className={styles.icon}
              />
            </p>

            <div className={styles.availabilityWrapper}>
              <h1 className={styles.title}>
                {edit ? "Edit Availability" : "Add Availability"}
              </h1>
              <div className={styles.nameandStatus}>
                <Inputs
                  error={(error || parentError) && !fullname}
                  value={fullname}
                  state={(val) => dispatch(ModalSlice.setFullname(val))}
                  placeholder="Anna Smith"
                  type="text"
                  label="Full Name"
                />
                <SelectComponent
                  fullWidth={false}
                  deafultvalue={"Booked"}
                  servicename="Select Status"
                  service={status}
                  sets={(val) => dispatch(ModalSlice.setStatus(val))}
                  services={statusobj[0].options}
                />
              </div>
              <div className={styles.Demo}>
                <TimePickerComp
                  labalName={"Start Time"}
                  setstate={(val) => dispatch(ModalSlice.setStartTime(val))}
                  state={startime}
                  error={
                    (error || parentError) &&
                    (!endtime ||
                      (startime && endtime && !dayjs(startime).isBefore(dayjs(endtime))))
                  }
                />

                <TimePickerComp
                  labalName={"End Time"}
                  setstate={(val) => dispatch(ModalSlice.setEndTime(val))}
                  state={endtime}
                  error={
                    (error || parentError) &&
                    (!endtime ||
                      (startime && endtime && !dayjs(startime).isBefore(dayjs(endtime))))
                  }
                />
              </div>
              <DataPicker
                setDate={(val) => dispatch(ModalSlice.setDate(val))}
                error={(error || parentError) && !(date || selectedDate)}
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