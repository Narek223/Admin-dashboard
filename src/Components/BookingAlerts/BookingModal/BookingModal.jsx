import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styles from "./booking.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import Inputs from "../../../SheredComponents/Inputs/Inputs";
import { services } from "../../../Services/data/addServices/services";
import SelectComponent from "../../../SheredComponents/Select/SelectComponent";
import ModalBtn from "../../../SheredComponents/ModalButtons/ModalBtn";
import DataPicker from "../../../SheredComponents/DataPicker/DataPicker";

export default function BookingModal({ open, handleClose }) {
  const [name, setName] = useState(null);
  const [lastname, setlastname] = useState(null);
  const [phone, setPhone] = useState(null);
  const [service, setService] = useState(null);
  const [specialist, setSpecialist] = useState(null);
  const [timeline, setimeline] = useState(null);
  const [date, setDate] = useState(null);

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
              <h1>Add Booking</h1>
              <div>
                {inputValues.map((elem, index) => (
                  <Inputs
                    error={null}
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
                  error={null}
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
                <Inputs
                  error={null}
                  value={specialist}
                  state={setSpecialist}
                  placeholder="Specialist"
                  type="text"
                  label="Specialist"
                />
                <SelectComponent
                  fullWidth={false}
                  deafultvalue={"Hair Care"}
                  servicename="Time"
                  service={timeline}
                  sets={setimeline}
                  services={services[0].options}
                />
              </div>
              <div className={styles.datapicker}>

              <DataPicker
                setDate={setDate}
                error={null}
                value={date}
                label={null}
              />
              </div>
             
              <ModalBtn onClose={handleClose} handleSave={null} edit={null} />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
