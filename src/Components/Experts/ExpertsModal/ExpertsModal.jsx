import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styles from "./expertsModal.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import Inputs from "../../../SheredComponents/Inputs/Inputs";

export default function ExpertsModal({ open, handleClose,error }) {
let [name,setName]=useState("")



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
          <div className={styles.exportModalConteiner}>
            <p className={styles.close}>
              <AiOutlineClose onClick={handleClose} className={styles.icon} />
            </p>
            <h1>Add Expert</h1>
            <div className={styles.addClient}>
            <Inputs
                error={error && !name}
                value={name}
                state={setName}
                placeholder="Anna Smith"
                type="text"
                label="Full Name"
              />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
