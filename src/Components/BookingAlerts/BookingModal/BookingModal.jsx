import React, { useState, useCallback, useEffect } from "react";
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



export default function BookingModal({
  open,
  handleClose,
  addBooking,
  edit,
  error,
  seterror,
}) {
  const [name, setName] = useState("");
  const [lastname, setlastname] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Hair Care");
  const [specialist, setSpecialist] = useState("");

  const [date, setDate] = useState("");
  const [id, setId] = useState(0);
  const [startime, setStartime] = useState(null);
  const [endtime, setEndtime] = useState(null);

  let inputValues = [
    {
      id: 0,
      placeholder: "First Name",
      value: name,
      setstate: setName,
      state: name,
      type: "text",
      label: "First Name",
    },
    {
      id: 1,
      placeholder: "last name",
      value: lastname,
      setstate: setlastname,
      state: lastname,
      type: "text",
      label: "Last name",
    },
  ];

  const resetForm = useCallback(() => {
    setName("");
    setlastname("");
    setService("Hair Care");
    setPhone("");
    setSpecialist("");
    setDate("");
    setStartime(null);
    setEndtime(null);
    setId(0);
  }, []);

  useEffect(() => {
    if (edit) {
      setName(edit.name || "");
      setDate(edit.date || "");
      setlastname(edit.lastname || "");
      setPhone(edit.phone || "");
      setService(edit.service || "");
      setSpecialist(edit.specialist || "");
      setStartime(edit.startime ? dayjs(edit.startime, "HH:mm") : null);
      setEndtime(edit.endtime ? dayjs(edit.endtime, "HH:mm") : null);
      setId(edit.id || 0);
    } else {
      resetForm();
    }
  }, [edit, resetForm]);
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
    // if (
    //   !name ||
    //   !date ||
    //   !lastname ||
    //   !phone ||
    //   !service ||
    //   !specialist ||
    //   !timeline ||
    //   !startime ||
    //   !endtime
    // ) {
    //   return;
    // }
    const formattedDate =
    date instanceof Date ? dayjs(date).format("YYYY-MM-DD") : date;

    const bookingalerts = {
      id,
      name,
      lastname,
      phone,
      service,
      specialist,
      date:formattedDate,
      startime: startime.format("HH:mm"),
      endtime: endtime.format("HH:mm"),
    };

    if (edit) {
      addBooking(bookingalerts, true);
    } else {
      addBooking(bookingalerts, false);
    }
    handleClose();
    resetForm();
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
                  state={setPhone}
                  placeholder="Mobile Number"
                  type="text"
                  label="Mobile  Number"
                />
                <SelectComponent
                  fullWidth={false}
                  deafultvalue={"Hair Care"}
                  servicename="Service"
                  service={service}
                  sets={setService}
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
                    onChange={(e) => setSpecialist(e.target.value)}
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
                    setstate={setStartime}
                    state={startime}
                    error={error && !startime}
                  />
             
              
                  <TimePickerComp
                    labalName={"End Time"}
                    setstate={setEndtime}
                    state={endtime}
                    error={error && !endtime}
                  />
              
              </div>
              <div className={styles.datapicker}>
                <DataPicker
                  setDate={setDate}
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
