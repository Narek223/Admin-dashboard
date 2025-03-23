import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styles from "./booking.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import Inputs from "../../../SheredComponents/Inputs/Inputs";

export default function BookingModal({ open, handleClose }) {
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
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
