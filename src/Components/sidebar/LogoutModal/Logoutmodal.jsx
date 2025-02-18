import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { IoIosLogOut } from "react-icons/io";
import styles from "./logoutmodal.module.scss";
import Divider from "@mui/material/Divider";

export default function Logoutmodal({ isOpen }) {
  let [state, setstate] = useState(false);
  const handleOpen = () => setstate(true);
  const handleClose = () => setstate(false);


const logout = () => {
  localStorage.removeItem("token");
  window.location.reload();
}


  return (
    <div className={styles.logoutbox}>
      <Divider />

      <ListItem className={styles.ListBox}>
        <ListItemButton onClick={handleOpen} className={styles.logoutButton}>
          <ListItemIcon className={styles.icons}>
            <IoIosLogOut />
          </ListItemIcon>
          {isOpen && (
            <ListItemText primary="Logout" className={styles.logoutText} />
          )}
        </ListItemButton>
      </ListItem>
      <Modal
        open={state}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={styles.modal}
        slotProps={{
          backdrop: {
            sx: {
              border: "none",
            },
          },
        }}
      >
        <Box>
          <div className={styles.logoutmodal}>
            <div className={styles.logoutText}>
              <h1>Log Out</h1>
              <br/>
              <p>Are you sure you want to log out?</p>
            </div>

            <div className={styles.buttons}>
              <button onClick={handleClose}>Cancel</button>
              <button onClick={logout}>Log Out</button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
