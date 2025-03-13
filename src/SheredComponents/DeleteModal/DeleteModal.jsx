import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import styles from "./deleteModal.module.scss";
import { AiOutlineClose } from "react-icons/ai";

export default function DeleteModal({ open, onClose, title, text,onDelete }) {
  return (
    <div className={styles.deleteConteiner}>
      <Modal
        open={open}
        onClose={onClose}
        disablePortal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={styles.modal}
      >
        <Box>
          <div className={styles.deleteWrapper}>
            <p className={styles.close}>
              <AiOutlineClose onClick={onClose} className={styles.icon} />
            </p>
            <div className={styles.delete}>
              <div className={styles.infotext}>
                <h1>{title}</h1>
                <p>{text}</p>
              </div>
              <div className={styles.buttons}>
                <button onClick={onClose}>Cancel</button>
                <button onClick={onDelete}>Delete</button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
