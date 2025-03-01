import React, { useState } from "react";
import Header from "../Header/Header";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./client.module.scss";
import ModalBtn from "../../SheredComponents/ModalButtons/ModalBtn";
import Inputs from "../../SheredComponents/Inputs/Inputs";
import DataPicker from "../../SheredComponents/DataPicker/DataPicker";
import ChooseFile from "../Service/ChooseFile/ChooseFile";

export default function Client() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);


const handleSave=()=>{
  if (
    !name ||
    !date ||
    !mail ||
    !phone 
  ) {
    return;
  }

  const clientObj={
    name,
    date,
    mail,
    phone,
  }
 console.log(clientObj)
 handleClose()
}


  return (
    <div>
      <Header handleOpen={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        disablePortal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={styles.modal}
      >
        <Box>
          <div className={styles.clientmodal}>
            <p className={styles.close}>
              <AiOutlineClose onClick={handleClose} className={styles.icon} />
            </p>
            <div className={styles.clientmodalpage}>
              <h1>Add Client</h1>
            </div>
            <div className={styles.clentselect}>
              <div className={styles.clentwrapper}>
                <Inputs
                  error={null}
                  value={name}
                  state={setName}
                  placeholder="Anna Smith"
                  type="text"
                  label="Full Name"
                />
                <DataPicker setDate={setDate}/>
                {/* <Inputs
                  error={null}
                  value={data}
                  state={setData}
                  placeholder="14 Feb 1996"
                  type="text"
                  label="Birth Date"
                /> */}
              </div>
              <div>
                <Inputs
                  error={null}
                  value={mail}
                  state={setMail}
                  placeholder="annesmith@gmail.com"
                  type="text"
                  label="Email"
                />
                <Inputs
                  error={null}
                  value={phone}
                  state={setPhone}
                  placeholder="+49 30 12345678"
                  type="tel"
                  label="Phone Number"
                  pattern="[\+]?[0-9]{1,4}?[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}"
                />
              </div>
              <ChooseFile addimg={null} edit={null} />
              <ModalBtn
                onClose={handleClose}
                handleSave={handleSave}
                edit={open}
              />
            
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
