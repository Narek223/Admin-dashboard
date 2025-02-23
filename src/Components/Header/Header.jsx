import React, { useState } from "react";
import styles from "./header.module.scss";
import { CiSearch } from "react-icons/ci";
import { GoBell } from "react-icons/go";
import { useLocation } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { AiOutlineClose } from "react-icons/ai";

export default function Header() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const buttonText =
    location.pathname === "/Experts"
      ? "Add Expert"
      : location.pathname === "/Client"
      ? "Add Client"
      : null;

  return (
    <div className={styles.conteiner}>
      <div className={styles.searchWrapper}>
        <CiSearch className={styles.Icon} />
        <input type="text" placeholder="Search" />
      </div>
      <div className={styles.contactWrapper}>
        {buttonText && (
          <button onClick={handleOpen}>
            <FiPlus className={styles.addIcon} />
            {buttonText}
          </button>
        )}
        <GoBell className={styles.bellIcon} />
      </div>
      {location.pathname === "/Client" ? (
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
        </Modal>
      ) : null}
    </div>
  );
}
