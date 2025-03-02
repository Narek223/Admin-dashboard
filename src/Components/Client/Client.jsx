import React, { useState } from "react";
import Header from "../Header/Header";
import styles from './client.module.scss';
import ClientModal from './ClientModal/ClientModal';
import { AiOutlineFieldNumber } from "react-icons/ai";

export default function Client() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  const handleOpen = () => {
    setOpen(true)
    setError(false)
  };
  const handleClose = () => {
    setOpen(false)
    setError(false)
  };

  return (
    <div className={styles.ClientConteiner}>
      <Header handleOpen={handleOpen} />
      <ClientModal
        open={open}
        handleClose={handleClose}
        error={error}
        setError={setError}
      />

      <div className={styles.clinetWrapper}>
        <div className={styles.clientheader}>
          <ul >
            <li><AiOutlineFieldNumber /></li>
            <li>Image</li>
            <li>Client Name</li>
            <li>Phone Number</li>
            <li>Email</li>
            <li>Birth Date</li>
          </ul>
        </div>
        <div>

          
        </div>
      </div>
    </div>
  );
}