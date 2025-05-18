import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styles from "./booking.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import Inputs from "../../../SheredComponents/Inputs/Inputs";
import { services } from "../../../Services/data/addServices/services";
import SelectComponent from "../../../SheredComponents/Select/SelectComponent";
import ModalBtn from "../../../SheredComponents/ModalButtons/ModalBtn";
import DataPicker from "../../../SheredComponents/DataPicker/DataPicker";
import dayjs from "dayjs";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import TimePickerComp from "../../../SheredComponents/TimePicker/TimePickerComp";
import { useSelector, useDispatch } from "react-redux";
import * as bookingModalSlice from "../../../Features/BookingAlerts/BookingModalSlice";

export default function BookingModal({
  open,
  handleClose,
  addBooking,
  edit,
  error,
  seterror,
}) {
  const {
    name,
    lastname,
    phone,
    service,
    specialist,
    date,
    id,
    startime,
    endtime,
  } = useSelector((state) => state.bookingModal);
  const dispatch = useDispatch();

  let inputValues = [
    {
      id: 0,
      placeholder: "First Name",
      value: name,
      setstate: (value) => dispatch(bookingModalSlice.setName(value)),
      type: "text",
      label: "First Name",
    },
    {
      id: 1,
      placeholder: "last name",
      value: lastname,
      setstate: (value) => dispatch(bookingModalSlice.setLastname(value)),
      type: "text",
      label: "Last name",
    },
  ];

  useEffect(() => {
    if (edit) {
      dispatch(bookingModalSlice.setName(edit.name || ""));
      dispatch(bookingModalSlice.setDate(edit.date || ""));
      dispatch(bookingModalSlice.setLastname(edit.lastname || ""));
      dispatch(bookingModalSlice.setPhone(edit.phone || ""));
      dispatch(bookingModalSlice.setService(edit.service || "Hair Care"));
      dispatch(bookingModalSlice.setSpecialist(edit.specialist || ""));
      dispatch(
        bookingModalSlice.setStartime(
          edit.startime ? dayjs(edit.startime, "HH:mm") : null
        )
      );
      dispatch(
        bookingModalSlice.setEndtime(
          edit.endtime ? dayjs(edit.endtime, "HH:mm") : null
        )
      );
      dispatch(bookingModalSlice.setId(edit.id || 0));
    } else {
      dispatch(bookingModalSlice.resetForm());
    }
  }, [edit, dispatch]);

  const Saveinformation = () => {
    const hasEmptyFields =
      !name ||
      !date ||
      !lastname ||
      !phone ||
      !service ||
      !specialist ||
      !startime ||
      !endtime;

    seterror(hasEmptyFields);
    if (hasEmptyFields) {
      return;
    }

    const formattedDate =
      date instanceof Date ? dayjs(date).format("YYYY-MM-DD") : date;

    const bookingalerts = {
      id,
      name,
      lastname,
      phone,
      service,
      specialist,
      date: formattedDate,
      startime: startime.format("HH:mm"),
      endtime: endtime.format("HH:mm"),
    };

    addBooking(bookingalerts, !!edit);
    handleClose();
    dispatch(bookingModalSlice.resetForm());
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        disablePortal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={styles.modal}
      >
        <Box>
          <div className={styles.bookingmodal}>
            <p className={styles.close}>
              <AiOutlineClose onClick={handleClose} className={styles.icon} />
            </p>

            <div className={styles.bookingWrapper}>
              <h1>{edit ? "Edit Booking" : "Add Booking"}</h1>
              <div>
                {inputValues.map((elem, index) => (
                  <Inputs
                    key={elem.id}
                    error={error && !elem.value}
                    value={elem.value}
                    state={elem.setstate}
                    placeholder={elem.placeholder}
                    type="text"
                    label={elem.label}
                  />
                ))}
              </div>
              <div className={styles.numberandservice}>
                <Inputs
                  error={error && !phone}
                  value={phone}
                  state={(value) => dispatch(bookingModalSlice.setPhone(value))}
                  placeholder="Mobile Number"
                  type="text"
                  label="Mobile  Number"
                />
                <SelectComponent
                  fullWidth={false}
                  deafultvalue={"Hair Care"}
                  servicename="Service"
                  service={service}
                  sets={(value) => dispatch(bookingModalSlice.setService(value))}
                  services={services[0].options}
                />
              </div>
              <div className={styles.TimeandSpecialist}>
                <FormControl className={styles.formControl}>
                  <InputLabel variant="standard" className={styles.inputlabel}>
                    Specialist
                  </InputLabel>
                  <TextField
                    error={error && !specialist}
                    value={specialist}
                    onChange={(e) =>
                      dispatch(bookingModalSlice.setSpecialist(e.target.value))
                    }
                    type="text"
                    className={styles.textInput}
                    placeholder="Specialist"
                    sx={{
                      "& .MuiInputBase-root": {
                        color: "rgba(127, 129, 136, 1)",
                      },
                    }}
                  />
                </FormControl>
              </div>
              <div className={styles.Demo}>
                <TimePickerComp
                  labalName={"Start Time"}
                  setstate={(value) =>
                    dispatch(bookingModalSlice.setStartime(value))
                  }
                  state={startime}
                  error={
                    error &&
                    (!endtime ||
                      (startime && endtime && !startime.isBefore(endtime)))
                  }
                />
                <TimePickerComp
                  labalName={"End Time"}
                  setstate={(value) =>
                    dispatch(bookingModalSlice.setEndtime(value))
                  }
                  state={endtime}
                  error={
                    error &&
                    (!endtime ||
                      (startime && endtime && !startime.isBefore(endtime)))
                  }
                />
              </div>
              <div className={styles.datapicker}>
                <DataPicker
                  setDate={(value) =>
                    dispatch(bookingModalSlice.setDate(value))
                  }
                  error={error && !date}
                  value={date}
                  label={null}
                />
              </div>

              <ModalBtn
                onClose={handleClose}
                handleSave={Saveinformation}
                edit={edit}
              />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}