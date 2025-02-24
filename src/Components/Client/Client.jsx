import React, { useState } from "react";
import Header from "../Header/Header";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { AiOutlineClose } from "react-icons/ai";
import styles from './client.module.scss'
import ModalBtn from "../../SheredComponents/ModalButtons/ModalBtn";
import { clientobj } from "../../Services/data/client/client";
import SelectComponent from "../../SheredComponents/Select/SelectComponent";


export default function Client() {
  const [open, setOpen] = useState(false);
  const [name,setName]=useState("Anne Smith")

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);



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
          </div>
        </Box>
        {/* <ModalBtn onClose={handleClose} handleSave={handleClose} edit={open}/>    */}
          
            {/* <SelectComponent
              deafultvalue={"Anna Smith"}
              servicename="Full Name"
              formControlClass={styles.formControl}
              inputlabelClass={styles.inputlabel}
              service={name}
              sets={setName}
              nativeSelect={styles.nativeSelect}
              services={clientobj[0].options}
           
            />  */}
        
       
      </Modal>
    </div>
  );
}
